'use client';

import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Anchor, BatteryCharging, Compass, Database, Drill, Droplets, Factory, Filter, Flame, Gauge, Navigation, PaintBucket, Plug, PlusCircle, Search, Settings, ShieldAlert, Snowflake, Wind, Zap } from 'lucide-react';

const products = [
    { name: 'Engine Parts', href: '/engine-parts/', desc: 'Components for over 20 engine brands.', icon: Settings },
    { name: 'Main Engine Spares', href: '/main-engine-spares/', desc: 'Cylinder covers, liners, pistons, valves.', icon: Database },
    { name: 'Auxiliary Engines', href: '/auxiliary-engines/', desc: 'Complete sets and major components.', icon: Zap },
    { name: 'Diesel Generators', href: '/diesel-generators/', desc: 'Overhauled gen sets for marine/power.', icon: BatteryCharging },
    { name: 'Turbocharger Spares', href: '/turbocharger-spares/', desc: 'Complete units and individual parts.', icon: Wind },
    { name: 'Air Compressors', href: '/air-compressors/', desc: 'Marine compressors and replacement parts.', icon: Gauge },
    { name: 'Navigation Systems', href: '/navigation-systems/', desc: 'Radar, GPS, communication equipment.', icon: Compass },
    { name: 'Electrical Equipment', href: '/electrical-equipment/', icon: Plug, desc: 'Motors, alternators, transformers.' },
    { name: 'Hydraulic Equipment', href: '/hydraulic-equipment/', icon: Droplets, desc: 'Pumps, tools, hoses, components.' },
    { name: 'Petroleum Equipment', href: '/petroleum-equipment/', icon: Flame, desc: 'Oil & gas sector equipment.' },
    { name: 'Explosion-Proof Equipment', href: '/explosion-proof/', icon: ShieldAlert, desc: 'ATEX-rated components.' },
    { name: 'Propulsion Systems', href: '/propulsion-systems/', icon: Navigation, desc: 'Propellers, gearboxes, drive systems.' },
    { name: 'Deck Machinery', href: '/deck-machinery/', icon: Anchor, desc: 'Windlasses, winches, cranes.' },
    { name: 'Purifiers / Separators', href: '/purifiers/', icon: Filter, desc: 'Oil purifier units and spare parts.' },
    { name: 'Power Plant Equipment', href: '/power-plant/', icon: Factory, desc: 'Industrial generators and components.' },
];

export default function ProductsOverview() {
    return (
        <>
            <PageHero
                title="Products & Spares"
                subtitle="Global procurement of genuine, OEM, and reconditioned marine & industrial equipment."
                bgClass="bg-gradient-to-br from-primary-950 via-navy to-steel"
                breadcrumbs={[
                    { label: 'Products', href: '/products/' }
                ]}
            />

            <section className="py-24 bg-white relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mb-16 max-w-3xl"
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-primary-950 font-plus-jakarta-sans mb-6">Equipment Sourcing</h2>
                        <p className="text-lg text-gray-600 font-inter leading-8">
                            We offer products in three condition tiers to match every budget and timeline: brand-new OEM parts for critical applications,
                            professionally reconditioned components that perform like new at a fraction of the cost, and quality-tested used parts
                            sourced from ship demolition yards.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Link href={product.href} className="flex flex-col h-full bg-lightgray rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-gray-100 group">
                                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                        <product.icon className="h-7 w-7 text-ocean group-hover:text-accent-500 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-950 font-plus-jakarta-sans mb-3">{product.name}</h3>
                                    <p className="text-gray-600 font-inter text-sm mb-6 flex-grow">{product.desc}</p>
                                    <span className="text-ocean font-bold text-sm tracking-wider uppercase group-hover:text-accent-500 flex items-center gap-2 mt-auto">
                                        Explore <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            <QuickQuote />
        </>
    );
}
