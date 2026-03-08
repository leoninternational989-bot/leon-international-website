import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, ShieldCheck, Hammer, Construction, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marine Metal Stitching Guide | Leon International',
    description: 'Learn about the cold repair process of metal stitching for cylinder blocks, heads, and massive marine engine castings without generating heat.',
    alternates: {
        canonical: 'https://leon-international.com/support/technical-guides/metal-stitching-guide/',
    },
};

export default function MetalStitchingGuidePage() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Marine Metal Stitching Guide"
                subtitle="The definitive guide to cold casting repairs for cracked engine blocks and cylinder heads."
                breadcrumbs={[
                    { label: 'Support', href: '/support/' },
                    { label: 'Technical Guides', href: '/support/technical-guides/' },
                    { label: 'Metal Stitching Guide', href: '/support/technical-guides/metal-stitching-guide/' }
                ]}
                image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
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
                            <h2 className="text-4xl font-bold text-white mb-8 font-plus-jakarta-sans">Cold Repair Technology</h2>
                            <p>
                                Metal stitching is a world-renowned mechanical cold repair process used to restore cracked or broken castings. Unlike welding, metal stitching introduces no heat stress, preserving the original metallurgical structure of the casting.
                            </p>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 my-12">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <ShieldCheck className="text-accent-500 h-6 w-6" />
                                    Advantages Over Welding
                                </h3>
                                <ul className="space-y-4 m-0 p-0 list-none">
                                    <li className="flex gap-3 text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0 mt-1" />
                                        <span><strong>Zero Heat Distortion:</strong> No structural warping or metallurgical changes to the parent metal.</span>
                                    </li>
                                    <li className="flex gap-3 text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0 mt-1" />
                                        <span><strong>Class Approved:</strong> Permanently accepted by BV, Lloyd's, and DNV for major repairs.</span>
                                    </li>
                                    <li className="flex gap-3 text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0 mt-1" />
                                        <span><strong>Pressure Tight:</strong> Capable of sealing jacket water and high-pressure oil leaks.</span>
                                    </li>
                                </ul>
                            </div>

                            <h3>How Metal Stitching Works</h3>
                            <p>
                                The process involves several key components designed to pull the crack together and restore the casting's structural integrity:
                            </p>
                            <ul>
                                <li><strong>Stitching Studs:</strong> Interlocking threaded studs that create a gas-tight seal across the crack line.</li>
                                <li><strong>Masterlocks:</strong> High-tensile steel keys inserted across the crack to restore the casting's original tensile strength.</li>
                                <li><strong>Precision Drilling:</strong> Our technicians use specialized jigs to ensure exact alignment and load distribution.</li>
                            </ul>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-gradient-to-br from-primary-900 to-primary-950 border border-white/10 rounded-3xl p-8 sticky top-32">
                                <h3 className="text-xl font-bold text-white mb-6 font-plus-jakarta-sans text-center">Service Highlights</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <Hammer className="h-6 w-6 text-accent-500" />
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-500">Method</p>
                                            <p className="font-semibold">Cast Master System</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <Construction className="h-6 w-6 text-accent-500" />
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-500">Material</p>
                                            <p className="font-semibold">Cast Iron, Steel, Aluminum</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <Clock className="h-6 w-6 text-accent-500" />
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-500">Emergency</p>
                                            <p className="font-semibold">24/7 Global Dispatch</p>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/quote/" className="mt-8 w-full block text-center bg-white text-primary-950 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                                    Request Specialist Squad
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
