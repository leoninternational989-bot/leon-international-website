import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Wrench, Focus, ShieldCheck } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Steel Structure Fabrication"
                subtitle="Heavy steel renewal, pipe replacement, and custom marine structural fabrication."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Steel Structure Fabrication', href: '/steel-structure-fabrication/' }
                ]}
                image="/images/steel-structure/banner-v2.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Intro Content */}
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                            Heavy-Duty Maritime Structural Integrity
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            A vessel's structural integrity is its first line of defense against the elements. At Leon International, we specialize in heavy steel renewal, intricate pipe replacement, and custom marine structural fabrication. Using top-tier BV-approved materials and strict internationally certified welding protocols, our specialized engineers restore your vessel's framework to peak condition—whether at Karachi Port, Bin Qasim anchorage, or offshore.
                        </p>
                    </div>

                    {/* Image & Key Capabilities Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,134,193,0.15)] border border-white/10 group">
                            <Image
                                src="/images/steel-structure/service-1.webp"
                                alt="Precision steel structure fabrication for marine vessels"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white font-bold text-xl drop-shadow-md">Precision Class-Approved Welding & Fitting</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Card 1 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Heavy Steel Hull Renewal</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">We execute massive steel plate replacements for damaged hulls, decks, and bulkheads. Every cut and weld is subjected to rigorous ultrasonic testing to guarantee absolute watertight integrity.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-ocean/10 rounded-lg text-ocean group-hover:bg-ocean group-hover:text-white transition-colors duration-300">
                                        <Wrench className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Marine Pipe Replacement</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Expert bending and high-pressure welding of vital ship piping networks. We handle hydraulic lines, seawater cooling systems, and critical fuel transfer pipes using marine-grade corrosion-resistant alloys.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Focus className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Custom Mechanical Fabrication</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Manufacturing tailored mounting brackets, engine beds, and heavy-duty structural braces. Our CNC plasma cutting and fabrication workshops deliver exact tolerances for critical shipboard modifications.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/quote/" className="mt-4 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_rgba(230,126,34,0.5)] self-start">
                                Discuss Your Structural Project <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-24 pt-16 border-t border-white/10 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-950 px-4 text-white/20">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion faqs={[
                                {
                                    question: "How do you ensure the quality of heavy steel hull renewals?",
                                    answer: "We use only marine-grade, class-approved steel plates. Every weld is conducted by certified professionals and is followed by rigorous Non-Destructive Testing (NDT), such as ultrasonic or radiographic screening, to ensure absolute watertight integrity and compliance with LR and BV standards."
                                },
                                {
                                    question: "Can structural pipe replacement be done while the vessel is at anchorage?",
                                    answer: "Yes, our mobile fabrication units are designed precisely for this. We deploy expert pipefitters and welders directly to your vessel at Karachi Port or Bin Qasim anchorage to cut, fit, and weld high-pressure marine pipe systems without needing a dry dock."
                                },
                                {
                                    question: "Do you fabricate custom structural supports for auxiliary machinery?",
                                    answer: "Absolutely. Our fabrication workshops use precision CNC cutting and heavy-duty press braking to manufacture custom engine beds, specialized mounting brackets, and structural braces tailored to the exact specifications of newly installed marine machinery."
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
