'use client';

import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Factory, Box, Clock, Wrench } from 'lucide-react';

const features = [
    {
        name: 'Global Reach, Local Expertise',
        description: 'Operating from Pakistan, UAE, China, and Latvia, we combine international sourcing with deep local knowledge of Karachi Port and Port Bin Qasim.',
        icon: Globe,
    },
    {
        name: 'Certified Excellence',
        description: 'Backed by certifications from Lloyd\'s Register, Bureau Veritas, DNV, and ABS. Every repair and part meets internationally recognized standards.',
        icon: ShieldCheck,
    },
    {
        name: 'Direct Sourcing Advantage',
        description: 'By sourcing directly from ship demolition yards and manufacturers, we eliminate middlemen and pass the savings to you.',
        icon: Factory,
    },
    {
        name: 'Complete Inventory',
        description: 'Three tiers of parts availability: brand-new OEM, quality reconditioned, and inspected used parts. Every item undergoes rigorous quality checks before dispatch.',
        icon: Box,
    },
    {
        name: '24/7 Emergency Response',
        description: 'Marine emergencies don\'t follow business hours. Our operations team is available around the clock, ready to board vessels whenever you need us.',
        icon: Clock,
    },
    {
        name: 'Custom Fabrication',
        description: 'Can\'t find a discontinued part? Our fabrication team can manufacture obsolete components to exact specifications, getting you back online.',
        icon: Wrench,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative py-24 sm:py-32 overflow-hidden bg-[url('/hero-1.webp')] bg-fixed bg-cover bg-center">
            {/* Dark overlay for contrast and premium feel */}
            <div className="absolute inset-0 bg-primary-950/85 backdrop-blur-sm z-0"></div>

            {/* Subtle light accents */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-ocean rounded-full blur-[120px] opacity-20 z-0"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full blur-[120px] opacity-10 z-0"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-bold leading-7 text-accent-400 uppercase tracking-widest font-inter">The Leon Advantage</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-plus-jakarta-sans drop-shadow-md">
                        Why Shipowners & Operators Trust Leon International
                    </p>
                    <p className="mt-6 text-lg leading-8 text-primary-200 font-inter">
                        For five decades, we have set the standard in maritime engineering and supply, delivering unmatched reliability across the Indian Ocean, Middle East, and beyond.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-accent-400/50 transition-all duration-500 relative overflow-hidden group shadow-2xl"
                            >
                                {/* Glowing orb behind icon inside card */}
                                <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-ocean/20 rounded-full blur-2xl group-hover:bg-accent-500/30 transition-colors duration-500 z-0"></div>

                                <dt className="flex items-center gap-x-4 text-xl font-bold leading-7 text-white font-plus-jakarta-sans z-10">
                                    <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-ocean/80 to-accent-600/80 border border-white/20 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <feature.icon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-gray-300 font-inter z-10">
                                    <p className="flex-auto group-hover:text-white transition-colors duration-300">{feature.description}</p>
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
