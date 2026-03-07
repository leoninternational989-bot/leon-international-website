import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Settings,
    ShieldCheck,
    Wrench,
    MessageSquare,
    FileText,
    Search
} from 'lucide-react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
    title: 'Support & Knowledge Base | Leon International',
    description: 'Technical resources, maintenance guides, and expert troubleshooting for marine engineering and ship repair.',
};

const categories = [
    {
        title: 'Maintenance Guides',
        description: 'Step-by-step instructions for marine engine maintenance and overhauling.',
        icon: Settings,
        href: '/support/technical-guides/',
        color: 'bg-blue-500',
    },
    {
        title: 'Technical Documentation',
        description: 'OEM specifications, parts catalogs, and engineering standards.',
        icon: FileText,
        href: '/spare-parts-supply/',
        color: 'bg-navy',
    },
    {
        title: 'Troubleshooting FAQ',
        description: 'Quick answers to common on-site engineering and repair challenges.',
        icon: MessageSquare,
        href: '#faq',
        color: 'bg-gold',
    },
    {
        title: 'Safety & Compliance',
        description: 'International maritime safety standards and certification procedures.',
        icon: ShieldCheck,
        href: '/about/#certifications',
        color: 'bg-green-600',
    }
];

const featuredArticles = [
    {
        title: "Optimizing MAN B&W Fuel Consumption",
        excerpt: "A technical analysis of fuel injection timing and its impact on SFC (Specific Fuel Consumption).",
        date: "Last Updated: March 2026",
        href: "/support/technical-guides/"
    },
    {
        title: "Common Turbocharger Failure Modes",
        excerpt: "Identifying early warning signs of rotor imbalance and bearing wear in marine turbochargers.",
        date: "Last Updated: Feb 2026",
        href: "/support/technical-guides/"
    },
    {
        title: "Cold Storage Insulation Restoration",
        excerpt: "Advanced HVAC techniques for restoring thermal efficiency in aging vessel reefers.",
        date: "Last Updated: Jan 2026",
        href: "/support/technical-guides/"
    }
];

export default function SupportHub() {
    return (
        <div className="bg-white">
            <PageHero
                title="Support & Knowledge Base"
                subtitle="Expert Marine Engineering Resources & Technical Guidance"
                bgClass="bg-gradient-to-tr from-navy via-primary-900 to-ocean"
                breadcrumbs={[
                    { label: 'Support', href: '/support/' }
                ]}
            />

            {/* Support Hub Header */}
            <section className="py-16 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-navy font-plus-jakarta-sans mb-4">How can we help you?</h2>
                        <p className="text-lg text-gray-600 font-inter mb-8">
                            Search our technical library for maintenance procedures, spare parts specifications, and engineering troubleshooting guides.
                        </p>
                        <div className="relative max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for 'crankshaft alignment' or 'MAN fuel valves'..."
                                className="w-full pl-12 pr-4 py-4 bg-lightgray border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 font-inter"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => (
                            <Link
                                key={cat.title}
                                href={cat.href}
                                className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 ${cat.color} rounded-lg flex items-center justify-center text-white mb-6`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-navy font-plus-jakarta-sans mb-3 group-hover:text-gold transition-colors">
                                    {cat.title}
                                </h3>
                                <p className="text-sm leading-6 text-gray-600 font-inter">{cat.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Articles - Information Gain Section */}
            <section className="py-24 bg-lightgray">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-navy font-plus-jakarta-sans">Featured Technical Insights</h2>
                            <p className="mt-4 text-gray-600 font-inter">Deep-dive guides written by our senior marine engineers.</p>
                        </div>
                        <Link href="/support/technical-guides/" className="hidden md:block text-gold font-semibold hover:underline decoration-2 underline-offset-4">
                            View all guides &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredArticles.map((article) => (
                            <div key={article.title} className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col">
                                <span className="text-xs font-semibold text-ocean mb-4 uppercase tracking-wider">{article.date}</span>
                                <h3 className="text-xl font-bold text-navy font-plus-jakarta-sans mb-4">{article.title}</h3>
                                <p className="text-sm leading-6 text-gray-600 font-inter mb-6 flex-grow">{article.excerpt}</p>
                                <Link
                                    href={article.href}
                                    className="text-navy font-bold text-sm hover:text-gold transition-colors inline-flex items-center gap-2"
                                >
                                    Read Technical Guide <BookOpen className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Support CTA */}
            <section className="py-24 bg-navy relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white font-plus-jakarta-sans mb-6">Need Immediate Technical Assistance?</h2>
                    <p className="text-lg text-primary-200 font-inter mb-10 max-w-2xl mx-auto">
                        Our emergency mobile repair teams are available 24/7 for on-site troubleshooting and repairs at anchorage or berth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact/"
                            className="bg-gold text-navy px-8 py-4 rounded-xl font-bold hover:bg-white transition-all shadow-lg"
                        >
                            Contact Engineering Team
                        </Link>
                        <a
                            href="https://wa.me/923132277773"
                            className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                        >
                            WhatsApp Support
                        </a>
                    </div>
                </div>
            </section>

            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Support Hub", url: "/support/" }
            ]} />
        </div>
    );
}
