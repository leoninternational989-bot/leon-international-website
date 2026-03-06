# AI Search Optimization: Implementation Checklist

Follow this checklist for every new service page, blog post, or project added to the Leon International website to ensure maximum visibility in AI search results (ChatGPT, Gemini, Perplexity, Google AI Overviews).

## 1. Contextual Content Creation
- [ ] **Conversational Headlines:** Use "How to...", "What is...", or "The Best way to..." in your headings to match conversational user prompts.
- [ ] **Expert Insights:** Include unique, technical details that only an engineer or specialist would know. AI rewards "information gain" over generic content.
- [ ] **Entity-Rich Descriptions:** Mention specific engine brands (MAN, Wartsila), tools, and industry standards (NDT, ASME) to help AI categorize the page.

## 2. Technical SEO for AI
- [ ] **Raw HTML Compatibility:** Ensure the main content is rendered on the server (Next.js SSR/SSG). Avoid hiding critical text behind "See More" buttons controlled by client-side JS.
- [ ] **Schema Markup:** Every service page should have `Product` or `Service` schema. Every blog post must have `Article` schema with `dateModified`.
- [ ] **Clean Internal Linking:** Link from your core expertise pages to specific sub-services. This creates an "Entity Web" that AI agents can use to understand the service hierarchy.

## 3. Signal Freshness
- [ ] **"Last Updated" Dates:** Always show the date the content was last reviewed. Even minor text tweaks help signal freshness to AI crawlers.
- [ ] **Dynamic Modified Date in JSON-LD:** Ensure the `dateModified` in your schema matches the "Last Updated" date on the page.

## 4. Off-Page Reinforcement (Search Everywhere)
- [ ] **YouTube Sync:** When publishing a major service page, consider a short "Explainer" video on YouTube. Link the video to the page and embed the video on the page.
- [ ] **Social Citations:** Share new content on LinkedIn and Pinterest with relevant technical hashtags.
- [ ] **Community Engagement:** If you solve a specific engineering problem, document it and share a summary on Reddit (r/marineengineering) or Quora.

## 5. Ongoing Audits
- [ ] **Quarterly Review:** Once a quarter, check `robots.txt` and `llms.txt` to ensure they accurately reflect your current services.
- [ ] **Quality Control:** Delete or significantly upgrade any content that hasn't received traffic or impressions in 6 months. High-quality clusters perform better than large quantities of mediocre content in AI engines.
