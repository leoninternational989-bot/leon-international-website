import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Wrench, ShieldAlert, FileSearch } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Major Ship Repair Projects"
                subtitle="Expert structural renovations and marine diesel engine overhaul facilities globally."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Major Ship Repair Projects', href: '/major-ship-repair/' }
                ]}
                image="/images/major-repair/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Intro Content */}
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                            Comprehensive Ship Repair Facilities in Karachi
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            At Leon International, we pride ourselves on providing top-tier major ship repair operations. Our state-of-the-art facilities and highly skilled marine engineers are equipped to handle complex repairs, ensuring your vessels remain seaworthy and operationally efficient. We understand the critical importance of minimizing fleet downtime, and our services are designed to get your ships back on the water fast.
                        </p>
                    </div>

                    {/* Image & Key Capabilities Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,134,193,0.15)] border border-white/10 group">
                            <Image
                                src="/images/major-repair/service-1.webp"
                                alt="Marine engineers operating advanced diagnostics on a major diesel propulsion engine"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white font-bold text-xl drop-shadow-md">Precision Diagnostics & Mechanical Refits</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Card 1 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Wrench className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Marine Diesel Engine Repair</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Specialized breakdown and restoration services for heavy marine diesel engines. Our team rapidly identifies propulsion issues, executing overhauls with precision to extend the operational lifespan of your prime movers.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-ocean/10 rounded-lg text-ocean group-hover:bg-ocean group-hover:text-white transition-colors duration-300">
                                        <ShieldAlert className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Complex Structural Overhauls</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">From localized hull damage to major steel renewals, we safely restore structural integrity. Every repair adheres to stringent international classification society standards and safety regulations.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <FileSearch className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Advanced Diagnostics & Maintenance</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Utilizing cutting-edge diagnostic equipment to isolate complex auxiliary machinery faults. We also offer expertly tailored preventive maintenance programs to keep your fleet in continuous, optimal condition.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/quote/" className="mt-4 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_rgba(230,126,34,0.5)] self-start">
                                Schedule an Inspection <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-24 pt-16 border-t border-white/10 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-950 px-4 text-white/20">
                            <Wrench className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion faqs={[
                                {
                                    question: "Do you handle complete marine diesel engine breakdowns?",
                                    answer: "Absolutely. Our expert teams are heavily trained in rapid response and overhaul for all primary marine diesel propulsion systems and auxiliary generators. We focus on diagnosing the root cause and repairing it swiftly to minimize your vessel's downtime."
                                },
                                {
                                    question: "What types of structural repairs can your facilities perform?",
                                    answer: "We perform comprehensive structural overhauls including major steel renewals, hull repairs after collision or grounding, and internal bulkhead restoration. All our structural work strictly follows the requirements of international classification societies."
                                },
                                {
                                    question: "Does Leon International offer preventive maintenance programs?",
                                    answer: "Yes, we highly recommend and provide tailored preventive maintenance schedules. By utilizing advanced diagnostics before a failure occurs, we can significantly extend the lifespan and improve the operating efficiency of your vessels."
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
