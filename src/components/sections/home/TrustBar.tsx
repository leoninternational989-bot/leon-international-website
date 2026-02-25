import { ShieldCheck, Award, Anchor, Star, Compass, Ship, Shield } from 'lucide-react';

export default function TrustBar() {
    const societies = [
        { name: "Lloyd's Register", icon: ShieldCheck, accent: "text-blue-600", bg: "bg-blue-50" },
        { name: "Bureau Veritas", icon: Award, accent: "text-red-600", bg: "bg-red-50" },
        { name: "DNV", icon: Anchor, accent: "text-sky-600", bg: "bg-sky-50" },
        { name: "ABS", icon: Star, accent: "text-blue-800", bg: "bg-blue-50" },
        { name: "NKK", icon: Compass, accent: "text-teal-600", bg: "bg-teal-50" },
        { name: "CCS", icon: Ship, accent: "text-orange-600", bg: "bg-orange-50" },
        { name: "Germanischer Lloyd", icon: Shield, accent: "text-indigo-600", bg: "bg-indigo-50" },
    ];

    return (
        <section className="bg-white border-y border-gray-100 py-8 overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-center text-sm font-bold text-gray-400 mb-8 uppercase tracking-[0.2em] font-inter">
                    Certified to the Highest Standards by Leading Classification Societies
                </p>

                {/* Scrolling ticker for logos/names */}
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-6 sm:gap-10 group-hover:pause pr-6 sm:pr-10">
                        {societies.map((soc, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white px-5 sm:px-6 py-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-accent-200 transition-all cursor-default">
                                <div className={`p-2.5 rounded-lg ${soc.bg} flex items-center justify-center border border-white/50 shadow-inner`}>
                                    <soc.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${soc.accent}`} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <span className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-wider">CLASS CERTIFIED</span>
                                    <span className="text-primary-950 font-bold text-base sm:text-lg font-plus-jakarta-sans whitespace-nowrap leading-tight">{soc.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-6 sm:gap-10 group-hover:pause pr-6 sm:pr-10">
                        {societies.map((soc, i) => (
                            <div key={`copy-${i}`} className="flex items-center gap-4 bg-white px-5 sm:px-6 py-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-accent-200 transition-all cursor-default">
                                <div className={`p-2.5 rounded-lg ${soc.bg} flex items-center justify-center border border-white/50 shadow-inner`}>
                                    <soc.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${soc.accent}`} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <span className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-wider">CLASS CERTIFIED</span>
                                    <span className="text-primary-950 font-bold text-base sm:text-lg font-plus-jakarta-sans whitespace-nowrap leading-tight">{soc.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
