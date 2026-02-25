'use client';

import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Tags, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceSubPageProps {
    title: string;
    subtitle: string;
    parentService: {
        title: string;
        href: string;
    };
    overview: string[];
    capabilities: string[];
    standards?: string[];
    relatedServices: {
        title: string;
        href: string;
    }[];
}

export default function ServiceSubPageLayout({
    title,
    subtitle,
    parentService,
    overview,
    capabilities,
    standards,
    relatedServices
}: ServiceSubPageProps) {
    return (
        <>
            <PageHero
                title={title}
                subtitle={subtitle}
                bgClass="bg-gradient-to-br from-primary-950 via-navy to-steel"
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: parentService.title, href: parentService.href },
                    { label: title, href: '#' }
                ]}
            />

            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Main Content Area */}
                        <div className="col-span-1 lg:col-span-2 space-y-12">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h2 className="text-3xl font-bold tracking-tight text-primary-950 font-plus-jakarta-sans mb-6">Service Overview</h2>
                                <div className="space-y-6 text-lg leading-8 text-gray-600 font-inter">
                                    {overview.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-lightgray p-8 rounded-2xl border border-gray-100">
                                <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-6 flex items-center gap-3">
                                    Our Capabilities
                                </h3>
                                <ul className="grid grid-cols-1 gap-4">
                                    {capabilities.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 items-start">
                                            <CheckCircle2 className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {standards && standards.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-6">Standards & Certifications</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {standards.map((standard, i) => (
                                            <span key={i} className="px-5 py-2.5 bg-primary-50 text-ocean border border-primary-100 rounded-full text-sm font-bold shadow-sm">
                                                {standard}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar Sticky Area */}
                        <div className="col-span-1 space-y-8 lg:sticky lg:top-32 self-start">

                            {/* Related Services */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
                            >
                                <h3 className="text-xl font-bold text-primary-950 font-plus-jakarta-sans mb-6">Related Services</h3>
                                <div className="space-y-3">
                                    {relatedServices.map((service, idx) => (
                                        <Link key={idx} href={service.href} className="group flex items-center justify-between p-3 rounded-lg hover:bg-lightgray border border-transparent hover:border-gray-200 transition-all font-medium text-gray-700 hover:text-ocean">
                                            {service.title}
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-500" />
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Inquiry CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="bg-primary-950 p-8 rounded-2xl border border-primary-900 text-white shadow-xl relative overflow-hidden"
                            >
                                <div className="absolute -right-8 -top-8 opacity-10">
                                    <Tags className="w-32 h-32 text-white" />
                                </div>
                                <h3 className="text-xl font-bold font-plus-jakarta-sans mb-4 relative z-10">Need This Service?</h3>
                                <p className="text-gray-300 font-inter text-sm mb-6 relative z-10">
                                    Our technical experts are standing by 24/7 to provide estimates and dispatch teams globally.
                                </p>
                                <Link href="/quote/" className="relative z-10 w-full flex justify-center items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white py-3.5 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                                    Request a Quote <ChevronRight className="h-5 w-5" />
                                </Link>
                            </motion.div>

                        </div>

                    </div>
                </div>
            </section>

            <QuickQuote />
        </>
    );
}
