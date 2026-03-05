'use client';

import PageHero from '@/components/ui/PageHero';
import ServicesGrid from '@/components/sections/home/ServicesGrid';
import QuickQuote from '@/components/sections/home/QuickQuote';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function Services() {
    return (
        <>
            <PageHero
                title="Our Services"
                subtitle="Comprehensive Marine & Industrial Solutions"
                bgClass="bg-gradient-to-tr from-navy via-primary-900 to-accent-800"
                image="/services-banner.webp"
                breadcrumbs={[
                    { label: 'Services', href: '/services/' }
                ]}
            />

            <section className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="text-lg leading-8 text-gray-700 font-inter mb-6">
                            Leon International is a leading maritime engineering solutions provider, recognized for delivering world-class ship repair, dry docking, and advanced technical services globally. Headquartered in Karachi, Pakistan, with an expansive network spanning across major international seaports, our comprehensive service portfolio covers the complete lifecycle of marine vessels and industrial assets. From emergency afloat repairs at anchorage to highly complex mechanical overhauling and structural steel fabrication, our certified squads are available 24/7.
                        </p>
                        <p className="text-lg leading-8 text-gray-700 font-inter">
                            We deploy highly trained marine engineers, coded welders, and NDT technicians certified by top classification societies like Bureau Veritas (BV) and Lloyd's Register (LR). By combining premium-grade OEM spare parts, extensive domain expertise, and rigorous quality assurance testing protocols, we guarantee that your propulsion machinery, navigational electronics, and HVAC systems operate continuously at optimal efficiency, minimizing costly downtime.
                        </p>
                    </div>
                </div>
            </section>

            {/* Reusing the Services Grid from Homepage but hiding its internal title for better flow if necessary, 
          though it looks good as a standalone block. We'll just render it directly. */}
            <div className="-mt-12">
                <ServicesGrid />
            </div>

            <QuickQuote />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services/" }
            ]} />
        </>
    );
}
