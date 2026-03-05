import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Layers, Award } from 'lucide-react';
import FAQSchema from '@/components/seo/FAQSchema';
import FAQSection from '@/components/ui/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Steel & Pipe Fabrication"
                subtitle="Class-approved marine welding, structural steel fabrication, and custom engineering."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Steel Fabrication & Welding', href: '/fabrication/' }
                ]}
                image="/images/fabrication/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Intro Content */}
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                            Precision Marine Steel Engineering
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Leon International operates a world-class steel and pipe fabrication facility in Karachi, backed by over 50 years of marine engineering expertise. From routine structural patches to massive custom buoy fabrications, our BV-approved technicians utilize state-of-the-art welding technology to deliver robust, class-compliant solutions for the global maritime industry.
                        </p>
                    </div>

                    {/* Image & Key Capabilities Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,134,193,0.15)] border border-white/10 group">
                            <Image
                                src="/images/fabrication/service-1.webp"
                                alt="Certified marine engineers performing precision heavy-duty welding on a commercial vessel"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white font-bold text-xl drop-shadow-md">Heavy-Duty Ship Structural Fabrication</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Card 1 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Layers className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Steel Structure & Plate Renewal</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Comprehensive steel renewals for vessel hulls, bulkheads, and decks. We handle everything from minor plating repairs to replacing multi-ton structural sections ensuring absolute seaworthiness.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-ocean/10 rounded-lg text-ocean group-hover:bg-ocean group-hover:text-white transition-colors duration-300">
                                        <Flame className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Industrial Pipe Fabrication</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Expert bending, threading, and high-pressure welding of complex marine piping systems including hydraulic lines, cooling/heating manifolds, and cargo pumping conduits.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Class-Approved Custom Welding</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">All welding operations are executed strictly by BV and LR certified professionals. From custom mooring buoy fabrication to specialized mechanical casing repairs, we guarantee standard compliance.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/quote/" className="mt-4 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_rgba(230,126,34,0.5)] self-start">
                                Request a Fabrication Quote <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            <FAQSchema faqs={[
                { question: "Are your welders certified by classification societies?", answer: "Yes, our welders are Bureau Veritas (BV) approved and certified for all types of marine welding including structural steel, pipe works, and hull repairs." },
                { question: "Can you fabricate custom replacement parts for obsolete equipment?", answer: "Yes, we specialize in custom fabrication of discontinued and obsolete parts, manufactured to exact OEM specifications to get your operations back online." },
                { question: "What types of steel fabrication do you offer?", answer: "We handle steel structures, hull repair, pipe fabrication, buoys, pontoons, and all types of custom marine and industrial steel work." }
            ]} />
            <FAQSection faqs={[
                { question: "Are your welders certified by classification societies?", answer: "Yes, our welders are Bureau Veritas (BV) approved and certified for all types of marine welding including structural steel, pipe works, and hull repairs." },
                { question: "Can you fabricate custom replacement parts for obsolete equipment?", answer: "Yes, we specialize in custom fabrication of discontinued and obsolete parts, manufactured to exact OEM specifications to get your operations back online." },
                { question: "What types of steel fabrication do you offer?", answer: "We handle steel structures, hull repair, pipe fabrication, buoys, pontoons, and all types of custom marine and industrial steel work." }
            ]} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services/" },
                { name: "Fabrication & Welding", url: "/fabrication/" }
            ]} />

            <QuickQuote />
        </main>
    );
}
