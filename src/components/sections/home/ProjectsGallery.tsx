'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'Buoys Fabrication',
        category: 'Steel structure fabrication',
        href: '/projects/',
        // Using tailored background colors/gradients since we don't have images
        bgClass: 'bg-gradient-to-br from-primary-900 to-navy',
    },
    {
        title: 'Generator Overhauling',
        category: 'Daihatsu DK20 complete overhaul',
        href: '/projects/',
        bgClass: 'bg-gradient-to-bl from-accent-700 to-primary-800',
    },
    {
        title: 'Loading Arms Repairing',
        category: 'Port facility maintenance',
        href: '/projects/',
        bgClass: 'bg-gradient-to-tr from-steel to-navy',
    },
    {
        title: 'Fender Repair Work',
        category: 'Marine fender restoration',
        href: '/projects/',
        bgClass: 'bg-gradient-to-b from-ocean to-primary-950',
    },
    {
        title: 'Weighbridge Repair',
        category: 'Industrial infrastructure',
        href: '/projects/',
        bgClass: 'bg-gradient-to-t from-primary-800 to-accent-600',
    },
    {
        title: 'Main Engine Overhaul',
        category: 'Complete reconditioning',
        href: '/projects/',
        bgClass: 'bg-gradient-to-br from-navy to-ocean',
    },
];

export default function ProjectsGallery() {
    return (
        <section className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl font-plus-jakarta-sans">
                            Our Work Speaks for Itself
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 font-inter">
                            A glimpse of recent projects across ship repair, fabrication, and engine overhauling.
                        </p>
                    </div>
                    <Link
                        href="/projects/"
                        className="hidden md:inline-flex rounded-md bg-white border-2 border-primary-950 px-6 py-2.5 text-sm font-semibold text-primary-950 shadow-sm hover:bg-primary-50 transition-colors font-inter items-center"
                    >
                        View All Projects <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                </div>

                {/* CSS Masonry-ish Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-2xl ${project.bgClass} flex flex-col justify-end p-6 ${index === 0 || index === 3 ? 'md:row-span-2' : '' // make some items taller to break grid monotony
                                }`}
                        >
                            {/* Premium overlay effect */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

                            {/* Hover gradient sweep */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-sm font-medium text-accent-200 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 uppercase tracking-wider">
                                    {project.category}
                                </p>
                                <h3 className="text-xl font-bold text-white font-plus-jakarta-sans">
                                    {project.title}
                                </h3>
                                <Link href={project.href} className="absolute inset-0"><span className="sr-only">View {project.title}</span></Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 md:hidden flex justify-center">
                    <Link
                        href="/projects/"
                        className="rounded-md bg-white border-2 border-primary-950 px-6 py-2.5 text-sm font-semibold text-primary-950 shadow-sm hover:bg-primary-50 transition-colors font-inter inline-flex items-center"
                    >
                        View All Projects <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
