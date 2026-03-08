'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

interface PageHeroProps {
    title: string;
    subtitle: string;
    bgClass?: string;
    breadcrumbs?: { label: string; href: string }[];
    image?: string;
}

export default function PageHero({
    title,
    subtitle,
    bgClass = "bg-gradient-to-tr from-primary-950 via-navy to-ocean",
    breadcrumbs,
    image
}: PageHeroProps) {
    const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://leon-international.com/"
            },
            ...breadcrumbs.map((crumb, idx) => ({
                "@type": "ListItem",
                "position": idx + 2,
                "name": crumb.label,
                "item": `https://leon-international.com${crumb.href}`
            }))
        ]
    } : null;

    return (
        <section className={`relative min-h-[40vh] py-20 lg:py-28 w-full overflow-hidden top-[-80px] lg:top-[-96px] mb-[-80px] lg:mb-[-96px] flex flex-col justify-end ${image ? 'bg-primary-950/80' : bgClass}`}>
            {image && (
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={image}
                        alt={`${title} Background`}
                        fill
                        className="object-cover opacity-80"
                        priority
                        sizes="100vw"
                    />
                </div>
            )}
            {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
            {/* Background textures */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className={`absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent ${image ? 'opacity-40' : 'opacity-80'}`} />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="mb-6 flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-2 text-sm text-primary-200">
                            <li>
                                <div className="flex items-center">
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </div>
                            </li>
                            {breadcrumbs.map((crumb, idx) => (
                                <li key={idx}>
                                    <div className="flex items-center">
                                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-primary-400 mr-2" aria-hidden="true" />
                                        <Link
                                            href={crumb.href}
                                            className={`hover:text-white transition-colors ${idx === breadcrumbs.length - 1 ? 'font-semibold text-white' : ''}`}
                                            aria-current={idx === breadcrumbs.length - 1 ? 'page' : undefined}
                                        >
                                            {crumb.label}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-plus-jakarta-sans drop-shadow-md">
                        {title}
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-primary-100 font-inter max-w-2xl drop-shadow">
                        {subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
