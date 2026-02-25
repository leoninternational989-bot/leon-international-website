'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Anchor,
    Cog,
    Zap,
    Flame,
    Search,
    Package,
    Snowflake,
    ShieldCheck
} from 'lucide-react';

const services = [
    {
        name: 'Ship Repair & Dry Docking',
        description: 'Complete dry docking, ship lift transfer systems, and afloat repair facilities at Karachi Port and Port Bin Qasim.',
        icon: Anchor,
        href: '/ship-repair/',
        image: '/services/service-1.webp',
    },
    {
        name: 'Engine & Mechanical Repair',
        description: 'Main engine, generator, pump, and boiler overhauling with full reconditioning capabilities for major brands.',
        icon: Cog,
        href: '/mechanical-repair/',
        image: '/services/service-2.webp',
    },
    {
        name: 'Electrical & Electronics',
        description: 'Industrial motor rewinding, PCB card repair, transformer rewinding, and complete marine electrical system servicing.',
        icon: Zap,
        href: '/electrical/',
        image: '/services/service-3.webp',
    },
    {
        name: 'Fabrication & Welding',
        description: 'Steel structure fabrication, hull repair, pipe works, and all types of welding by BV-approved certified welders.',
        icon: Flame,
        href: '/fabrication/',
        image: '/services/service-4.webp',
    },
    {
        name: 'NDT & Inspection',
        description: 'Ultrasonic thickness gauging, flaw detection, magnetic particle inspection, and crane load testing.',
        icon: Search,
        href: '/ndt-inspection/',
        image: '/services/service-5.webp',
    },
    {
        name: 'Protective Coatings',
        description: 'Industrial protective coatings, Belzona applications, sandblasting, grit blasting, and metal stitching services.',
        icon: ShieldCheck,
        href: '/protective-coatings/',
        image: '/services/service-6.webp',
    },
    {
        name: 'HVAC & Refrigeration',
        description: 'Air conditioning plant repair, compressor overhauling, cold storage system maintenance, and Freon gas servicing.',
        icon: Snowflake,
        href: '/hvac/',
        image: '/services/service-7.webp',
    },
    {
        name: 'Specialized Services',
        description: 'Air lifting balloon operations, global spare parts sourcing, and precision custom parts fabrication.',
        icon: Package,
        href: '/specialized/',
        image: '/services/service-8.webp',
    }
];

export default function ServicesGrid() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isHovered, setIsHovered] = useState(false); // To pause auto-slide on hover

    // Auto-sliding functionality
    useEffect(() => {
        const autoSlide = setInterval(() => {
            if (!isDragging && !isHovered && scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // If we reach the end, instantly snap or smoothly scroll back
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
                }
            }
        }, 3500); // Slides every 3.5 seconds

        return () => clearInterval(autoSlide);
    }, [isDragging, isHovered]);

    // Dragging handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setIsHovered(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // the multiplier controls scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="bg-lightgray py-24 sm:py-32 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl font-plus-jakarta-sans">
                        Comprehensive Marine & Industrial Services
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 font-inter">
                        From major ship repairs and engine overhauling to precision testing, surface treatment, and emergency response across the globe.
                    </p>
                </div>

                {/* Draggable & Auto-sliding Carousel */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 sm:gap-8 pb-12 cursor-grab active:cursor-grabbing snap-mandatory snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                >
                    {services.map((service, index) => (
                        <Link
                            href={service.href}
                            key={service.name}
                            className="relative block h-[450px] w-[85vw] sm:w-[320px] lg:w-[280px] xl:w-[295px] shrink-0 rounded-2xl overflow-hidden group snap-center pointer-events-auto shadow-sm hover:shadow-xl transition-shadow"
                            draggable={false} // Prevent default link/image drag behavior
                        >
                            {/* Card Background Image */}
                            <Image
                                src={service.image}
                                alt={service.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 320px, 295px"
                                draggable={false}
                            />

                            {/* Permanent Bottom Gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent z-10" />

                            {/* Sleek Hover Gradient (Bottom to Top sliding) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/40 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-10" />

                            {/* Top Left Icon */}
                            <div className="absolute top-6 left-6 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-accent-500 group-hover:border-accent-400 transition-colors duration-500 shadow-lg">
                                <service.icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Bottom Text Content with slide-up reveal */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 overflow-hidden">
                                <div className="transform translate-y-[3.5rem] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-plus-jakarta-sans leading-tight">
                                        {service.name}
                                    </h3>
                                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out line-clamp-3">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/services/"
                        className="rounded-md bg-transparent border-2 border-primary-900 px-8 py-3.5 text-sm font-semibold text-primary-900 shadow-sm hover:bg-primary-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-900 transition-all font-inter inline-flex items-center"
                    >
                        Explore All Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
