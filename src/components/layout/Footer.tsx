import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MessageCircle, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary-950 text-gray-300 mt-auto" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">

                    {/* Column 1 - Company */}
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative h-[83px] w-[183px] flex items-center justify-center">
                                <Image src="/images/logo-transparent.png" alt="Leon International Logo" fill className="object-contain" priority />
                            </div>
                        </Link>
                        <p className="text-sm leading-6 text-gray-300">
                            Your global partner in marine engineering, ship repair, and industrial spare parts supply.
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-4">
                            <a href="https://www.facebook.com/profile.php?id=61586251654169" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://www.instagram.com/leoninternational4/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://www.linkedin.com/company/112222068/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://www.reddit.com/user/Comfortable-Pool2720/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">Reddit</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-2.467 4.19a4.808 4.808 0 0 1-2.904-.976l-.423.424A5.4 5.4 0 0 0 12 16.518a5.4 5.4 0 0 0 3.094-.88l-.424-.424a4.808 4.808 0 0 1-2.904.975z" />
                                </svg>
                            </a>
                            <a href="https://www.quora.com/profile/Leon-International-1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">Quora</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.08 15.65c-1.35.79-3.26.75-4.57-.15-.69-.47-.94-1.29-.68-2.07l2.14-5.91a.48.48 0 0 0-.44-.65h-1a.47.47 0 0 0-.44.33l-2.08 5.76A4.52 4.52 0 0 1 5.25 12c0-3.73 3.03-6.75 6.75-6.75s6.75 3.02 6.75 6.75c0 2.45-1.32 4.6-3.32 5.75l.41.41a.88.88 0 0 1-1.24 1.24l-.52-.52zM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5z" />
                                </svg>
                            </a>
                            <a href="https://wa.me/923132277773" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">WhatsApp</span>
                                <MessageCircle className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://www.youtube.com/@Leon_International" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">YouTube</span>
                                <Youtube className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://pin.it/3nvrmRtCp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">Pinterest</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            {/* Column 2 - Quick Links */}
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Quick Links</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {['About Us', 'Services', 'Products', 'Projects', 'Blog', 'Contact Us', 'Support Hub'].map((item) => (
                                        <li key={item}>
                                            <Link href={item === 'Support Hub' ? '/support/' : `/${item.toLowerCase().replace(' ', '-')}/`} className="text-sm leading-6 hover:text-accent-200 transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 3 - Our Services */}
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Our Services</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {[
                                        { name: 'Ship Repair & Dry Docking', href: '/ship-repair/' },
                                        { name: 'Mechanical Repair', href: '/mechanical-repair/' },
                                        { name: 'Electrical & Electronics', href: '/electrical/' },
                                        { name: 'Fabrication & Welding', href: '/fabrication/' },
                                        { name: 'NDT & Inspection', href: '/ndt-inspection/' },
                                        { name: 'Spare Parts Supply', href: '/products/' },
                                        { name: 'Technical Guides', href: '/support/technical-guides/' },
                                    ].map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 hover:text-accent-200 transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Column 4 - Contact Info */}
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Contact Us</h3>
                                <ul role="list" className="mt-6 space-y-4 text-sm leading-6">
                                    <li className="flex items-start gap-3">
                                        <span className="font-semibold text-white">HQ:</span>
                                        <span>C-102 Block 4 Gulshan-E-Iqbal<br />Karachi, Pakistan</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-semibold text-white">Phone:</span>
                                        <a href="tel:+923132277773" className="hover:text-accent-200 transition-colors">0313 2277773</a>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="font-semibold text-white">Email:</span>
                                        <a href="mailto:info@leon-international.com" className="hover:text-accent-200 transition-colors">info@leon-international.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2 text-sm">
                        <Link href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-conditions/" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    </div>
                    <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
                        &copy; {new Date().getFullYear()} Leon International. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
