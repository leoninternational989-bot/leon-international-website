'use client';

import { motion } from 'framer-motion';

const testimonials = [
    {
        body: "Leon International's team completed our main engine overhaul ahead of schedule, allowing us to resume operations without any delay. Their technical expertise and commitment to quality is unmatched in the region.",
        author: "Fleet Manager",
        company: "International Shipping Company",
    },
    {
        body: "We've relied on their spare parts supply for over a decade. Whether it's an urgent turbocharger component or a routine maintenance kit, they always deliver on time with proper documentation.",
        author: "Technical Superintendent",
        company: "Bulk Carrier Fleet",
    },
    {
        body: "Their ability to fabricate custom parts for our aging vessel saved us from a costly and time-consuming international procurement process. Highly recommended.",
        author: "Chief Engineer",
        company: "Container Vessel",
    },
];

const clients = [
    { name: "COSCO", logo: "/Brands/b/images.png" },
    { name: "CMA CGM", logo: "/Brands/b/images (1).png" },
    { name: "Apollonia Lines", logo: "/Brands/b/Apollonia-Lines-S.A..jpg" },
    { name: "Argosy Shipmanagement", logo: "/Brands/b/Logo_Argosy-Shipping-Logistics.jpg" },
    { name: "Ethiopian Shipping", logo: "/Brands/b/images (2).png" },
    { name: "STX Pan Ocean", logo: "/Brands/b/images.jpg" },
    { name: "Green Ocean", logo: "/Brands/b/Asset-8@3x-1.png" },
    { name: "Oasis Maritime", logo: "/Brands/b/images (3).png" },
    { name: "Phoenix Reederei", logo: "/Brands/b/red-orange-logo-with-word-phoenix-it_20530-245.avif" }
];

export default function Testimonials() {
    return (
        <section className="bg-primary-950 py-24 sm:py-32 overflow-hidden relative border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <h2 className="text-center text-lg font-semibold leading-8 text-white uppercase tracking-wider mb-12">
                    Trusted by Leading Shipping Companies Worldwide
                </h2>

                {/* Client Logos Carousel */}
                <div className="relative flex overflow-x-hidden group mb-24">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
                        {clients.map((client, i) => (
                            <div key={i} className="flex items-center justify-center w-32 h-16 sm:w-40 sm:h-20 bg-white rounded-xl p-4 shrink-0 transition-transform duration-300 hover:scale-105 shadow-sm">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
                        {clients.map((client, i) => (
                            <div key={`copy-${i}`} className="flex items-center justify-center w-32 h-16 sm:w-40 sm:h-20 bg-white rounded-xl p-4 shrink-0 transition-transform duration-300 hover:scale-105 shadow-sm">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="flex flex-col justify-between rounded-2xl bg-white/5 p-8 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm relative"
                        >
                            {/* Quote icon watermark */}
                            <div className="absolute top-6 right-6 text-6xl text-white/5 font-serif leading-none">"</div>

                            <figure className="relative h-full flex flex-col justify-between">
                                <blockquote className="text-lg leading-8 text-gray-300 font-inter mb-8">
                                    <p>"{testimonial.body}"</p>
                                </blockquote>
                                <figcaption className="flex items-center gap-x-4 border-t border-white/10 pt-6 mt-auto">
                                    <div className="h-10 w-10 rounded-full bg-navy border border-gray-700 flex items-center justify-center">
                                        <span className="text-sm font-bold text-gray-300">
                                            {testimonial.author.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.author}</div>
                                        <div className="text-sm text-gray-400">{testimonial.company}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Visual background elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-96 h-96 bg-ocean rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
        </section>
    );
}
