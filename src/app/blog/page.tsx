import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import { initialPosts } from './postData';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
    title: 'Marine Insights & News Blog | Leon International',
    description: 'Industry news, technical guides, and expert advice from our marine engineering team at Leon International.',
};

export default function BlogIndexPage() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="Insights & Resources"
                subtitle="Industry news, technical guides, and expert advice from our marine engineering team"
                breadcrumbs={[
                    { label: 'Blog', href: '/blog/' }
                ]}
                bgClass="bg-gradient-to-br from-primary-950 via-gray-900 to-indigo-900"
            />

            <section className="py-24 relative">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ocean/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent-500/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
                    <p className="text-lg leading-8 text-gray-300 font-inter mb-6">
                        Welcome to the Leon International Marine Engineering & Industry Insights Blog. With over five decades of deep-rooted experience in the maritime and industrial sectors, our technical specialists and management team have curated a wealth of knowledge that we are proud to share with our clients and the broader maritime community. Here you will find in-depth technical guides, the latest industry news, maintenance best practices, and expert advice to help you optimize the efficiency and lifespan of your vessels and industrial equipment.
                    </p>
                    <p className="text-lg leading-8 text-gray-300 font-inter">
                        Our articles cover a broad spectrum of critical topics including cutting-edge NDT inspection methodologies, breakthroughs in marine HVAC and refrigeration, complex mechanical and prime-mover engine overhauling, advanced protective coating applications, and Class-approved welding standards. Stay informed with our deep dives into maritime safety, compliance with international marine regulations, and the operational strategies necessary for successful ship repair and global supply chain logistics.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {initialPosts.map((post) => (
                            <article key={post.slug} className="bg-primary-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-accent-500/30 transition-all group flex flex-col h-full">
                                <Link href={`/blog/${post.slug}/`} className="relative h-56 w-full block overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block px-3 py-1 bg-accent-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>
                                </Link>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                        <time dateTime={post.date}>{post.formattedDate}</time>
                                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 font-plus-jakarta-sans line-clamp-2 group-hover:text-accent-400 transition-colors">
                                        <Link href={`/blog/${post.slug}/`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto">
                                        <Link
                                            href={`/blog/${post.slug}/`}
                                            className="inline-flex items-center gap-2 text-accent-500 hover:text-accent-400 text-sm font-bold transition-colors"
                                        >
                                            Read Article
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Blog", url: "/blog/" }
            ]} />
        </main>
    );
}
