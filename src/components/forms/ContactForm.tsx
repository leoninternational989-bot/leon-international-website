'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: 'General Inquiry',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required (at least 2 characters)';
    } else if (formData.name.trim().length > 100) {
      errs.name = 'Name must be under 100 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (formData.phone.trim()) {
      const cleaned = formData.phone.replace(/[\s\-()]/g, '');
      if (!/^\+?[0-9]{7,15}$/.test(cleaned)) {
        errs.phone = 'Please enter a valid phone number';
      }
    }

    if (formData.company.trim().length > 100) {
      errs.company = 'Company name must be under 100 characters';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message is required (at least 10 characters)';
    } else if (formData.message.trim().length > 2000) {
      errs.message = 'Message must be under 2000 characters';
    }

    return errs;
  }

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
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

  function handleContactAgain() {
    setFormData(initialFormData);
    setErrors({});
    setServerError('');
    setIsSuccess(false);
  }

  const inputBaseClass =
    'w-full bg-primary-950/50 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors';

  function inputClass(field: string) {
    return `${inputBaseClass} ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400'
        : 'border-white/10 focus:border-accent-500 focus:ring-accent-500'
    }`;
  }

  return (
    <div className="bg-primary-900/50 p-8 rounded-2xl border border-white/5 shadow-xl min-h-[520px] flex flex-col">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-4"
          >
            <div className="w-16 h-16 rounded-full bg-accent-500/15 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-accent-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 font-plus-jakarta-sans">
              Thank You!
            </h2>
            <p className="text-gray-400 max-w-sm mb-2 leading-relaxed">
              Your inquiry has been submitted successfully. Our team will get back to you within <span className="text-white font-medium">24 hours</span>.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              A confirmation email has been sent to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleContactAgain}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors border border-white/10"
              >
                <Send className="h-4 w-4" />
                Contact Again
              </button>
              <a
                href="/"
                className="flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Go to Home
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
              Send Us a Message
            </h2>

            {serverError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClass('name')}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClass('email')}
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClass('phone')}
                    placeholder="+92 313 2277773"
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className={inputClass('company')}
                    placeholder="Company Ltd."
                  />
                  {errors.company && <p className="mt-1.5 text-xs text-red-400">{errors.company}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject <span className="text-red-400">*</span>
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className={`${inputClass('subject')} appearance-none`}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Service Request">Service Request</option>
                  <option value="Parts Inquiry">Parts Inquiry</option>
                  <option value="Quote Request">Quote Request</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={`${inputClass('message')} resize-none`}
                  placeholder="How can we help you?"
                />
                <div className="flex justify-between mt-1.5">
                  {errors.message ? (
                    <p className="text-xs text-red-400">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className={`text-xs ${formData.message.length > 1800 ? 'text-amber-400' : 'text-gray-600'}`}>
                    {formData.message.length}/2000
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-500 hover:bg-accent-400 disabled:bg-accent-500/50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
