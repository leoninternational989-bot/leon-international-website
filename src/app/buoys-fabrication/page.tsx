import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Anchor, Target, Waves } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Custom Buoy Fabrication"
                subtitle="Design and construction of heavy-duty mooring, navigation, and offshore data buoys."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Custom Buoys Fabrication', href: '/buoys-fabrication/' }
                ]}
                image="/images/buoys/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Intro Content */}
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                            Heavy-Duty Offshore Mooring Solutions
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            A reliable offshore infrastructure starts with unyielding mooring solutions. Leon International specializes in the custom design, class-approved welding, and construction of heavy-duty marine buoys. Whether you require massive steel mooring buoys for commercial tankers, structural navigational markers, or specialized offshore data buoys, our BV-certified engineering teams manufacture highly durable products built to withstand extreme marine environments.
                        </p>
                    </div>

                    {/* Image & Key Capabilities Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,134,193,0.15)] border border-white/10 group">
                            <Image
                                src="/images/buoys/service-1.webp"
                                alt="Skilled marine fabricator welding the curved steel hull of a gigantic offshore navigational buoy"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white font-bold text-xl drop-shadow-md">Precision Manufacturing of Gigantic Marine Buoys</p>
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
                                        <h3 className="text-xl font-bold text-white mb-2">Heavy Mooring Buoys</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">We fabricate colossal steel mooring buoys designed for single point mooring (SPM) or conventional buoy mooring (CBM) systems, catering to very large crude carriers (VLCCs) and bulk cargo operations.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-ocean/10 rounded-lg text-ocean group-hover:bg-ocean group-hover:text-white transition-colors duration-300">
                                        <Target className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Navigational & Telemetry Buoys</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Custom manufacturing of resilient navigational markers and data telemetry buoys. Our designs incorporate specialized modular towers for installing solar arrays, beacons, and critical offshore monitoring sensors.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Waves className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Anti-Corrosion Polyurethane Coatings</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Each fabricated steel buoy acts as a long-term asset. We utilize high-grade marine polyurethane and specialized offshore epoxy coatings to ensure extreme resistance to saltwater corrosion and bio-fouling.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/quote/" className="mt-4 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_rgba(230,126,34,0.5)] self-start">
                                Request Buoy Specifications <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-24 pt-16 border-t border-white/10 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-950 px-4 text-white/20">
                            <Anchor className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion faqs={[
                                {
                                    question: "Are your mooring buoys certified by international classification societies?",
                                    answer: "Yes, every custom buoy we fabricate is constructed utilizing strict class-approved steel and BV-certified welding techniques. We can provide full QA/QC documentation and classification sign-offs tailored to your operational requirements."
                                },
                                {
                                    question: "Can you customize buoys for specific oceanic and extreme weather conditions?",
                                    answer: "Absolutely. Our offshore engineering team calculates the specific buoyancy, anchor chaining strain, and drag coefficient required based on your exact deployment coordinates to guarantee the buoy withstands severe weather and high wave energy."
                                },
                                {
                                    question: "Do you also provide buoy installation and offshore deployment services?",
                                    answer: "Yes, our comprehensive service extends beyond fabrication. Leon International's fleet and deployment teams offer complete turnkey solutions including towing, anchor laying, and final in-water installation at your designated offshore site."
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
