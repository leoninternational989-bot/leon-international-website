import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, BarChart3, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Turbocharger Dynamic Balancing Guide | Leon International',
    description: 'A comprehensive technical guide on the importance and process of dynamic balancing for marine turbochargers to ensure efficiency and longevity.',
    alternates: {
        canonical: 'https://leon-international.com/support/technical-guides/turbocharger-balancing/',
    },
};

export default function TurbochargerBalancingPage() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Turbocharger Dynamic Balancing"
                subtitle="Ensuring peak performance and longevity through high-precision rotational balancing."
                breadcrumbs={[
                    { label: 'Support', href: '/support/' },
                    { label: 'Technical Guides', href: '/support/technical-guides/' },
                    { label: 'Turbocharger Balancing', href: '/support/technical-guides/turbocharger-balancing/' }
                ]}
                image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=80"
            />

            <section className="py-20 lg:py-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Link
                        href="/support/technical-guides/"
                        className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 mb-12 font-semibold transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Technical Guides
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 prose prose-invert prose-lg max-w-none">
                            <h2 className="text-4xl font-bold text-white mb-8 font-plus-jakarta-sans">The Critical Role of Dynamic Balancing</h2>
                            <p>
                                At operational speeds exceeding 50,000 RPM, even the slightest imbalance in a turbocharger rotor can generate destructive centrifugal forces. This guide explores the precision engineering required to achieve perfect rotational harmony.
                            </p>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 my-12">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <ShieldCheck className="text-accent-500 h-6 w-6" />
                                    Why Balance Your Turbocharger?
                                </h3>
                                <ul className="space-y-4 m-0 p-0 list-none">
                                    <li className="flex gap-3 text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0 mt-1" />
                                        <span><strong>Extended Bearing Life:</strong> Reduces harmonic vibrations that cause premature bearing fatigue.</span>
                                    </li>
                                    <li className="flex gap-3 text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0 mt-1" />
                                        <span><strong>Increased Efficiency:</strong> Ensures smooth airflow and optimal compression ratios.</span>
                                    </li>
                                    <li className="flex gap-3 text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0 mt-1" />
                                        <span><strong>Reduced Noise Levels:</strong> Eliminates high-frequency whine associated with rotor imbalance.</span>
                                    </li>
                                </ul>
                            </div>

                            <h3>Our Balancing Process</h3>
                            <p>
                                Leon International utilizes state-of-the-art Schenck vertical and horizontal balancing machines. Our process involves:
                            </p>
                            <ol>
                                <li><strong>Initial Inspection:</strong> Comprehensive NDT and visual check for any blade deformation.</li>
                                <li><strong>Low-Speed Balancing:</strong> Individual component balancing (Compressor wheel, Turbine shaft).</li>
                                <li><strong>Core Assembly Balancing:</strong> High-speed CHRA balancing to simulate operational conditions.</li>
                                <li><strong>Final Certification:</strong> Detailed reporting of residual unbalance levels.</li>
                            </ol>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-gradient-to-br from-primary-900 to-primary-950 border border-white/10 rounded-3xl p-8 sticky top-32">
                                <h3 className="text-xl font-bold text-white mb-6 font-plus-jakarta-sans text-center">Technical Specifications</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <Zap className="h-6 w-6 text-accent-500" />
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-500">Max RPM</p>
                                            <p className="font-semibold">Up to 150,000 RPM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <BarChart3 className="h-6 w-6 text-accent-500" />
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-500">Accuracy</p>
                                            <p className="font-semibold">ISO G1.0 Standard</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <Clock className="h-6 w-6 text-accent-500" />
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-500">Turnaround</p>
                                            <p className="font-semibold">24-48 Hours</p>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/quote/" className="mt-8 w-full block text-center bg-white text-primary-950 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                                    Request Technical Service
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <QuickQuote />
        </main>
    );
}
