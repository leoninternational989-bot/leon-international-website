'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import { Send, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Loader2, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  requestType: string;
  serviceCategory: string;
  serviceLocation: string;
  equipmentBrand: string;
  conditionPreference: string;
  partDescription: string;
  vesselName: string;
  imoNumber: string;
  urgency: string;
  additionalNotes: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: 'Pakistan',
  requestType: 'both',
  serviceCategory: 'Ship Repair & Dry Docking',
  serviceLocation: '',
  equipmentBrand: '',
  conditionPreference: 'Genuine New',
  partDescription: '',
  vesselName: '',
  imoNumber: '',
  urgency: 'Standard (1-2 weeks)',
  additionalNotes: '',
};

export default function QuotePage() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateStep(step: number): FormErrors {
    const errs: FormErrors = {};

    if (step === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2)
        errs.name = 'Full name is required (at least 2 characters)';
      if (!formData.company.trim() || formData.company.trim().length < 2)
        errs.company = 'Company name is required';
      if (!formData.email.trim())
        errs.email = 'Email address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
        errs.email = 'Please enter a valid email address';
      if (!formData.phone.trim()) {
        errs.phone = 'Phone number is required';
      } else {
        const cleaned = formData.phone.replace(/[\s\-()]/g, '');
        if (!/^\+?[0-9]{7,15}$/.test(cleaned))
          errs.phone = 'Please enter a valid phone number';
      }
    }

    if (step === 2) {
      if (!['service', 'parts', 'both'].includes(formData.requestType))
        errs.requestType = 'Please select what you need';

      if (formData.requestType === 'service' || formData.requestType === 'both') {
        if (!formData.serviceCategory)
          errs.serviceCategory = 'Please select a service category';
      }

      if (formData.requestType === 'parts' || formData.requestType === 'both') {
        if (!formData.equipmentBrand.trim())
          errs.equipmentBrand = 'Equipment brand is required';
        if (!formData.partDescription.trim())
          errs.partDescription = 'Please provide part numbers or description';
      }
    }

    if (step === 3) {
      if (!formData.urgency)
        errs.urgency = 'Please select an urgency level';
      if (formData.imoNumber.trim() && !/^[0-9]{7}$/.test(formData.imoNumber.trim()))
        errs.imoNumber = 'IMO number must be exactly 7 digits';
    }

    return errs;
  }

  function nextStep() {
    const stepErrors = validateStep(formStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setFormStep((prev) => Math.min(prev + 1, 3));
  }

  function prevStep() {
    setErrors({});
    setFormStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit(e?: React.FormEvent | React.MouseEvent) {
    e?.preventDefault();
    setServerError('');

    const stepErrors = validateStep(3);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || 'Something went wrong. Please try again.');
        }
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNewRequest() {
    setFormData(initialFormData);
    setErrors({});
    setServerError('');
    setIsSuccess(false);
    setFormStep(1);
  }

  const inputBase =
    'w-full bg-primary-950/50 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors';

  function inputClass(field: string) {
    return `${inputBase} ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400'
        : 'border-white/10 focus:border-accent-500 focus:ring-accent-500'
    }`;
  }

  return (
    <main className="bg-primary-950 min-h-screen">
      <PageHero
        title="Request a Free Quote"
        subtitle="Tell us what you need and we'll respond within 24 hours"
        breadcrumbs={[{ label: 'Request Quote', href: '/quote/' }]}
        bgClass="bg-gradient-to-br from-primary-950 via-gray-900 to-accent-900"
      />

      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ocean/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent-500/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-primary-900/50 p-12 rounded-2xl border border-white/5 shadow-xl text-center"
              >
                <div className="w-16 h-16 bg-accent-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-accent-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 font-plus-jakarta-sans">
                  Quotation Request Submitted!
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto mb-2 leading-relaxed">
                  Our technical team has received your inquiry and will respond with a comprehensive quotation within{' '}
                  <span className="text-white font-medium">24 hours</span>.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  A confirmation email has been sent to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleNewRequest}
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors border border-white/10"
                  >
                    <Send className="h-4 w-4" />
                    Submit Another Request
                  </button>
                  <a
                    href="/"
                    className="flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    Go to Home
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-primary-900/40 p-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden"
              >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-950">
                  <div
                    className="h-full bg-accent-500 transition-all duration-500 ease-out"
                    style={{ width: `${(formStep / 3) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-end mb-10 mt-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-accent-500 font-bold text-sm tracking-widest uppercase mb-1 block">
                      Step {formStep} of 3
                    </span>
                    <h2 className="text-2xl font-bold text-white">
                      {formStep === 1 && 'Your Contact Details'}
                      {formStep === 2 && 'What Do You Need?'}
                      {formStep === 3 && 'Additional Details'}
                    </h2>
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {Math.round((formStep / 3) * 100)}% Completed
                  </div>
                </div>

                {serverError && (
                  <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {serverError}
                  </div>
                )}

                <form
                  onSubmit={(e) => e.preventDefault()}
                  noValidate
                >
                  {/* Step 1: Contact Details */}
                  <div className={`space-y-6 ${formStep === 1 ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={inputClass('name')}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          className={inputClass('company')}
                          placeholder="Company Ltd."
                        />
                        {errors.company && <p className="mt-1.5 text-xs text-red-400">{errors.company}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={inputClass('email')}
                          placeholder="john@company.com"
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={inputClass('phone')}
                          placeholder="+92 313 2277773"
                        />
                        {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Country Location</label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        className={`${inputClass('country')} appearance-none`}
                      >
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Greece">Greece</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 2: Request Type */}
                  <div className={`space-y-8 ${formStep === 2 ? 'block' : 'hidden'}`}>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-4">
                        I am looking for: <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(['service', 'parts', 'both'] as const).map((type) => (
                          <div
                            key={type}
                            onClick={() => handleChange('requestType', type)}
                            className={`cursor-pointer rounded-xl border flex items-center justify-center py-4 px-4 transition-all ${
                              formData.requestType === type
                                ? 'border-accent-500 bg-accent-500/10 text-white shadow-inner'
                                : 'border-white/10 bg-primary-950/30 text-gray-400 hover:bg-primary-900'
                            }`}
                          >
                            <span className="font-semibold capitalize text-center">
                              {type === 'service' ? 'Marine Services' : type === 'parts' ? 'Spare Parts' : 'Both Services & Parts'}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.requestType && <p className="mt-1.5 text-xs text-red-400">{errors.requestType}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Service fields */}
                      <div
                        className={`space-y-4 ${
                          formData.requestType === 'service' || formData.requestType === 'both'
                            ? 'block'
                            : 'hidden md:block opacity-30 pointer-events-none'
                        }`}
                      >
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Service Details</h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Service Category <span className="text-red-400">*</span>
                          </label>
                          <select
                            value={formData.serviceCategory}
                            onChange={(e) => handleChange('serviceCategory', e.target.value)}
                            className={`${inputClass('serviceCategory')} appearance-none`}
                          >
                            <option>Ship Repair &amp; Dry Docking</option>
                            <option>Mechanical Repair (Engine/Boiler)</option>
                            <option>Electrical &amp; Electronics</option>
                            <option>NDT &amp; Inspection</option>
                            <option>Fabrication / Steel Renewal</option>
                            <option>Protective Coatings</option>
                            <option>HVAC / Refrigeration</option>
                            <option>Other Specialized Service</option>
                          </select>
                          {errors.serviceCategory && <p className="mt-1.5 text-xs text-red-400">{errors.serviceCategory}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Service Location (Port/Anchorage)</label>
                          <input
                            type="text"
                            value={formData.serviceLocation}
                            onChange={(e) => handleChange('serviceLocation', e.target.value)}
                            className={inputClass('serviceLocation')}
                            placeholder="e.g., Karachi Port, Dubai Drydocks"
                          />
                        </div>
                      </div>

                      {/* Parts fields */}
                      <div
                        className={`space-y-4 ${
                          formData.requestType === 'parts' || formData.requestType === 'both'
                            ? 'block'
                            : 'hidden md:block opacity-30 pointer-events-none'
                        }`}
                      >
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Spare Parts Details</h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Engine/Equipment Brand <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.equipmentBrand}
                            onChange={(e) => handleChange('equipmentBrand', e.target.value)}
                            className={inputClass('equipmentBrand')}
                            placeholder="e.g., MAN B&W, MTU, Daihatsu"
                          />
                          {errors.equipmentBrand && <p className="mt-1.5 text-xs text-red-400">{errors.equipmentBrand}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Condition Preference</label>
                          <select
                            value={formData.conditionPreference}
                            onChange={(e) => handleChange('conditionPreference', e.target.value)}
                            className={`${inputClass('conditionPreference')} appearance-none`}
                          >
                            <option>Genuine New</option>
                            <option>OEM Alternative (New)</option>
                            <option>Reconditioned (Class Approved)</option>
                            <option>Used / Good Condition</option>
                            <option>Provide options for all</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {(formData.requestType === 'parts' || formData.requestType === 'both') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Part Numbers / Description <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={formData.partDescription}
                          onChange={(e) => handleChange('partDescription', e.target.value)}
                          className={`${inputClass('partDescription')} resize-none`}
                          placeholder="Provide part numbers, quantities, and descriptions..."
                        />
                        {errors.partDescription && <p className="mt-1.5 text-xs text-red-400">{errors.partDescription}</p>}
                      </div>
                    )}
                  </div>

                  {/* Step 3: Additional Details */}
                  <div className={`space-y-6 ${formStep === 3 ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Vessel Name / Project Name</label>
                        <input
                          type="text"
                          value={formData.vesselName}
                          onChange={(e) => handleChange('vesselName', e.target.value)}
                          className={inputClass('vesselName')}
                          placeholder="Vessel Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">IMO Number (If applicable)</label>
                        <input
                          type="text"
                          value={formData.imoNumber}
                          onChange={(e) => handleChange('imoNumber', e.target.value)}
                          className={inputClass('imoNumber')}
                          placeholder="1234567"
                        />
                        {errors.imoNumber && <p className="mt-1.5 text-xs text-red-400">{errors.imoNumber}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Urgency Level <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Standard (1-2 weeks)', 'Urgent (3-5 days)', 'Emergency (24-48 hours)'].map((urgency) => (
                          <label
                            key={urgency}
                            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                              formData.urgency === urgency
                                ? 'border-accent-500 bg-accent-500/10'
                                : 'border-white/10 bg-primary-950/30 hover:bg-primary-900'
                            }`}
                          >
                            <input
                              type="radio"
                              name="urgency"
                              value={urgency}
                              checked={formData.urgency === urgency}
                              onChange={(e) => handleChange('urgency', e.target.value)}
                              className="text-accent-500 focus:ring-accent-500 bg-primary-900 border-white/20"
                            />
                            <span className="text-sm font-medium text-gray-200">{urgency}</span>
                          </label>
                        ))}
                      </div>
                      {errors.urgency && <p className="mt-1.5 text-xs text-red-400">{errors.urgency}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes or Requirements</label>
                      <textarea
                        rows={4}
                        value={formData.additionalNotes}
                        onChange={(e) => handleChange('additionalNotes', e.target.value)}
                        className={`${inputClass('additionalNotes')} resize-none`}
                        placeholder="Any specific class survey requirements or delivery instructions?"
                      />
                    </div>

                    <div className="p-4 bg-ocean/10 border border-ocean/20 rounded-lg flex gap-3 text-ocean">
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">
                        To upload technical drawings or component photos, please email them directly to{' '}
                        <a href="mailto:rfq@leon-international.com" className="font-bold hover:underline">
                          rfq@leon-international.com
                        </a>{' '}
                        after submitting this form.
                      </p>
                    </div>
                  </div>

                  {/* Form Navigation */}
                  <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                        formStep === 1
                          ? 'opacity-0 pointer-events-none'
                          : 'bg-primary-800 text-white hover:bg-primary-700'
                      }`}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>

                    {formStep < 3 ? (
                      <button
                        key="next-step-btn"
                        type="button"
                        onClick={nextStep}
                        className="px-8 py-3 rounded-lg font-semibold bg-accent-500 text-white hover:bg-accent-400 transition-colors flex items-center gap-2 shadow-lg"
                      >
                        Next Step
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        key="submit-btn"
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-lg font-bold bg-accent-500 text-white hover:bg-accent-400 disabled:bg-accent-500/50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit Request
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
