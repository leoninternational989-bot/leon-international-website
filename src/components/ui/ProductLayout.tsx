'use client';

import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Tags } from 'lucide-react';
import Link from 'next/link';

interface ProductLayoutProps {
    title: string;
    subtitle: string;
    overviewText: React.ReactNode;
    overviewSubtext?: React.ReactNode;
    features: string[];
    featuresLabel?: string;
    brands?: {
        category?: string;
        list: string[];
    }[];
    brandsLabel?: string;
    optionsLabel?: string;
    options?: string[];
    breadcrumbs: { label: string; href: string }[];
    bgClass?: string;
}

export default function ProductLayout({
    title,
    subtitle,
    overviewText,
    overviewSubtext,
    features,
    featuresLabel = "Available Components",
    brands,
    brandsLabel = "Supported Manufacturers",
    optionsLabel = "Condition Options",
    options = ["Brand New OEM", "Professionally Reconditioned", "Quality-Tested Used"],
    breadcrumbs,
    bgClass = "bg-gradient-to-tr from-accent-800 via-primary-950 to-navy"
}: ProductLayoutProps) {
    return (
        <>
            <PageHero
                title={title}
                subtitle={subtitle}
                bgClass={bgClass}
                breadcrumbs={breadcrumbs}
            />

            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        <div className="col-span-1 lg:col-span-2 space-y-12">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h2 className="text-3xl font-bold tracking-tight text-primary-950 font-plus-jakarta-sans mb-6">Product Overview</h2>
                                <div className="space-y-6 text-lg leading-8 text-gray-600 font-inter">
                                    {overviewText}
                                    {overviewSubtext && <div className="mt-4">{overviewSubtext}</div>}
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-lightgray p-8 rounded-2xl border border-gray-100">
                                <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-6 flex items-center gap-3">
                                    <Tags className="text-ocean" /> {featuresLabel}
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {features.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 items-start">
                                            <CheckCircle2 className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {brands && brands.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-6">{brandsLabel}</h3>
                                    <div className="space-y-6">
                                        {brands.map((brandGrp, bIdx) => (
                                            <div key={bIdx}>
                                                {brandGrp.category && (
                                                    <h4 className="text-lg font-semibold text-primary-800 mb-3">{brandGrp.category}</h4>
                                                )}
                                                <div className="flex flex-wrap gap-2">
                                                    {brandGrp.list.map((brand, i) => (
                                                        <span key={i} className="px-4 py-2 bg-primary-50 text-ocean border border-primary-100 rounded-full text-sm font-semibold">
                                                            {brand}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="col-span-1 space-y-8 lg:sticky lg:top-32 self-start">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="bg-primary-950 p-8 rounded-2xl border border-primary-900 text-white shadow-xl relative overflow-hidden"
                            >
                                <div className="absolute -right-10 -top-10 opacity-10">
                                    <Tags className="w-32 h-32" />
                                </div>
                                <h3 className="text-xl font-bold font-plus-jakarta-sans mb-6 relative z-10">{optionsLabel}</h3>
                                <div className="space-y-4 relative z-10">
                                    {options.map((opt, oIdx) => (
                                        <div key={oIdx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                            <CheckCircle2 className="h-5 w-5 text-accent-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-200 font-medium">{opt}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="bg-primary-50 p-8 rounded-2xl border border-primary-100"
                            >
                                <h3 className="text-xl font-bold text-primary-950 font-plus-jakarta-sans mb-4">Fast Sourcing globally</h3>
                                <p className="text-sm text-gray-600 font-inter mb-6">
                                    Our extensive inventory and global network guarantees parts dispatched rapidly to your requested port anywhere worldwide.
                                </p>
                                <Link href="/quote/" className="w-full flex justify-center items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white py-3 px-4 rounded-xl font-bold transition-colors">
                                    Request Parts <ChevronRight className="h-5 w-5" />
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
