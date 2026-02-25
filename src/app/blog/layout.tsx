import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Maritime Insights Blog — News & Technical Articles",
    description: "Read the latest maritime industry news, technical guides on ship repair, case studies, and updates from Leon International's global operations.",
    alternates: {
        canonical: 'https://leoninternational.com/blog/',
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
