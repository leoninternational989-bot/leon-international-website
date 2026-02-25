import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Marine Projects Portfolio — Ship Repair, Fabrication & Engineering",
    description: "View our portfolio of marine engineering projects including major ship repairs, dry docking, structural fabrication, engine overhauls, and specialized offshore solutions.",
    alternates: {
        canonical: 'https://leoninternational.com/projects/',
    },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
