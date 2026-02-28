import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

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
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-accent-200 transition-colors">
                                <span className="sr-only">WhatsApp</span>
                                <MessageCircle className="h-6 w-6" aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            {/* Column 2 - Quick Links */}
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Quick Links</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {['About Us', 'Services', 'Products', 'Projects', 'Blog', 'Contact Us'].map((item) => (
                                        <li key={item}>
                                            <Link href={`/${item.toLowerCase().replace(' ', '-')}/`} className="text-sm leading-6 hover:text-accent-200 transition-colors">
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
