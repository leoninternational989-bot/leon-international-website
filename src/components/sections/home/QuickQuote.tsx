import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function QuickQuote() {
    return (
        <section className="bg-primary-950 py-16 relative overflow-hidden">
            {/* Decorative background styling */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-primary-900 to-primary-950 mix-blend-multiply opacity-80 pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean/50 to-transparent"></div>
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-accent-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-ocean rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-plus-jakarta-sans">
                            Need Parts or Repair Service?
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-primary-200 font-inter">
                            Get a Free Quote Within 24 Hours. Our operations team is available around the clock.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto">
                        <Link
                            href="/quote/"
                            className="rounded-md bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-500/20 hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 transition-all font-inter hover:-translate-y-1 text-center"
                        >
                            Request a Quote
                        </Link>
                        <a
                            href="https://wa.me/923132277773" // Owner (Ahsin) number
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all font-inter flex items-center justify-center gap-2 hover:-translate-y-1"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp Us Now
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
