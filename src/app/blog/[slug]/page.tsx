import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { initialPosts } from '../postData';
import { Calendar, Clock, User, ArrowLeft, Twitter, Linkedin, Facebook, ChevronRight } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static parameters for build time
export function generateStaticParams() {
    return initialPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata dynamically based on the slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const post = initialPosts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        return { title: 'Post Not Found | Leon International' };
    }

    return {
        title: `${post.title} | Leon International Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const resolvedParams = await params;
    const post = initialPosts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        notFound();
    }

    // Get related posts (just taking 2 different ones for demo purposes)
    const relatedPosts = initialPosts.filter(p => p.slug !== post.slug).slice(0, 2);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "author": { "@type": "Organization", "name": "Leon International" },
        "publisher": {
            "@type": "Organization",
            "name": "Leon International",
            "logo": { "@type": "ImageObject", "url": "https://leon-international.com/images/logo.png" }
        },
        "datePublished": new Date(post.date).toISOString().split('T')[0],
        "dateModified": new Date(post.lastUpdated || post.date).toISOString().split('T')[0],
        "image": `https://leon-international.com${post.image}`,
        "mainEntityOfPage": `https://leon-international.com/blog/${post.slug}/`
    };

    return (
        <main className="bg-primary-950 min-h-screen">
            <JsonLd data={articleSchema} />
            {/* Minimal Back Navigation */}
            <div className="absolute top-28 left-0 right-0 z-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Link
                        href="/blog/"
                        className="inline-flex items-center gap-2 text-white hover:text-accent-400 text-sm font-semibold transition-colors backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Insights
                    </Link>
                </div>
            </div>

            {/* Ultra-Sleek Hero Section */}
            <section className="relative pt-40 pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    {/* Deep gradient overlays for a premium studio look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/90 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col justify-end min-h-[40vh]">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="inline-flex items-center justify-center px-4 py-1.5 bg-accent-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={post.date}>{post.formattedDate}</time>
                                {post.formattedLastUpdated && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-gray-500 mx-1" />
                                        <span className="text-accent-400">Updated: {post.formattedLastUpdated}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 font-plus-jakarta-sans leading-[1.1] tracking-tight drop-shadow-lg">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-light border-l-2 border-accent-500 pl-6">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-12 lg:py-20 relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-ocean/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-16">

                    {/* Left Sidebar - Sticky Share Rail */}
                    <aside className="hidden lg:block w-32 shrink-0">
                        <div className="sticky top-32 flex flex-col gap-6 items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest vertical-text transform -rotate-180 mb-4" style={{ writingMode: 'vertical-rl' }}>
                                Share Article
                            </span>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="flex flex-col gap-4">
                                <button className="w-10 h-10 rounded-full bg-primary-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all">
                                    <Twitter className="h-4 w-4" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-primary-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all">
                                    <Linkedin className="h-4 w-4" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-primary-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all">
                                    <Facebook className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Center Content */}
                    <article className="max-w-3xl flex-1">
                        {/* Author Meta */}
                        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/10">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-600 to-ocean flex items-center justify-center shrink-0">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold">{post.author}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span>Marine Engineering Dept.</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Prose Content */}
                        <div
                            className="prose prose-invert prose-lg md:prose-xl max-w-none 
                                prose-headings:font-plus-jakarta-sans prose-headings:font-bold prose-headings:text-white prose-headings:mt-12 prose-headings:mb-6
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8
                                prose-a:text-accent-400 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-white prose-strong:font-bold
                                prose-ul:text-gray-300 prose-li:marker:text-accent-500
                                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-white/5
                                prose-blockquote:border-l-4 prose-blockquote:border-accent-500 prose-blockquote:bg-primary-900/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-200 prose-blockquote:italic"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Mobile Share (Visible only on small screens) */}
                        <div className="mt-16 lg:hidden flex items-center justify-between border-t border-white/10 pt-8">
                            <span className="text-white font-bold text-lg">Share this article:</span>
                            <div className="flex gap-4">
                                <button className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></button>
                                <button className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></button>
                                <button className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Author / CTA Box */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px] group-hover:bg-accent-500/20 transition-all duration-700" />

                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-800 border-4 border-white/5 flex flex-col items-center justify-center shrink-0 shadow-inner">
                            <span className="text-4xl">⚓</span>
                        </div>

                        <div className="flex-1 text-center md:text-left z-10">
                            <h3 className="text-2xl font-bold text-white mb-3 font-plus-jakarta-sans">Expert Insights from Leon International</h3>
                            <p className="text-gray-400 mb-6 max-w-xl">
                                Our technical team brings decades of combined marine engineering experience. Contact us directly to discuss your vessel's specific requirements.
                            </p>
                            <Link href="/contact/" className="inline-flex items-center gap-2 bg-white text-primary-950 font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
                                Talk to an Expert
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Read Next - Premium Grid Format */}
            <section className="py-20 bg-primary-900/20 border-t border-white/5 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-accent-500 font-bold tracking-widest uppercase text-sm mb-2 block">Keep Exploring</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-white font-plus-jakarta-sans">Related Articles</h3>
                        </div>
                        <Link href="/blog/" className="hidden md:inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            View all posts <ArrowLeft className="h-4 w-4 rotate-180" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {relatedPosts.map((relatedPost) => (
                            <Link
                                key={relatedPost.slug}
                                href={`/blog/${relatedPost.slug}/`}
                                className="group flex flex-col gap-6"
                            >
                                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-white/5">
                                    <Image
                                        src={relatedPost.image}
                                        alt={relatedPost.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-primary-950/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-3">
                                        <span className="text-accent-500 uppercase">{relatedPost.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                        <span>{relatedPost.formattedDate}</span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3 font-plus-jakarta-sans group-hover:text-accent-400 transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h4>
                                    <p className="text-gray-400 line-clamp-2 leading-relaxed">
                                        {relatedPost.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
