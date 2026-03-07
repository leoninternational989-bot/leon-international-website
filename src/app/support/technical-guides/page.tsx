import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Settings, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
    title: 'Marine Engineering Technical Guides | Leon International',
    description: 'Specialized maintenance guides, overhauling procedures, and technical troubleshooting for maritime engineering professionals.',
};

const guides = [
    {
        title: "Optimizing MAN B&W Fuel Consumption",
        category: "Engine Maintenance",
        excerpt: "Critical adjustments for fuel injection timing and its direct impact on vessel efficiency and emissions.",
        icon: Settings,
        href: "/support/technical-guides/man-bw-fuel-optimization",
        readTime: "12 min read"
    },
    {
        title: "Turbocharger Rotor Balancing Procedures",
        category: "Overhauling",
        excerpt: "A step-by-step guide to identifying imbalance, vibration analysis, and field-balancing techniques.",
        icon: BookOpen,
        href: "/support/technical-guides/turbocharger-balancing",
        readTime: "15 min read"
    },
    {
        title: "Metal Stitching & Cold Repair Standards",
        category: "Emergency Repair",
        excerpt: "When and how to use metal stitching (Castmaster) for repairing cracked engine blocks without welding.",
        icon: ShieldCheck,
        href: "/support/technical-guides/metal-stitching-guide",
        readTime: "10 min read"
    }
];

export default function TechnicalGuides() {
    return (
        <div className="bg-white">
            <PageHero
                title="Technical Engineering Guides"
                subtitle="Deep-Dive Maintenance & Repair Procedures for Marine Professionals"
                bgClass="bg-gradient-to-tr from-primary-950 via-navy to-primary-800"
                breadcrumbs={[
                    { label: 'Support', href: '/support/' },
                    { label: 'Technical Guides', href: '/support/technical-guides/' }
                ]}
            />

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar Filters */}
                        <div className="lg:col-span-1">
                            <h3 className="text-lg font-bold text-navy font-plus-jakarta-sans mb-6">Categories</h3>
                            <ul className="space-y-4">
                                {['All Guides', 'Main Engines', 'Auxiliary Systems', 'Ship Repair', 'Turbochargers', 'NDT Testing'].map((cat) => (
                                    <li key={cat}>
                                        <button className={`text-sm font-medium ${cat === 'All Guides' ? 'text-gold' : 'text-gray-600 hover:text-navy'} transition-colors`}>
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Guides List */}
                        <div className="lg:col-span-3">
                            <div className="flex flex-col gap-8">
                                {guides.map((guide) => (
                                    <div
                                        key={guide.title}
                                        className="group p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-start"
                                    >
                                        <div className="w-16 h-16 bg-lightgray rounded-xl flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-white transition-colors flex-shrink-0">
                                            <guide.icon className="w-8 h-8" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="text-xs font-bold text-gold uppercase tracking-widest">{guide.category}</span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-500">{guide.readTime}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-navy font-plus-jakarta-sans mb-4 group-hover:text-gold transition-colors">
                                                {guide.title}
                                            </h3>
                                            <p className="text-base leading-7 text-gray-600 font-inter mb-6">
                                                {guide.excerpt}
                                            </p>
                                            <Link
                                                href={guide.href}
                                                className="inline-flex items-center gap-2 font-bold text-navy hover:translate-x-1 transition-transform"
                                            >
                                                Read Full technical Guide <ChevronRight className="w-4 h-4 text-gold" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter/Alerts CTA */}
            <section className="py-24 bg-lightgray border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta-sans mb-4">Stay updated with technical bulletins</h2>
                    <p className="text-gray-600 font-inter mb-8 max-w-xl mx-auto">
                        Get notified when we publish new maintenance guides, safety alerts, and maritime engineering case studies.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow px-6 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                        <button className="bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-gold hover:text-navy transition-all">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Support", url: "/support/" },
                { name: "Technical Guides", url: "/support/technical-guides/" }
            ]} />
        </div>
    );
}
