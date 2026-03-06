import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Request a Quote — Marine Engineering & Ship Repair Services",
    description: "Request a comprehensive quote from Leon International for ship repair, fabrication, NDT inspection, HVAC, or marine spare parts supply. Fast response times.",
    alternates: {
        canonical: 'https://leon-international.com/quote/',
    },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
