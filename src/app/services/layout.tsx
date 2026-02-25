import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Marine Engineering Services — Ship Repair, NDT, Fabrication & More",
    description: "Explore Leon International's full range of marine engineering services — ship repair & dry docking, mechanical repair, electrical work, fabrication & welding, NDT inspection, protective coatings, HVAC, and specialized maritime solutions.",
    alternates: {
        canonical: 'https://leoninternational.com/services/',
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
