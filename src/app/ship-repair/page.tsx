import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import FAQSchema from '@/components/seo/FAQSchema';
import FAQSection from '@/components/ui/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Ship Repair & Dry Docking Services"
                subtitle="Expert ship repair, dry docking, and anchorage repair services globally by Leon International."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Ship Repair & Dry Docking Services', href: '/ship-repair/' }
                ]}
                image="/images/ship-repair/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our Ship Repair & Dry Docking Services
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Expert ship repair, dry docking, and anchorage repair services globally by Leon International. Leon International is a leading marine engineering company with decades of experience. We provide class-approved solutions to ship owners, managers, and offshore industrial operators worldwide from our headquarters in Karachi.
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
                            {/* Standardizing the image across all for now */}
                            <Image
                                src="/images/ship-repair/service-1.webp"
                                alt="Extensive structural and mechanical repairs on a commercial vessel in dry dock"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <FAQSchema faqs={[
                {
                    "question": "What types of vessels can Leon International repair at Karachi Port?",
                    "answer": "We service vessels of all sizes including bulk carriers, tankers, container ships, tugboats, barges, and offshore vessels at Karachi Port and Port Bin Qasim."
                },
                {
                    "question": "Do you offer emergency ship repair at anchorage?",
                    "answer": "Yes, we provide 24/7 emergency repair services at anchorage with rapid mobilization capability. Our teams can be deployed within hours for urgent repairs."
                },
                {
                    "question": "What classification societies approve your ship repair work?",
                    "answer": "Our work is approved by Lloyd's Register, Bureau Veritas, DNV, ABS, and ClassNK. All repairs meet internationally recognized classification standards."
                }
            ]} />
            <FAQSection faqs={[
                {
                    "question": "What types of vessels can Leon International repair at Karachi Port?",
                    "answer": "We service vessels of all sizes including bulk carriers, tankers, container ships, tugboats, barges, and offshore vessels at Karachi Port and Port Bin Qasim."
                },
                {
                    "question": "Do you offer emergency ship repair at anchorage?",
                    "answer": "Yes, we provide 24/7 emergency repair services at anchorage with rapid mobilization capability. Our teams can be deployed within hours for urgent repairs."
                },
                {
                    "question": "What classification societies approve your ship repair work?",
                    "answer": "Our work is approved by Lloyd's Register, Bureau Veritas, DNV, ABS, and ClassNK. All repairs meet internationally recognized classification standards."
                }
            ]} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services/" },
                { name: "Ship Repair & Dry Docking", url: "/ship-repair/" }
            ]} />
            <QuickQuote />
        </main>
    );
}
