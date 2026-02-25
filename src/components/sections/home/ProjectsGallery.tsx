'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import Image from 'next/image';

const projects = [
    {
        title: 'Buoys Fabrication',
        category: 'Steel structure fabrication',
        href: '/projects/',
        image: '/Projects/buoys_fabrication.webp',
    },
    {
        title: 'Generator Overhauling',
        category: 'Daihatsu DK20 complete overhaul',
        href: '/projects/',
        image: '/Projects/generator_overhauling.webp',
    },
    {
        title: 'Loading Arms Repairing',
        category: 'Port facility maintenance',
        href: '/projects/',
        image: '/Projects/loading_arms_repair.webp',
    },
    {
        title: 'Fender Repair Work',
        category: 'Marine fender restoration',
        href: '/projects/',
        image: '/Projects/fender_repair.webp',
    },
    {
        title: 'Weighbridge Repair',
        category: 'Industrial infrastructure',
        href: '/projects/',
        image: '/Projects/weighbridge_repair.webp',
    },
    {
        title: 'Main Engine Overhaul',
        category: 'Complete reconditioning',
        href: '/projects/',
        image: '/Projects/main_engine_overhaul.webp',
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
                            className={`group relative overflow-hidden rounded-2xl flex flex-col justify-end p-6 ${index === 0 || index === 3 ? 'md:row-span-2' : '' // make some items taller to break grid monotony
                                }`}
                        >
                            {/* Background Image */}
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Premium overlay effect */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay z-10 pointer-events-none"></div>

                            {/* Hover gradient sweep */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>

                            <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
