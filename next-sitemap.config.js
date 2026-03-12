/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://leon-international.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    trailingSlash: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [
        '/server-sitemap.xml',
        '/admin',
        '/admin/*',
        '/apple-icon.png',
        '/opengraph-image.png',
        '/twitter-image.png',
    ],
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    },
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/*'] },
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'CCBot', allow: '/' },
            { userAgent: 'Bytespider', allow: '/' },
        ],
        additionalSitemaps: [
            'https://leon-international.com/sitemap.xml',
        ],
    },
}
