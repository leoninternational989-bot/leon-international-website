import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Marine Spare Parts & Equipment — OEM & Aftermarket Supply",
    description: "Browse our complete range of marine spare parts — engine parts, diesel generators, turbochargers, navigation systems, hydraulic equipment, deck machinery & more. 20+ engine brands supported.",
    alternates: {
        canonical: 'https://leon-international.com/products/',
    },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
