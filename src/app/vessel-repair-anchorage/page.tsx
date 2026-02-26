import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Radar, MapPin, Wrench } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Vessel Repair at Anchorage"
                subtitle="Fast-response afloat repair services safely executed at anchorage worldwide."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Vessel Repair at Anchorage', href: '/vessel-repair-anchorage/' }
                ]}
                image="/images/vessel-repair/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Intro Content */}
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                            Rapid Response Mobile Maritime Engineering
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            When bringing a vessel into port isn't an option, Leon International brings the dry dock to you. We specialize in fast-response afloat repair services performed safely at anchorage. With highly trained, class-approved marine engineers available 24/7, we provide critical emergency resolutions and routine maintenance globally—ensuring your vessel returns to service with minimal disruption.
                        </p>
                    </div>

                    {/* Image & Key Capabilities Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,134,193,0.15)] border border-white/10 group">
                            <Image
                                src="/images/vessel-repair/service-1.webp"
                                alt="Marine engineers performing exterior hull maintenance at sea"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white font-bold text-xl drop-shadow-md">Afloat Structural & Mechanical Services</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Card 1 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Radar className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">24/7 Rapid Emergency Response</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Our mobilized engineering teams are on standby round the clock to address critical, time-sensitive breakdowns at sea, minimizing fleet delays and revenue loss.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-ocean/10 rounded-lg text-ocean group-hover:bg-ocean group-hover:text-white transition-colors duration-300">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Global Anchorage Accessibility</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Whether at Karachi Port, Bin Qasim anchorage, or other strategic global locations, our expert technicians deploy directly to your vessel's location with mobile diagnostic and repair equipment.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Wrench className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Diverse At-Sea Repairs</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Capable of conducting safe afloat tasks including deck machinery overhauls, steel renewals, piping repairs, and auxiliary systems troubleshooting while strictly adhering to international standards.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/quote/" className="mt-4 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_rgba(230,126,34,0.5)] self-start">
                                Request Anchorage Assistance <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-24 pt-16 border-t border-white/10 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-950 px-4 text-white/20">
                            <Radar className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion faqs={[
                                {
                                    question: "What specific vessel repairs can be performed at anchorage?",
                                    answer: "We perform a vast range of afloat repair services including main/auxiliary engine troubleshooting, steel pipe and plate renewal, hydraulic deck machinery overhauls, and essential class-approved structural safety checks directly at anchorage."
                                },
                                {
                                    question: "How quickly can an emergency response team be deployed?",
                                    answer: "Leon International operates a 24/7 dedicated response unit. Depending on the vessel's specific location, mobilized teams paired with our specialized offshore repair vessels can be dispatched almost immediately upon project clearance."
                                },
                                {
                                    question: "Are your mobile repair technicians certified for at-sea work?",
                                    answer: "Yes, all our deployed marine engineers and technicians possess comprehensive safety certifications and are highly experienced in offshore conditions, ensuring compliance with necessary class approvals like BV and LR during every afloat operation."
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
