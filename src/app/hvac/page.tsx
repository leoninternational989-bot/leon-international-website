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
                title="Marine HVAC & Refrigeration Solutions"
                subtitle="Installation and repair of marine AC plants and cold storage refrigeration systems."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Marine HVAC & Refrigeration Solutions', href: '/hvac/' }
                ]}
                image="/images/hvac/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our Marine HVAC & Refrigeration Solutions
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Installation and repair of marine AC plants and cold storage refrigeration systems. Leon International is a leading marine engineering company with over 50 years of experience. We provide class-approved solutions to ship owners, managers, and offshore industrial operators worldwide from our headquarters in Karachi, and offices in UAE, China, and Latvia.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Our highly trained technicians and marine engineers ensure that every project meets the highest international maritime standards. Whether it's emergency response at anchorage or routine maintenance, you can rely on our expertise.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-4">Why Choose Leon International?</h3>
                            <ul className="space-y-4 mb-8">
                                {[
                                    '50+ Years Maritime Experience',
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
                            {/* Standardizing the image across all for now */}
                            <Image
                                src="/images/hvac/component.webp"
                                alt="Marine HVAC & Refrigeration Solutions performed by Leon International Marine Engineers"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-white/10 w-full">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion
                                faqs={[
                                    {
                                        question: "What marine hvac & refrigeration solutions does Leon International offer?",
                                        answer: "Leon International provides comprehensive marine hvac & refrigeration solutions for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide."
                                    },
                                    {
                                        question: "Does Leon International provide emergency marine hvac & refrigeration solutions?",
                                        answer: "Yes, we offer 24/7 rapid response for emergency marine repairs and services."
                                    },
                                    {
                                        question: "Are your technicians certified?",
                                        answer: "Yes, our engineers and technicians are highly experienced and hold necessary class approvals (including BV, LR) for specialized marine engineering tasks."
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <QuickQuote />
        </main>
    );
}
