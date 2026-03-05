import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ProjectsGallery from '@/components/sections/projects/ProjectsGallery';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

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

                <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
                    <p className="text-lg leading-8 text-gray-300 font-inter mb-6">
                        Leon International takes immense pride in a robust and diverse portfolio of maritime engineering and industrial projects successfully executed over the past 50 years. Our teams have completed highly complex assignments spanning from massive dry docking and afloat ship repairs in the major port cities of Karachi and Bin Qasim, to advanced fabrication and NDT structural integrity inspections.
                    </p>
                    <p className="text-lg leading-8 text-gray-300 font-inter">
                        We cater to a vast geographic scope covering Pakistan, alongside strategic international operations, serving elite clients including classification societies, commercial ship owners, bulk carriers, and global marine logistics chains. Explore the extensive gallery below to review our certified mechanical overhauling jobs, precision electrical PCB repairs, protective coatings applications, and mission-critical vessel restoration operations reliably executed on time and under budget.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <ProjectsGallery />
                </div>
            </section>
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Projects", url: "/projects/" }
            ]} />
        </main>
    );
}
