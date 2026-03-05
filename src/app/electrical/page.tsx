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
                title="Marine Electrical & Electronics Services"
                subtitle="Specialized motor rewinding, PCB card repair, and transformer services for maritime vessels."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Marine Electrical & Electronics Services', href: '/electrical/' }
                ]}
                image="/images/electrical/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our Marine Electrical & Electronics Services
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Specialized motor rewinding, PCB card repair, and transformer services for maritime vessels. Leon International is a leading marine engineering company with decades of experience. We provide class-approved solutions to ship owners, managers, and offshore industrial operators worldwide from our headquarters in Karachi.
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
                                src="/images/electrical/component.webp"
                                alt="Marine Electrical & Electronics Services performed by Leon International Marine Engineers"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                                    </div>
            </section>

            <FAQSchema faqs={[
    {
        "question": "What types of marine motors can you rewind?",
        "answer": "We rewind AC and DC motors of all sizes for marine and industrial applications, including main propulsion motors, pump motors, and auxiliary motors."
    },
    {
        "question": "Do you repair PCB cards and electronic boards?",
        "answer": "Yes, our electronics team specializes in PCB card repair, component-level troubleshooting, and replacement for marine navigation and control systems."
    },
    {
        "question": "Can you overhaul gyro compass systems?",
        "answer": "Yes, we provide complete gyro compass overhauling, calibration, and servicing for all major manufacturers."
    }
]} />
            <FAQSection faqs={[
    {
        "question": "What types of marine motors can you rewind?",
        "answer": "We rewind AC and DC motors of all sizes for marine and industrial applications, including main propulsion motors, pump motors, and auxiliary motors."
    },
    {
        "question": "Do you repair PCB cards and electronic boards?",
        "answer": "Yes, our electronics team specializes in PCB card repair, component-level troubleshooting, and replacement for marine navigation and control systems."
    },
    {
        "question": "Can you overhaul gyro compass systems?",
        "answer": "Yes, we provide complete gyro compass overhauling, calibration, and servicing for all major manufacturers."
    }
]} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services/" },
                { name: "Electrical & Automation", url: "/electrical/" }
            ]} />
            <QuickQuote />
        </main>
    );
}
