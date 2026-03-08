import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Food Supply Chain Support | Leon International',
    description: 'We play a crucial role in the food supply chain by providing a comprehensive range of products and services from raw material to packaging.',
    alternates: {
        canonical: 'https://leon-international.com/food-supply-chain-support/',
    },
};

export default function Page() {
    const partners = [
        { name: "Hilal Food", src: "/images/clients/hilal.png" },
        { name: "Ahmed Foods", src: "/images/clients/ahmed.png" },
        { name: "Dipitt", src: "/images/clients/dipitt.png" },
        { name: "Hamdard", src: "/images/clients/hamdard.png" },
        { name: "Candyland", src: "/images/clients/candyland.png" },
        { name: "Habib", src: "/images/clients/habib.png" },
    ];

    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Food Supply Chain Support"
                subtitle="We play a crucial role in the food supply chain by providing a comprehensive range of products and services."
                breadcrumbs={[
                    { label: 'Services', href: '/services/' },
                    { label: 'Food Supply Chain Support', href: '/food-supply-chain-support/' }
                ]}
                image="/images/food-supply-chain-support/banner.webp"
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Food Supply Chain Support
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                We play a crucial role in the food supply chain by providing a comprehensive range of products and services. Our offerings support the entire food production process, from raw material handling to final product packaging.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                By supplying essential machinery, parts, and chemicals, we help ensure that your food production operations run smoothly and efficiently, contributing to the overall success of your business.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-4">Why Choose Us?</h3>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Comprehensive Range of Products & Services',
                                    'Support from Raw Material to Packaging',
                                    'Essential Machinery & Quality Chemical Supplying',
                                    'Reliable & Efficient Operations'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 hidden sm:block" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/quote/" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Request a Quote <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 mx-auto w-full">
                            <Image
                                src="/images/food-supply-chain-support/component.webp"
                                alt="Food Supply Chain Support operations"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Partners Section for this page */}
                    <div className="mt-16 mb-24 py-10 bg-white/5 rounded-3xl border border-white/10 px-8">
                        <p className="text-center text-sm font-bold text-gray-400 mb-8 uppercase tracking-[0.2em] font-inter">
                            Our Prime Food Industry Partners
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                            {partners.map((partner, i) => (
                                <div key={i} className="flex flex-col items-center justify-center gap-3">
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/10 shadow-inner bg-white/80 transition-transform hover:scale-105">
                                        <Image src={partner.src} alt={`${partner.name} logo`} fill className="object-contain p-2" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-300">{partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-white/10 w-full mb-20">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <FaqAccordion
                            faqs={[
                                {
                                    question: "What exactly does your food supply chain support cover?",
                                    answer: "Our offerings support the entire food production process, from raw material handling to final product packaging, supplying essential machinery, parts, and chemicals."
                                },
                                {
                                    question: "Do you supply customized machinery parts for food packaging?",
                                    answer: "Yes, we import state-of-the-art machinery and can also source top-tier mechanical parts to ensure continuous production flow in your food chain facility."
                                },
                                {
                                    question: "Who are your major clients in the food industry?",
                                    answer: "We proudly serve renowned organizations such as Hilal Food, Ahmed Foods, Dipitt, Hamdard, Candyland, and Habib, providing exceptional value and service."
                                }
                            ]}
                        />
                    </div>
                </div>
            </section>

            <QuickQuote />
        </main>
    );
}
