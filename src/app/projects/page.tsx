import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ProjectsGallery from '@/components/sections/projects/ProjectsGallery';

export const metadata: Metadata = {
    title: 'Our Projects Portfolio | Leon International',
    description: 'Explore our decades of maritime excellence through our portfolio of ship repair, mechanical engineering, fabrication, and industrial projects.',
};

export default function ProjectsPage() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Our Projects"
                subtitle="Decades of Maritime Excellence — See Our Work Across Ship Repair, Fabrication & Engineering"
                breadcrumbs={[
                    { label: 'Projects', href: '/projects/' }
                ]}
                bgClass="bg-gradient-to-br from-primary-950 via-slate-900 to-indigo-950"
            />

            <section className="py-24 relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ocean/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent-500/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ProjectsGallery />
                </div>
            </section>
        </main>
    );
}
