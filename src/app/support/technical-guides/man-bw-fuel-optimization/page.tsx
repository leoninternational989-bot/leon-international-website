import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSection from '@/components/ui/FAQSection';

export const metadata: Metadata = {
    title: 'Optimizing MAN B&W Fuel Consumption | Technical Guide',
    description: 'A detailed engineering guide on fuel injection timing adjustments and maintenance for MAN B&W marine engines to improve efficiency.',
};

const guideFaqs = [
    {
        question: "How often should MAN B&W fuel valves be overhauled?",
        answer: "Standard recommendation is every 2,000 to 4,000 running hours depending on fuel quality. Worn nozzles can cause poor atomization and increased SFC."
    },
    {
        question: "Can fuel timing be adjusted while the engine is running?",
        answer: "Modern ME-C engines allow for electronic timing adjustments. For older mechanical engines (MC-C), static timing must be adjusted by altering the fuel pump cam position during standstill."
    }
];

export default function FuelOptimizationGuide() {
    return (
        <article className="bg-white">
            <PageHero
                title="Optimizing MAN B&W Fuel Consumption"
                subtitle="Technical Maintenance and Timing Adjustments for Maximum Efficiency"
                bgClass="bg-gradient-to-tr from-navy via-primary-900 to-ocean"
                breadcrumbs={[
                    { label: 'Support', href: '/support/' },
                    { label: 'Technical Guides', href: '/support/technical-guides/' },
                    { label: 'Fuel Optimization', href: '/support/technical-guides/man-bw-fuel-optimization' }
                ]}
            />

            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-12 py-6 border-y border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="w-4 h-4" /> <span>Chief Engineer, Leon International</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" /> <span>Last Updated: March 2026</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" /> <span>12 min read</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-600 font-inter leading-relaxed">
                        <p className="lead text-xl text-primary-900 font-medium mb-8">
                            Fuel consumption represents the single largest operational cost for shipping companies. On MAN B&W two-stroke engines, small deviations in fuel injection timing can lead to significant increases in Specific Fuel Consumption (SFC) and thermal loading of cylinder components.
                        </p>

                        <h2 className="text-2xl font-bold text-navy font-plus-jakarta-sans mt-12 mb-6 underline decoration-gold/30">Understanding the Injection Window</h2>
                        <p>
                            The injection window is critical for proper combustion. Late injection leads to higher exhaust gas temperatures and lower peak pressures (Pmax), while excessively early injection increases mechanical stress on bearings and the crankshaft.
                        </p>

                        <div className="bg-lightgray p-8 rounded-2xl my-10 border-l-4 border-gold">
                            <h4 className="text-navy font-bold mb-2">Key Technical Insight (Information Gain)</h4>
                            <p className="text-sm italic">
                                "While many operators focus on fuel pump stroke, the actual 'Atomization Delta' is determined by the differential pressure between the fuel line and the scavenge air. In our experience at anchorages in high-humidity regions, we recommend increasing pre-heating temperatures by 5°C above standard OEM parameters to ensure optimal viscosity at the nozzle tip."
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-navy font-plus-jakarta-sans mt-12 mb-6">Critical Maintenance Steps</h2>
                        <ul className="space-y-4 list-none pl-0">
                            {[
                                "Nozzle Inspection: Check for carbon deposition and 'trumpet' formation.",
                                "Spring Tension: Verify fuel valve spring pressure using a certified test stand.",
                                "Timing Calibration: Adjust the VIT (Variable Injection Timing) system linkage for optimal Pmax.",
                                "Exhaust Valve Timing: Ensure the exhaust valve closure remains synchronized with the compression stroke."
                            ].map((step, idx) => (
                                <li key={idx} className="flex gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0" />
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-bold text-navy font-plus-jakarta-sans mt-12 mb-6">The Impact of VIT (Variable Injection Timing)</h3>
                        <p>
                            Variable Injection Timing (VIT) is designed to keep Pmax near its maximum value during part-load operation. For older engines, manual mechanical adjustment is required. Our technicians specialize in fine-tuning these linkages to ensure your engine operates at its design efficiency across the entire load range.
                        </p>
                    </div>

                    {/* FAQ Insert for AEO */}
                    <div id="faq" className="mt-20">
                        <FAQSection
                            title="Engine Maintenance FAQ"
                            faqs={guideFaqs}
                        />
                    </div>

                    {/* Back Link */}
                    <div className="mt-20 pt-10 border-t border-gray-100">
                        <Link
                            href="/support/technical-guides/"
                            className="text-gold font-bold flex items-center gap-2 hover:gap-4 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back to Technical Guides
                        </Link>
                    </div>
                </div>
            </section>

            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Support", url: "/support/" },
                { name: "Technical Guides", url: "/support/technical-guides/" },
                { name: "Fuel Optimization", url: "/support/technical-guides/man-bw-fuel-optimization" }
            ]} />
        </article>
    );
}
