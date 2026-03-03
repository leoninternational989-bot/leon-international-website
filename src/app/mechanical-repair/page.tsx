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
                title="Mechanical Repair & Reconditioning"
                subtitle="Comprehensive mechanical repairs including main engine overhauls, boiler repairs, and hydraulic systems."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Mechanical Repair & Reconditioning', href: '/mechanical-repair/' }
                ]}
                image="/images/mechanical-repair/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our Mechanical Repair & Reconditioning
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                We offer comprehensive mechanical repair and reconditioning services to keep your machinery operating at peak performance. Leon International provides class-approved solutions including main engine overhauls, boiler repairs, and precise component reconditioning to ship owners, managers, and offshore industrial operators worldwide.
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
                                src="/images/mechanical-repair/component.webp"
                                alt="Mechanical Repair & Reconditioning performed by Leon International Marine Engineers"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-white/10 w-full">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto">
                            <FaqAccordion faqs={[
                                {
                                    question: "What mechanical repair & reconditioning does Leon International offer?",
                                    answer: "Leon International provides comprehensive mechanical repair and reconditioning for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide."
                                },
                                {
                                    question: "Does Leon International provide emergency mechanical repair?",
                                    answer: "Yes, we offer 24/7 rapid response for emergency marine mechanical repairs and component reconditioning services."
                                },
                                {
                                    question: "Are your technicians certified?",
                                    answer: "Yes, our engineers and technicians are highly experienced and hold necessary class approvals (including BV, LR) for specialized marine engineering tasks."
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
