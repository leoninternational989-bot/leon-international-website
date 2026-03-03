import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Anchor, Settings, Waves, Ship } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Dry Docking & SLTS Services"
                subtitle="World-class maritime repair and refurbishment execution for naval and commercial vessels."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Dry Docking & SLTS Services', href: '/dry-docking-slts/' }
                ]}
                image="/images/dry-docking/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Intro Content */}
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                            Precision Engineering for Optimal Performance
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Leon International operates state-of-the-art dry dock and Ship Lift Transfer Systems (SLTS) in Karachi, delivering class-approved repair and rebuilding solutions. With decades of technical expertise, our certified marine engineers handle everything from routine maintenance to major structural steel renewals, ensuring your vessel returns to service efficiently and safely.
                        </p>
                    </div>

                    {/* Image & Key Capabilities Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,134,193,0.15)] border border-white/10 group">
                            <Image
                                src="/images/dry-docking/service-1.webp"
                                alt="Marine engineers performing precision maintenance inside a commercial dry dock"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white font-bold text-xl drop-shadow-md">Supporting Vessels up to 26,000 DWT</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Card 1 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Anchor className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Ship Lift & Transfer System (SLTS)</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Advanced lifting capabilities supporting 7,321 tons with a massive 125m x 32m platform. Features 11 dedicated parking stations allowing simultaneous repairs on multiple vessels locally and internationally.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-ocean/10 rounded-lg text-ocean group-hover:bg-ocean group-hover:text-white transition-colors duration-300">
                                        <Ship className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Dual Dry Dock Facilities</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Handling a wide range of vessel sizes. Dock #1 (186m x 27m) supports up to 26,000 DWT, while Dock #2 (170m x 24m) accommodates 18,000 DWT. Fully equipped with 10T to 30T heavy-lift cranes.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Settings className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Comprehensive Port Repairs</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Engineered solutions including main and auxiliary machinery overhauls, major structural steel renewals, safe above and underwater hull maintenance, and 665m of modern quay walls.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/quote/" className="mt-4 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_rgba(230,126,34,0.5)] self-start">
                                Request Facility Details <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-24 pt-16 border-t border-white/10 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-950 px-4 text-white/20">
                            <Waves className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion faqs={[
                                {
                                    question: "What is the maximum capacity of your Ship Lift & Transfer System (SLTS)?",
                                    answer: "Our advanced SLTS features a massive 125m by 32m platform capable of a 7,321-ton lifting capacity. It is equipped with 11 parking stations, allowing us to simultaneously dry dock and repair multiple vessels efficiently."
                                },
                                {
                                    question: "What size vessels can your dry docks accommodate?",
                                    answer: "We operate two major dry docks in Karachi. Dry Dock #1 is 186m x 27m with a capacity of up to 26,000 DWT. Dry Dock #2 is 170m x 24m and can easily accommodate vessels up to 18,000 DWT. Both are supported by heavy-lift cranes ranging from 10T to 30T."
                                },
                                {
                                    question: "Do you perform underwater structural repairs?",
                                    answer: "Yes. In addition to main and auxiliary machinery overhauls, our specialized engineering teams are fully certified to perform alterations, major steel renewals, and conversions for both underwater hulls and superstructures."
                                }
                            ]} />
                        </div>
                    </div>
                </div>
            </section>

            <QuickQuote />
        </main>
    );
}
