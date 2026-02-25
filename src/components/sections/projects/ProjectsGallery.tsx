'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Settings, Zap, Flame, Microscope, PaintRoller, ArrowRight } from 'lucide-react';

const categories = [
    'All',
    'Ship Repair',
    'Fabrication',
    'Engine Overhauling',
    'Electrical',
    'Coatings',
    'Deck Machinery',
    'Industrial'
];

const projects = [
    {
        id: 1,
        title: 'Buoys Fabrication',
        category: 'Fabrication',
        description: 'Custom steel buoy fabrication for port navigation ensuring long-term durability in harsh marine environments.',
        image: 'https://images.unsplash.com/photo-1542393278-f07bd0fb5d7c?q=80&w=2000&auto=format&fit=crop',
        icon: Flame
    },
    {
        id: 2,
        title: 'Loading Arms Repairing',
        category: 'Industrial',
        description: 'Industrial loading arm overhaul and restoration for a major petrochemical terminal.',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop',
        icon: Settings
    },
    {
        id: 3,
        title: 'Weighbridge Repairing',
        category: 'Industrial',
        description: 'Precision calibration and mechanical repair of a heavy-duty industrial weighbridge system.',
        image: 'https://images.unsplash.com/photo-1574360416972-e034e4a7a1cc?q=80&w=2000&auto=format&fit=crop',
        icon: Settings
    },
    {
        id: 4,
        title: 'Fender Repair Work',
        category: 'Ship Repair',
        description: 'Marine fender restoration and replacement along alongside berth to ensure safe vessel docking.',
        image: 'https://images.unsplash.com/photo-1521404098939-5561a293699b?q=80&w=2000&auto=format&fit=crop',
        icon: Anchor
    },
    {
        id: 5,
        title: 'Generator Overhauling',
        category: 'Engine Overhauling',
        description: 'Complete overhaul of Daihatsu DK20 auxiliary generator set, returning it to zero-hour performance specs.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop',
        icon: Settings
    },
    {
        id: 6,
        title: 'Fair Leads Roller Repair',
        category: 'Deck Machinery',
        description: 'Machining and reconditioning of heavy-duty deck hardware and mooring equipment.',
        image: 'https://images.unsplash.com/photo-1563820619-da409bc2c423?q=80&w=2000&auto=format&fit=crop',
        icon: Anchor
    },
    {
        id: 7,
        title: 'Main Engine Overhaul',
        category: 'Engine Overhauling',
        description: 'Complete reconditioning of a two-stroke main diesel engine during scheduled dry docking.',
        image: 'https://images.unsplash.com/photo-1621611135767-f2fb7079d2bf?q=80&w=2000&auto=format&fit=crop',
        icon: Settings
    },
    {
        id: 8,
        title: 'Oil Purifier Reconditioning',
        category: 'Mechanical Repair', // Putting in Industrial as fallback based on categories array
        description: 'Purifier disassembly, ultrasonic cleaning, balancing, and complete reassembly.',
        image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2000&auto=format&fit=crop',
        icon: Settings
    },
    {
        id: 9,
        title: 'Compressor Overhaul',
        category: 'Industrial',
        description: 'Sperre air compressor complete servicing, valve replacement, and testing.',
        image: 'https://images.unsplash.com/photo-1532635293-68d0bb50702d?q=80&w=2000&auto=format&fit=crop',
        icon: Settings
    },
    {
        id: 10,
        title: 'Hydraulic Windlass Motor',
        category: 'Deck Machinery',
        description: 'Custom shaft fabrication and complete hydraulic motor rebuilding for a bulk carrier windlass.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop',
        icon: Anchor
    },
    {
        id: 11,
        title: 'Tanker Chipping & Painting',
        category: 'Coatings',
        description: 'Full vessel hull surface preparation, grid-blasting, and application of marine anti-fouling paint systems.',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2000&auto=format&fit=crop',
        icon: PaintRoller
    },
    {
        id: 12,
        title: 'Crankshaft Reconditioning',
        category: 'Engine Overhauling',
        description: 'In-situ machining and precision polishing of a large generator crankshaft.',
        image: 'https://images.unsplash.com/photo-1533090368676-1fd25485ea2c?q=80&w=2000&auto=format&fit=crop',
        icon: Settings
    }
];

export default function ProjectsGallery() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <div className="flex flex-col gap-12">
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                            ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                            : 'bg-primary-900 border border-white/10 text-gray-300 hover:bg-primary-800 hover:text-white'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.4, type: 'spring' }}
                            className="group relative overflow-hidden rounded-2xl bg-primary-900 border border-white/5 shadow-xl hover:shadow-2xl transition-all h-[400px]"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/80 to-transparent" />
                            </div>

                            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-bold uppercase tracking-wider mb-4 border border-accent-500/30 backdrop-blur-sm">
                                        {project.category}
                                    </span>

                                    <h3 className="text-2xl font-bold text-white mb-3 font-plus-jakarta-sans">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
