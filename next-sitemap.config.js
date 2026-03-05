/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://leon-international.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    trailingSlash: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/server-sitemap.xml'],
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
            { userAgent: '*', allow: '/' },
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
