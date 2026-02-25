'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function QuotePage() {
    const [formStep, setFormStep] = useState(1);
    const [requestType, setRequestType] = useState('both');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    const nextStep = () => setFormStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setFormStep(prev => Math.max(prev - 1, 1));

    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Request a Free Quote"
                subtitle="Tell us what you need and we'll respond within 24 hours"
                breadcrumbs={[
                    { label: 'Request Quote', href: '/quote/' }
                ]}
                bgClass="bg-gradient-to-br from-primary-950 via-gray-900 to-accent-900"
            />

            <section className="py-24 relative">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ocean/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent-500/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    {isSuccess ? (
                        <div className="bg-primary-900/50 p-12 rounded-2xl border border-accent-500/30 shadow-xl text-center">
                            <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="h-10 w-10 text-accent-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Request Submitted Successfully!</h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Thank you for choosing Leon International. Our technical team has received your inquiry and will get back to you with a comprehensive quotation within 24 hours.
                            </p>
                            <button
                                onClick={() => { setIsSuccess(false); setFormStep(1); }}
                                className="bg-primary-800 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors border border-white/10"
                            >
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                        <div className="bg-primary-900/40 p-8 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-950">
                                <div
                                    className="h-full bg-accent-500 transition-all duration-500 ease-out"
                                    style={{ width: `${(formStep / 3) * 100}%` }}
                                />
                            </div>

                            <div className="flex justify-between items-end mb-10 mt-4 border-b border-white/10 pb-6">
                                <div>
                                    <span className="text-accent-500 font-bold text-sm tracking-widest uppercase mb-1 block">Step {formStep} of 3</span>
                                    <h2 className="text-2xl font-bold text-white">
                                        {formStep === 1 && "Your Contact Details"}
                                        {formStep === 2 && "What Do You Need?"}
                                        {formStep === 3 && "Additional Details"}
                                    </h2>
                                </div>
                                <div className="text-gray-400 text-sm font-medium">
                                    {Math.round((formStep / 3) * 100)}% Completed
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Contact Details */}
                                <div className={`space-y-6 ${formStep === 1 ? 'block' : 'hidden'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                                            <input required type="text" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                                            <input required type="text" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="Company Ltd." />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                            <input required type="email" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="john@company.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                                            <input required type="tel" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="+1 234 567 890" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Country Location</label>
                                        <select className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors appearance-none">
                                            <option>United Arab Emirates</option>
                                            <option>Pakistan</option>
                                            <option>Saudi Arabia</option>
                                            <option>Singapore</option>
                                            <option>Greece</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Step 2: Request Type */}
                                <div className={`space-y-8 ${formStep === 2 ? 'block' : 'hidden'}`}>
                                    {/* Type Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-4">I am looking for: *</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {['service', 'parts', 'both'].map((type) => (
                                                <div
                                                    key={type}
                                                    onClick={() => setRequestType(type)}
                                                    className={`cursor-pointer rounded-xl border flex items-center justify-center py-4 px-4 transition-all ${requestType === type
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
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Service specific fields */}
                                        <div className={`space-y-4 ${(requestType === 'service' || requestType === 'both') ? 'block' : 'hidden md:block opacity-30 pointer-events-none'}`}>
                                            <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Service Details</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Service Category</label>
                                                <select className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors appearance-none">
                                                    <option>Ship Repair & Dry Docking</option>
                                                    <option>Mechanical Repair (Engine/Boiler)</option>
                                                    <option>Electrical & Electronics</option>
                                                    <option>NDT & Inspection</option>
                                                    <option>Fabrication / Steel Renewal</option>
                                                    <option>Protective Coatings</option>
                                                    <option>HVAC / Refrigeration</option>
                                                    <option>Other Specialized Service</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Service Location (Port/Anchorage)</label>
                                                <input type="text" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="e.g., Karachi Port, Dubai Drydocks" />
                                            </div>
                                        </div>

                                        {/* Parts specific fields */}
                                        <div className={`space-y-4 ${(requestType === 'parts' || requestType === 'both') ? 'block' : 'hidden md:block opacity-30 pointer-events-none'}`}>
                                            <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Spare Parts Details</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Engine/Equipment Brand</label>
                                                <input type="text" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="e.g., MAN B&W, MTU, Daihatsu" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Condition Preference</label>
                                                <select className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors appearance-none">
                                                    <option>Genuine New</option>
                                                    <option>OEM Alternative (New)</option>
                                                    <option>Reconditioned (Class Approved)</option>
                                                    <option>Used / Good Condition</option>
                                                    <option>Provide options for all</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {(requestType === 'parts' || requestType === 'both') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Part Numbers / Description</label>
                                            <textarea rows={3} className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors resize-none" placeholder="Provide part numbers, quantities, and descriptions..."></textarea>
                                        </div>
                                    )}
                                </div>

                                {/* Step 3: Additional Details */}
                                <div className={`space-y-6 ${formStep === 3 ? 'block' : 'hidden'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Vessel Name / Project Name</label>
                                            <input type="text" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="Vessel Name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">IMO Number (If applicable)</label>
                                            <input type="text" className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors" placeholder="1234567" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Urgency Level *</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {['Standard (1-2 weeks)', 'Urgent (3-5 days)', 'Emergency (24-48 hours)'].map((urgency) => (
                                                <label key={urgency} className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-primary-950/30 cursor-pointer hover:bg-primary-900 transition-colors">
                                                    <input type="radio" name="urgency" value={urgency} className="text-accent-500 focus:ring-accent-500 bg-primary-900 border-white/20" defaultChecked={urgency.includes('Standard')} />
                                                    <span className="text-sm font-medium text-gray-200">{urgency}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes or Requirements</label>
                                        <textarea rows={4} className="w-full bg-primary-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors resize-none" placeholder="Any specific class survey requirements or delivery instructions?"></textarea>
                                    </div>
                                    <div className="p-4 bg-ocean/10 border border-ocean/20 rounded-lg flex gap-3 text-ocean">
                                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium">To upload technical drawings or component photos, please email them directly to <a href="mailto:rfq@leon-international.com" className="font-bold hover:underline">rfq@leon-international.com</a> after submitting this form.</p>
                                    </div>
                                </div>

                                {/* Form Navigation */}
                                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={formStep === 1}
                                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${formStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-primary-800 text-white hover:bg-primary-700'}`}
                                    >
                                        Back
                                    </button>

                                    {formStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-8 py-3 rounded-lg font-semibold bg-accent-500 text-white hover:bg-accent-400 transition-colors flex items-center gap-2 shadow-lg"
                                        >
                                            Next Step
                                            <span className="text-xl leading-none">→</span>
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`px-8 py-3 rounded-lg font-bold bg-accent-500 text-white hover:bg-accent-400 transition-colors flex items-center gap-2 shadow-lg ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">Processing...</span>
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
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
