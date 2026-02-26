import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, ShieldCheck, Cog } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Class-Approved Marine Welding"
                subtitle="High-precision metal and gas welding solutions executed by certified marine technicians."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Marine Welding Services', href: '/welding-services/' }
                ]}
                image="/images/welding/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Intro Content */}
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                            Precision Metal & Gas Welding Solutions
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Welding is a critical, fundamental service essential for the construction, repair, and ongoing maintenance of the global maritime fleet. At Leon International, our highly trained, BV-certified engineers provide class-approved metal and iron welding solutions. Whether it's emergency hull repairs at anchorage, heavy equipment mounting, or continuous pipe fabrication, our rigorous welding standards ensure maximum structural integrity and operational safety across all marine environments.
                        </p>
                    </div>

                    {/* Image & Key Capabilities Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,134,193,0.15)] border border-white/10 group">
                            <Image
                                src="/images/welding/service-1.webp"
                                alt="Certified marine engineer meticulously welding a thick steel pipe joint"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white font-bold text-xl drop-shadow-md">Expert Structural Welding & Fabrication</p>
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
                                        <h3 className="text-xl font-bold text-white mb-2">Class-Approved Metal Welding</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">We specialize in heavy continuous welding for massive steel plate renewals, hull cracks, and structural framing. All operational welding strictly complies with Bureau Veritas (BV) and equivalent classification body standards.</p>
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
                                        <h3 className="text-xl font-bold text-white mb-2">Precision Gas Cutting & Welding</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Utilizing advanced gas-shielded techniques—like TIG and MIG welding—we execute high-precision joints on specialized pressure piping, boiler tubes, and delicate auxiliary machinery structures without compromising material integrity.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-2xl bg-primary-900/40 border border-white/5 backdrop-blur-sm hover:bg-primary-900/60 hover:border-accent-500/30 transition-all duration-300 group">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-accent-500/10 rounded-lg text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                                        <Cog className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Mobile Welding at Anchorage</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Our certified teams are equipped with portable generators, gas units, and safety gear, allowing them to rapidly deploy to your vessel globally to perform emergency welding directly at anchorage.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/quote/" className="mt-4 inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_rgba(230,126,34,0.5)] self-start">
                                Request Certified Welders <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-24 pt-16 border-t border-white/10 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-950 px-4 text-white/20">
                            <Flame className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion faqs={[
                                {
                                    question: "Are your marine welders certified by leading classification societies?",
                                    answer: "Yes. All of our structural welders carry valid certifications and have their work strictly audited according to the rigorous standards set by leading classification societies, including Bureau Veritas (BV) and Lloyd's Register (LR)."
                                },
                                {
                                    question: "Do you specialize in both metal plate welding and high-pressure pipe welding?",
                                    answer: "Absolutely. We employ distinct specialists for structural hull plate renewals—handling massive weight loads—and TIG/MIG specialists for intricate, high-pressure piping networks such as hydraulic lines and boiler systems."
                                },
                                {
                                    question: "Can your welding teams operate on vessels anchored offshore?",
                                    answer: "Yes, we operate 24/7 rapid response mobile welding teams. They can mobilize to vessels anchored at Bin Qasim, Karachi Port, or worldwide, bringing all necessary portable welding and safety equipment required to complete repairs afloat."
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
