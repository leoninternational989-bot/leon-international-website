import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Marine Electrical Equipment"
                subtitle="Switches, breakers, sensors, and full automation system components."
                breadcrumbs={[
                    { label: 'Products', href: '/products/' },
                    { label: 'Marine Electrical Equipment', href: '/electrical-equipment/' }
                ]}
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our Marine Electrical Equipment
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Switches, breakers, sensors, and full automation system components. Leon International is a leading marine engineering company with decades of experience. We provide class-approved solutions to ship owners, managers, and offshore industrial operators worldwide from our headquarters in Karachi.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Our highly trained technicians and marine engineers ensure that every project meets the highest international maritime standards. Whether it's emergency response at anchorage or routine maintenance, you can rely on our expertise.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-4">Why Choose Leon International?</h3>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Decades of Maritime Experience',
                                    '24/7 Fast Response Teams',
                                    'ISO 9001:2008 & BV Certified',
                                    'Global Supply Chain & Logistics'
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
                            {/* Standardizing the image across all for now */}
                            <Image
                                src="/images/electrical-spares/service-1.webp"
                                alt="Variety of marine-grade electrical spares and components"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-white/10 w-full">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto space-y-6">

                            <div className="bg-primary-900/50 p-6 rounded-xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3">What marine electrical equipment does Leon International supply?</h3>
                                <p className="text-gray-300">Leon International supplies high-quality OEM and aftermarket marine electrical equipment for marine engines and industrial applications, serving vessels globally.</p>
                            </div>

                            <div className="bg-primary-900/50 p-6 rounded-xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3">Are the marine electrical equipment OEM or aftermarket?</h3>
                                <p className="text-gray-300">We supply both Genuine/OEM parts and high-quality European/Japanese aftermarket equivalents depending on client budgets and requirements.</p>
                            </div>

                            <div className="bg-primary-900/50 p-6 rounded-xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3">How quickly can you deliver marine spare parts?</h3>
                                <p className="text-gray-300">With stock at key locations and a global logistics network, we ensure rapid dispatch of critical parts to minimize vessel downtime.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <QuickQuote />
        </main>
    );
}
