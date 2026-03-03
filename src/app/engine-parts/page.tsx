import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Marine Engine Parts — OEM & Aftermarket"
                subtitle="Pistons, liners, rings, bearings, and valves for all major 2-stroke and 4-stroke engines."
                breadcrumbs={[
                    { label: 'Products', href: '/products/' },
                    { label: 'Marine Engine Parts', href: '/engine-parts/' }
                ]}
                image="/images/engine-parts/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our Marine Engine Parts
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Pistons, liners, rings, bearings, and valves for all major 2-stroke and 4-stroke engines. Leon International is a leading marine engineering company with decades of experience. We provide class-approved solutions to ship owners, managers, and offshore industrial operators worldwide from our headquarters in Karachi.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Our highly trained technicians and marine engineers ensure that every project meets the highest international maritime standards. Whether it's emergency response at anchorage or routine maintenance, you can rely on our expertise.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-4">Why Choose Leon International?</h3>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Decades of Maritime Experience',
                                    '24/7 Fast Response Teams',
                                    'ISO 9001:2008 & BV Certified',
                                    'Global Supply Chain & Logistics'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 hidden sm:block" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/quote/" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Request a Quote <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 mx-auto w-full">
                            <Image
                                src="/images/engine-parts/component.webp"
                                alt="Marine Engine Parts performed by Leon International Marine Engineers"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-white/10 w-full mb-20">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <FaqAccordion
                            faqs={[
                                {
                                    question: "What marine engine parts does Leon International supply?",
                                    answer: "Leon International supplies high-quality OEM and aftermarket marine engine parts for marine engines and industrial applications, serving vessels globally."
                                },
                                {
                                    question: "Are the marine engine parts OEM or aftermarket?",
                                    answer: "We supply both Genuine/OEM parts and high-quality European/Japanese aftermarket equivalents depending on client budgets and requirements."
                                },
                                {
                                    question: "How quickly can you deliver marine spare parts?",
                                    answer: "With stock at key locations and a global logistics network, we ensure rapid dispatch of critical parts to minimize vessel downtime."
                                }
                            ]}
                        />
                    </div>
                </div>
            </section>

            <QuickQuote />
        </main>
    );
}
