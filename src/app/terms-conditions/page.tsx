import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';

export const metadata = {
    title: 'Terms & Conditions | Leon International',
    description: 'Terms and Conditions regarding the use of Leon International website and services, including marine engineering, ship repair, and spare parts supply.',
    alternates: {
        canonical: 'https://leoninternational.com/terms-conditions/',
    }
};

export default function TermsConditionsPage() {
    return (
        <main className="bg-white min-h-screen pb-16">
            <PageHero
                title="Terms & Conditions"
                subtitle="Last Updated: February 2026"
                breadcrumbs={[{ label: 'Terms & Conditions', href: '/terms-conditions/' }]}
            />
            <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-12">

                <div className="prose prose-lg prose-primary max-w-none text-gray-600 font-inter space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">1. Agreement to Terms</h2>
                        <p>
                            These Terms & Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Leon International ("we," "us" or "our"), concerning your access to and use of the leoninternational.com website as well as any related marine engineering, ship repair, or spare parts supply services.
                        </p>
                        <p className="mt-4">
                            You agree that by accessing the Site or engaging our services across our global offices (Pakistan and worldwide), you have read, understood, and agree to be bound by all of these Terms & Conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">2. Services Representation</h2>
                        <p>
                            We make every effort to display as accurately as possible the marine engineering services, dry docking capabilities, and OEM/aftermarket spare parts availability. However, due to the dynamic nature of maritime operations, the final scope of work, availability, and pricing for ship repair projects and spare parts are subject to formal confirmation via a commercial quotation or contract.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">3. Request for Quote (RFQ) & Orders</h2>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Submitting a quote request via our website does not constitute a binding contract.</li>
                            <li>All quotes provided are valid for the explicitly stated duration on the official quotation document.</li>
                            <li>Specific terms regarding payment, delivery routing, INCOTERMS, and project execution timelines will be outlined in individualized service contracts.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">4. Certifications and Standards</h2>
                        <p>
                            Leon International operates under strict maritime engineering standards complying with ISO 9001 guidelines and classification societies including Lloyd's Register and Bureau Veritas. While we guarantee compliance with these standards during service execution, the operational liability of the vessel remains with the ship owner/operator upon completion and handover of repair works.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">5. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">6. Limitation of Liability</h2>
                        <p>
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the website or reliance on any information provided on the website. Specific liabilities regarding ship repair and equipment supply will be strictly governed by individual project contracts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">7. Contact Information</h2>
                        <p>For inquiries regarding these Terms & Conditions, please contact our legal and administrative team at:</p>
                        <div className="mt-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <p className="font-bold text-primary-950">Leon International</p>
                            <p>Email: <a href="mailto:info@leon-international.com" className="text-ocean hover:text-accent-600 transition-colors">info@leon-international.com</a></p>
                            <p>Phone: +92 313 2277773</p>
                        </div>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100">
                    <Link href="/" className="text-ocean hover:text-accent-600 font-semibold transition-colors">
                        &larr; Return to Homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}
