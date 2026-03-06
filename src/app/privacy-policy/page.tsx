import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';

export const metadata = {
    title: 'Privacy Policy | Leon International',
    description: 'Privacy Policy for Leon International. Read about how we collect, use, and protect your data across our marine engineering services.',
    alternates: {
        canonical: 'https://leon-international.com/privacy-policy/',
    }
};

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-white min-h-screen pb-16">
            <PageHero
                title="Privacy Policy"
                subtitle="Last Updated: February 2026"
                breadcrumbs={[{ label: 'Privacy Policy', href: '/privacy-policy/' }]}
            />
            <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-12">

                <div className="prose prose-lg prose-primary max-w-none text-gray-600 font-inter space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">1. Introduction</h2>
                        <p>
                            At Leon International, we are committed to protecting the privacy and security of our clients, partners, and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (leon-international.com) or engage with our marine engineering, ship repair, and spare parts supply services across our global offices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">2. Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways, including:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Personal Data:</strong> Name, professional title, company name, email address, phone number, and maritime vessel details provided via our quote request forms or direct communication.</li>
                            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.</li>
                            <li><strong>Business Data:</strong> Information relevant to maritime projects, dry docking specifications, and spare parts procurement necessary to fulfill our service agreements.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">3. How We Use Your Information</h2>
                        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Process and manage quote requests, RFQs, and marine service orders.</li>
                            <li>Communicate regarding ship repair schedules, spare parts delivery, and project milestones.</li>
                            <li>Send administrative information, such as updates to our terms, conditions, and policies.</li>
                            <li>Respond to customer service inquiries and provide support across our Pakistan and globally operations.</li>
                            <li>Improve our website performance and optimize our service offerings.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">4. Disclosure of Your Information</h2>
                        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others (including maritime classification societies such as Lloyd's Register or Bureau Veritas).</li>
                            <li><strong>Global Operations:</strong> Between our internal network of offices (Pakistan and worldwide) to ensure seamless delivery of offshore services and spare parts.</li>
                            <li><strong>Third-Party Service Providers:</strong> We may share your information with trusted third parties that perform services for us or on our behalf, including logistics partners, port authorities, and specialized maritime sub-contractors.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">5. Data Security</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary-900 mb-4">6. Contact Us</h2>
                        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                        <div className="mt-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <p className="font-bold text-primary-950">Leon International Headquarters</p>
                            <p>Karachi, Pakistan</p>
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
