'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const locations = [
    {
        country: 'Pakistan (Headquarters)',
        address: 'C-102 Block 4 Gulshan-E-Iqbal Karachi',
        phone: '+92 313 2277773',
        email: 'info@leon-international.com',
        flag: '🇵🇰',
    },
    {
        country: 'UAE Office',
        address: 'Office No: CWS-1V-223879, 26th Floor, Amber Gem Tower, Sheikh Khalifa Street, Ajman, UAE',
        phone: '+92 313 2277773',
        email: 'info@leon-international.com',
        flag: '🇦🇪',
    },
    {
        country: 'China Office',
        address: 'No. 29-4, Xinhuaqiang District, Shiyan City, Hubei, China',
        phone: '+92 313 2277773',
        email: 'info@leon-international.com',
        flag: '🇨🇳',
    },
    {
        country: 'Latvia Office',
        address: 'Annas Brigaderes iela 4-47, LV-1082, Rīga, Latvia',
        phone: '+92 313 2277773',
        email: 'info@leon-international.com',
        flag: '🇱🇻',
    },
];

export default function GlobalMap() {
    return (
        <section className="bg-lightgray py-24 sm:py-32 relative overflow-hidden">
            {/* Abstract Map Background Simulation */}
            <div className="absolute inset-0 opacity-5 md:opacity-10 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 1000 500" className="w-full h-full text-navy fill-current" preserveAspectRatio="none">
                    {/* Extremely simplified dot grid representing world map area loosely */}
                    <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2"></circle>
                    </pattern>
                    <rect x="0" y="0" width="1000" height="500" fill="url(#dot-pattern)"></rect>

                    {/* Overlay abstract "continents" for visual interest without precise mapping */}
                    <path d="M700 150 Q750 100 850 100 T950 200 T800 300 Z" opacity="0.3"></path>
                    <path d="M600 250 Q650 350 750 350 T800 250 Z" opacity="0.3"></path>
                </svg>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl font-plus-jakarta-sans">
                        Strategically Positioned Across 4 Countries
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 font-inter">
                        Ensuring rapid response and robust global sourcing capabilities from the Middle East to Europe and East Asia.
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {locations.map((loc, idx) => (
                        <motion.div
                            key={loc.country}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-100 hover:border-ocean/30 hover:shadow-xl transition-all duration-300 group overflow-hidden relative p-8 z-10"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ocean to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                                <div className="w-14 h-14 shrink-0 rounded-xl bg-primary-50 flex items-center justify-center text-3xl shadow-sm group-hover:-translate-y-1 transition-transform duration-300 border border-primary-100">
                                    {loc.flag}
                                </div>
                                <h3 className="text-lg font-bold text-primary-950 font-plus-jakarta-sans leading-tight">
                                    {loc.country}
                                </h3>
                            </div>

                            <ul className="space-y-6 text-sm leading-6 text-gray-600 font-inter flex-grow">
                                <li className="flex gap-x-4 items-start group/item">
                                    <div className="mt-0.5 bg-primary-50 p-2.5 rounded-lg group-hover/item:bg-ocean group-hover/item:text-white text-ocean transition-colors duration-300 shadow-sm border border-primary-50 group-hover/item:border-ocean">
                                        <MapPin className="h-4 w-4" aria-hidden="true" />
                                    </div>
                                    <span className="group-hover/item:text-primary-900 transition-colors duration-300 pt-1 leading-relaxed">
                                        {loc.address}
                                    </span>
                                </li>
                                <li className="flex gap-x-4 items-center group/item">
                                    <div className="bg-primary-50 p-2.5 rounded-lg group-hover/item:bg-accent-500 group-hover/item:text-white text-accent-600 transition-colors duration-300 shadow-sm border border-primary-50 group-hover/item:border-accent-500">
                                        <Phone className="h-4 w-4" aria-hidden="true" />
                                    </div>
                                    <a href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`} className="group-hover/item:text-accent-600 transition-colors duration-300 font-semibold tracking-wide">
                                        {loc.phone}
                                    </a>
                                </li>
                                <li className="flex gap-x-4 items-center group/item">
                                    <div className="bg-primary-50 p-2.5 rounded-lg group-hover/item:bg-ocean group-hover/item:text-white text-ocean transition-colors duration-300 shadow-sm border border-primary-50 group-hover/item:border-ocean">
                                        <Mail className="h-4 w-4" aria-hidden="true" />
                                    </div>
                                    <a href={`mailto:${loc.email}`} className="group-hover/item:text-ocean transition-colors duration-300 font-medium break-all">
                                        {loc.email}
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
