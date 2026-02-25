'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const productCategories = [
    { name: 'Engine Parts', href: '/engine-parts/' },
    { name: 'Diesel Generators', href: '/diesel-generators/' },
    { name: 'Turbocharger Spares', href: '/turbocharger-spares/' },
    { name: 'Navigation Systems', href: '/navigation-systems/' },
    { name: 'Electrical Equipment', href: '/electrical-equipment/' },
    { name: 'Propulsion Systems', href: '/propulsion-systems/' },
    { name: 'Deck Machinery', href: '/deck-machinery/' },
    { name: 'Hydraulic Equipment', href: '/hydraulic-equipment/' },
];

export default function ProductsShowcase() {
    return (
        <section className="bg-primary-950 py-24 sm:py-32 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-ocean rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-10"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-plus-jakarta-sans">
                        Marine & Industrial Products
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-primary-200 font-inter">
                        From engine components to navigation systems — sourced globally, delivered worldwide.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
                    {productCategories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-2 hover:bg-white/10 hover:border-accent-400/50 transition-all duration-300"
                        >
                            <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-navy to-primary-800 overflow-hidden relative">
                                {/* Placeholder graphic for product Image since we lack real assets */}
                                <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-white/10 m-4 rounded-lg">
                                    <div className="text-white/20 text-4xl font-black font-dm-sans">{category.name.substring(0, 2).toUpperCase()}</div>
                                </div>
                                {/* Hover overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            </div>

                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-accent-200 transition-colors">
                                    {category.name}
                                </h3>
                                <Link href={category.href} className="text-sm text-gray-300 group-hover:text-white font-medium flex items-center gap-1">
                                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                                {/* Hit area expands to full card */}
                                <Link href={category.href} className="absolute inset-0"><span className="sr-only">View {category.name}</span></Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/products/"
                        className="rounded-md bg-accent-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 transition-all font-inter hover:-translate-y-1 shadow-accent-500/20 shadow-lg"
                    >
                        Browse All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
