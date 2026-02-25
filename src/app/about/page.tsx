'use client';

import PageHero from '@/components/ui/PageHero';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Clock, Lightbulb } from 'lucide-react';
import GlobalMap from '@/components/sections/home/GlobalMap';
import Testimonials from '@/components/sections/home/Testimonials';

const values = [
    {
        name: 'Reliability',
        description: 'When your vessel is down, every hour counts. We respond fast, work efficiently, and deliver on our commitments.',
        icon: Clock,
    },
    {
        name: 'Quality',
        description: 'From the parts we source to the welds we lay, every output meets internationally recognized standards like Lloyd\'s Register and BV.',
        icon: ShieldCheck,
    },
    {
        name: 'Integrity',
        description: 'We provide honest assessments, transparent pricing, and never cut corners. Our reputation is built on trust earned over five decades.',
        icon: CheckCircle2,
    },
    {
        name: 'Innovation',
        description: 'We continuously invest in modern testing equipment, advanced coating technologies, and efficient procurement systems.',
        icon: Lightbulb,
    },
];

const certifications = [
    "Lloyd's Register (LR) — Approved for marine repair and testing services",
    "Bureau Veritas (BV) — Certified welders, approved ultrasonic thickness gauging",
    "Det Norske Veritas (DNV) — Recognized service provider",
    "American Bureau of Shipping (ABS) — Certified repair facility",
    "Nippon Kaiji Kyokai (NKK/ClassNK) — Recognized",
    "China Classification Society (CCS) — Recognized",
    "Germanischer Lloyd (GL) — Recognized",
    "Hellenic Register of Shipping — Recognized",
    "ISO 9001:2008 — Quality Management System certified"
];

export default function About() {
    return (
        <>
            <PageHero
                title="About Leon International"
                subtitle="Five Decades of Marine Engineering Excellence Under One Roof"
                bgClass="bg-gradient-to-tr from-primary-950 via-primary-800 to-ocean"
                breadcrumbs={[
                    { label: 'About Us', href: '/about/' }
                ]}
            />

            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl font-plus-jakarta-sans mb-6">Our Story</h2>
                            <div className="space-y-6 text-base leading-7 text-gray-600 font-inter">
                                <p>
                                    Leon International was born from the convergence of decades of marine engineering expertise, global sourcing networks, and an unwavering commitment to quality. Our roots trace back to 1974, when our founding operations began serving the growing maritime needs of Karachi Port — one of the busiest ports along the Arabian Sea trade routes.
                                </p>
                                <p>
                                    Over the years, we have grown from a local ship repair workshop into a multi-national marine engineering powerhouse with operations spanning Pakistan, the United Arab Emirates, China, and Latvia. Today, Leon International stands as one of the most comprehensive marine and industrial service providers in the region, offering everything from engine overhauling and steel fabrication to global spare parts procurement and advanced non-destructive testing.
                                </p>
                                <p>
                                    What sets us apart is not just the breadth of our capabilities, but the depth of our expertise. Our team includes certified marine engineers, Bureau Veritas-approved welders, experienced electrical technicians, and sourcing specialists who maintain direct relationships with manufacturers and ship recycling yards across three continents. This combination allows us to deliver solutions that are not only technically superior but also cost-effective and time-efficient.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-lightgray p-8 sm:p-10 rounded-2xl border border-gray-100"
                        >
                            <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-4">Our Mission</h3>
                            <p className="text-base leading-7 text-gray-600 font-inter mb-10">
                                To deliver expedited, reliable, and high-quality marine engineering services and spare parts that keep vessels operational and industries productive. We serve our clients with an unsurpassed level of commitment, guided by our adherence to international standards and high moral values.
                            </p>

                            <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-4">Our Vision</h3>
                            <p className="text-base leading-7 text-gray-600 font-inter">
                                To be the most trusted and comprehensive marine engineering and industrial hardware provider across the Indian Ocean, Middle East, and beyond — recognized for our technical excellence, global reach, and customer-first approach.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="bg-primary-950 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-plus-jakarta-sans">Our Values</h2>
                        <p className="mt-4 text-lg leading-8 text-primary-200">The principles that guide our work every day.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={value.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
                            >
                                <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center mb-6 text-white shadow-lg">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white font-plus-jakarta-sans mb-3">{value.name}</h3>
                                <p className="text-sm leading-6 text-gray-300 font-inter">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reuse GlobalMap for Global Presence section */}
            <GlobalMap />

            <section id="certifications" className="py-24 bg-white border-y border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl font-plus-jakarta-sans mb-6">
                                Certifications & Accreditations
                            </h2>
                            <p className="text-base leading-7 text-gray-600 font-inter mb-8">
                                Leon International maintains certifications and approvals from the following internationally recognized classification societies and standards bodies:
                            </p>
                            <ul className="space-y-4">
                                {certifications.map((cert, idx) => {
                                    const [boldPart, rest] = cert.split(' — ');
                                    return (
                                        <li key={idx} className="flex gap-3 text-base text-gray-600 font-inter">
                                            <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                                                <CheckCircle2 className="w-3 h-3 text-ocean" />
                                            </div>
                                            <span>
                                                <strong className="text-primary-900 font-semibold">{boldPart}</strong>
                                                {rest ? ` — ${rest}` : ''}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-lightgray p-8 sm:p-10 rounded-2xl"
                        >
                            <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-4">Quality Management</h3>
                            <p className="text-base leading-7 text-gray-600 font-inter mb-6">We are committed to:</p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Providing excellent ship repair and maintenance services to achieve complete customer satisfaction",
                                    "Fulfilling all requirements of customers, statutory and regulatory bodies, and the ISO 9001:2008 Quality Management System",
                                    "Providing ongoing training to employees and ensuring necessary equipment and resources are available",
                                    "Ensuring continual improvement in the effectiveness of our Quality Management System"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm leading-6 text-gray-600 font-inter">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0 mt-2" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Reuse Testimonials section which includes Client Logos */}
            <Testimonials />
        </>
    );
}
