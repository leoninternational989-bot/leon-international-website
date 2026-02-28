import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { MapPin, Phone, Mail } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Leon International',
    description: 'Get in touch with Leon International. We are available 24/7 across our offices in Pakistan, UAE, China, and Latvia.',
};

const localBusinessSchema = [
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Leon International - Pakistan Headquarters",
        "image": "https://leoninternational.com/og/default.jpg",
        "email": "info@leon-international.com",
        "telephone": "+923132277773",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "C-102 Block 4 Gulshan-E-Iqbal",
            "addressLocality": "Karachi",
            "addressRegion": "Sindh",
            "addressCountry": "PK"
        },
        "url": "https://leoninternational.com/contact/"
    },
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Leon International - UAE Office",
        "image": "https://leoninternational.com/og/default.jpg",
        "email": "info@leon-international.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Office No: CWS-1V-223879, 26th Floor, Amber Gem Tower, Sheikh Khalifa Street",
            "addressLocality": "Ajman",
            "addressCountry": "AE"
        },
        "url": "https://leoninternational.com/contact/"
    },
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Leon International - China Office",
        "image": "https://leoninternational.com/og/default.jpg",
        "email": "info@leon-international.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "No. 29-4, Xinhuaqiang District",
            "addressLocality": "Shiyan City",
            "addressRegion": "Hubei",
            "addressCountry": "CN"
        },
        "url": "https://leoninternational.com/contact/"
    },
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Leon International - Latvia Office",
        "image": "https://leoninternational.com/og/default.jpg",
        "email": "info@leon-international.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Annas Brigaderes iela 4-47",
            "postalCode": "LV-1082",
            "addressLocality": "Riga",
            "addressCountry": "LV"
        },
        "url": "https://leoninternational.com/contact/"
    }
];

export default function ContactPage() {
    const offices = [
        {
            country: 'Pakistan (Headquarters)',
            address: 'C-102 Block 4 Gulshan-E-Iqbal, Karachi, Pakistan',
            phones: ['0313 2277773'],
            emails: ['info@leon-international.com']
        },
        {
            country: 'UAE Office',
            address: 'Office No: CWS-1V-223879, 26th Floor, Amber Gem Tower, Sheikh Khalifa Street, Ajman, UAE',
            emails: ['info@leon-international.com']
        },
        {
            country: 'China Office',
            address: 'No. 29-4, Xinhuaqiang District, Shiyan City, Hubei, China',
            emails: ['info@leon-international.com']
        },
        {
            country: 'Latvia Office',
            address: 'Annas Brigaderes iela 4-47, LV-1082, Rīga, Latvia',
            emails: ['info@leon-international.com']
        }
    ];

    return (
        <main className="bg-primary-950 min-h-screen">
            <JsonLd data={localBusinessSchema} />
            <PageHero
                title="Contact Us"
                subtitle="Get in Touch With Our Team — We're Available 24/7"
                breadcrumbs={[
                    { label: 'Contact Us', href: '/contact/' }
                ]}
                bgClass="bg-gradient-to-br from-primary-950 via-gray-900 to-accent-900"
            />

            <section className="py-24 relative">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ocean/5 rounded-full blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Column: Contact Form */}
                        <ContactForm />

                        {/* Right Column: Contact Info */}
                        <div className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {offices.map((office, idx) => (
                                    <div key={idx} className={`bg-primary-900 border border-white/5 rounded-xl p-6 hover:border-accent-500/30 transition-colors ${idx === 0 ? 'md:col-span-2' : ''}`}>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-accent-500" />
                                            {office.country}
                                        </h3>
                                        <div className="space-y-3 text-sm text-gray-300">
                                            <p className="flex items-start gap-3">
                                                <MapPin className="h-4 w-4 mt-0.5 text-gray-500 shrink-0" />
                                                <span>{office.address}</span>
                                            </p>

                                            {office.phones && (
                                                <div className="flex items-start gap-3">
                                                    <Phone className="h-4 w-4 mt-0.5 text-gray-500 shrink-0" />
                                                    <div className="flex flex-col">
                                                        {office.phones.map((p, i) => <span key={i}>{p}</span>)}
                                                    </div>
                                                </div>
                                            )}

                                            {office.emails && (
                                                <div className="flex items-start gap-3">
                                                    <Mail className="h-4 w-4 mt-0.5 text-gray-500 shrink-0" />
                                                    <div className="flex flex-col">
                                                        {office.emails.map((e, i) => <a key={i} href={`mailto:${e}`} className="hover:text-accent-400 transition-colors">{e}</a>)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Full Width Embedded Map for HQ */}
                    <div className="mt-16 h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115814.73367123992!2d66.903808!3d24.8911197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="filter grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}
