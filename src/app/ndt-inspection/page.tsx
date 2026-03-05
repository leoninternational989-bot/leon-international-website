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
                title="NDT Inspection & Calibration Services"
                subtitle="Advanced non-destructive testing including ultrasonic gauging, MPI, and crane load testing."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'NDT Inspection & Calibration Services', href: '/ndt-inspection/' }
                ]}
                image="/images/ndt-inspection/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our NDT Inspection & Calibration Services
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Advanced non-destructive testing including ultrasonic gauging, MPI, and crane load testing. Leon International is a leading marine engineering company with decades of experience. We provide class-approved solutions to ship owners, managers, and offshore industrial operators worldwide from our headquarters in Karachi.
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
                                src="/images/ndt-inspection/component.webp"
                                alt="NDT Inspection & Calibration Services performed by Leon International Marine Engineers"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                                    </div>
            </section>

            <FAQSchema faqs={[
    {
        "question": "What NDT methods do you offer for marine inspection?",
        "answer": "We perform ultrasonic thickness gauging, ultrasonic flaw detection, magnetic particle inspection (MPI), dye penetrant testing (DPT), and hardness testing."
    },
    {
        "question": "Do you provide crane load testing and certification?",
        "answer": "Yes, we perform marine crane load testing, proof load testing, and provide certification in compliance with classification society requirements."
    },
    {
        "question": "Can you perform hatch cover testing on vessels?",
        "answer": "Yes, we conduct ultrasonic hatch cover testing to check weathertightness and structural integrity, meeting international maritime safety standards."
    }
]} />
            <FAQSection faqs={[
    {
        "question": "What NDT methods do you offer for marine inspection?",
        "answer": "We perform ultrasonic thickness gauging, ultrasonic flaw detection, magnetic particle inspection (MPI), dye penetrant testing (DPT), and hardness testing."
    },
    {
        "question": "Do you provide crane load testing and certification?",
        "answer": "Yes, we perform marine crane load testing, proof load testing, and provide certification in compliance with classification society requirements."
    },
    {
        "question": "Can you perform hatch cover testing on vessels?",
        "answer": "Yes, we conduct ultrasonic hatch cover testing to check weathertightness and structural integrity, meeting international maritime safety standards."
    }
]} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services/" },
                { name: "NDT Inspection", url: "/ndt-inspection/" }
            ]} />
            <QuickQuote />
        </main>
    );
}
