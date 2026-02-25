'use client';

import PageHero from '@/components/ui/PageHero';
import ServicesGrid from '@/components/sections/home/ServicesGrid';
import QuickQuote from '@/components/sections/home/QuickQuote';

export default function Services() {
    return (
        <>
            <PageHero
                title="Our Services"
                subtitle="Comprehensive Marine & Industrial Solutions"
                bgClass="bg-gradient-to-tr from-navy via-primary-900 to-accent-800"
                breadcrumbs={[
                    { label: 'Services', href: '/services/' }
                ]}
            />

            <section className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-lg leading-8 text-gray-600 font-inter">
                            From emergency ship repairs at anchorage to complex industrial fabrication, our certified dry-docking and afloat repair squads are available 24/7. We combine high-quality materials, experienced personnel, and rigorous testing to ensure your machinery operates at peak efficiency.
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
        </>
    );
}
