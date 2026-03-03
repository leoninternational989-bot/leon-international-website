import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Leon International — Decades in Marine Engineering",
    description: "Discover Leon International's journey — from our founding in Karachi to becoming a multi-national marine engineering company with global operations headquartered in Pakistan. ISO 9001 certified, Lloyd's & Bureau Veritas approved.",
    alternates: {
        canonical: 'https://leoninternational.com/about/',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
