'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 1,
        heading: 'Your Global Partner in Marine Engineering & Spare Parts',
        subheading: 'Serving 7 Oceans from 4 Countries — Pakistan | UAE | China | Latvia',
        primaryCta: { text: 'Request a Quote', href: '/quote/' },
        secondaryCta: { text: 'Explore Our Services', href: '/services/' },
        image: '/hero-1.webp',
        bgClass: 'from-primary-950/90 via-navy/80 to-ocean/80',
    },
    {
        id: 2,
        heading: 'Decades of Marine Technical Excellence',
        subheading: 'Certified by Lloyd\'s Register, Bureau Veritas, DNV, ABS & Leading Classification Societies',
        primaryCta: { text: 'View Our Certifications', href: '/about/#certifications' },
        secondaryCta: { text: 'Our Projects', href: '/projects/' },
        image: '/hero-image-2.webp',
        bgClass: 'from-primary-900/90 via-primary-800/80 to-steel/90',
    },
    {
        id: 3,
        heading: 'Complete Ship Repair & Spare Parts Under One Roof',
        subheading: 'From Engine Overhauling to Navigation Systems — 20+ Engine Brands Covered',
        primaryCta: { text: 'Browse Products', href: '/products/' },
        secondaryCta: { text: 'Contact Us', href: '/contact/' },
        image: '/hero-3.webp',
        bgClass: 'from-navy/90 via-primary-950/80 to-primary-700/80',
    },
];

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = currentSlideState();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden top-[-80px] lg:top-[-96px] mb-[-80px] lg:mb-[-96px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {/* Background Image */}
                    <Image
                        src={slides[currentSlide].image}
                        alt="Hero Background"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgClass}`} />

                    {/* Subtle noise texture overlay for premium feel */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center mt-20">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-plus-jakarta-sans max-w-4xl mx-auto drop-shadow-md"
                        >
                            {slides[currentSlide].heading}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mt-6 text-lg sm:text-xl leading-8 text-primary-100 max-w-2xl mx-auto drop-shadow"
                        >
                            {slides[currentSlide].subheading}
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
                        >
                            <Link
                                href={slides[currentSlide].primaryCta.href}
                                className="rounded-md bg-accent-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 transition-all hover:-translate-y-1 w-full sm:w-auto"
                            >
                                {slides[currentSlide].primaryCta.text}
                            </Link>
                            <Link
                                href={slides[currentSlide].secondaryCta.href}
                                className="rounded-md bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-all w-full sm:w-auto"
                            >
                                {slides[currentSlide].secondaryCta.text} <span aria-hidden="true">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-12 h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-accent-500' : 'bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

// Helper to keep state inside component but clean setup
function currentSlideState() {
    return useState(0);
}
