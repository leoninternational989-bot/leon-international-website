'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Years of Experience', value: 'Decades' },
    { label: 'Global Reach', value: 'Worldwide' },
    { label: 'Projects Completed', value: '500+' },
    { label: 'Round-the-Clock Service', value: '24/7' },
];

export default function AboutSnapshot() {
    return (
        <section className="py-24 sm:py-32 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex lg:items-center">

                    {/* Image side (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-5/12 lg:max-w-md lg:flex-shrink-0 relative"
                    >
                        <div className="aspect-[4/5] rounded-2xl bg-gradient-to-tr from-navy to-ocean shadow-2xl overflow-hidden relative group">
                            <Image
                                src="/about-snapshot.webp"
                                alt="Marine Engineering and Spare Parts Excellence"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Premium overlay effect */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay z-10"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent flex items-end p-8 z-10">
                                <h3 className="text-white font-bold text-2xl font-plus-jakarta-sans drop-shadow-lg">Long-Standing Engineering Excellence</h3>
                            </div>
                            <div className="absolute top-4 left-4 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                                L
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border-2 border-accent-200 rounded-2xl -z-10"></div>
                    </motion.div>

                    {/* Text side (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-7/12 mt-4 lg:mt-0"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl font-plus-jakarta-sans">
                            Comprehensive Marine Engineering & Spare Parts
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 font-inter">
                            Leon International is a premier marine engineering and industrial hardware company with roots stretching back decades. Operating from strategic locations across Pakistan, the UAE, China, and Latvia, we deliver comprehensive ship repair services, marine spare parts, and industrial equipment to clients spanning every major ocean route.
                        </p>
                        <p className="mt-4 text-base leading-7 text-gray-600 font-inter">
                            Our team of certified marine engineers, skilled fabricators, and sourcing specialists works around the clock to keep your vessels operational, your equipment performing at peak efficiency, and your projects delivered on time and within budget. We hold certifications from Lloyd's Register, Bureau Veritas, DNV, ABS, and other leading classification societies.
                        </p>

                        {/* Stats Row */}
                        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:mt-12">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col-reverse relative">
                                    <dt className="text-sm leading-6 text-gray-600 mt-2">{stat.label}</dt>
                                    <dd className="text-3xl font-bold leading-9 tracking-tight text-primary-600 font-outfit">
                                        {stat.value}
                                    </dd>
                                    <div className="absolute top-0 left-0 -ml-4 w-1 h-full bg-accent-200 rounded-full hidden sm:block opacity-50"></div>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-12">
                            <Link
                                href="/about/"
                                className="text-sm font-semibold leading-6 text-ocean hover:text-primary-800 transition-colors flex items-center gap-2 group"
                            >
                                Learn More About Us <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
