import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Leon International — 24/7 Global Marine Support",
    description: "Get in touch with Leon International for emergency ship repairs, spare parts inquiries, or project consultations. Offices in Karachi (HQ), Dubai, Shanghai, and Riga.",
    alternates: {
        canonical: 'https://leoninternational.com/contact/',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
