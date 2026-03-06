# Leon International - AI Search Optimization & Search Everywhere Optimization (SEO) Strategy

This document outlines the modern strategy for optimizing the Leon International website for AI Search Engines (Large Language Models, Generative Engines, and AI Overviews). It is based on the transition from traditional SEO to Search Everywhere Optimization.

## 1. The Core Shift: AI Search Optimization
Traditional SEO focused solely on ranking in 10 blue links on Google. The new reality is **Search Everywhere Optimization**, targeting brand visibility across multiple AI-driven and social platforms:
- **Google Ecosystem:** AI Overviews, AI Mode, Gemini, Local Pack, and Traditional Results.
- **Large Language Models (LLMs):** ChatGPT, Perplexity, Claude, Grok, Meta AI, DeepSeek.
- **Social & Discovery:** YouTube, Reddit, Pinterest, LinkedIn.

## 2. Primary Goals of AI Search Optimization

### Goal 1: Get Your Brand Mentioned (Most Important)
AI platforms use unlinked brand mentions on third-party trusted sites to evaluate brand prominence.
- Build a real brand, not just an exact-match domain.
- When an AI generates a response for "best marine engineering companies," you want Leon International to be generated as an entity.

### Goal 2: Become the Source (Get Cited)
- Get your content cited by AI when generating responses. This is harder to get clicks from but builds authority.
- Being cited relies heavily on freshness and relevance.

## 3. The 80/20 Rule of Signals

### 80% Third-Party Signals (Off-Page)
What others say about you matters more than what you say about yourself to an AI.
- **Editorial Mentions & Listicles:** Get included in industry "best of" lists.
- **Podcasts/Interviews/Video:** LLMs scrape and ingest video transcripts and audio transcripts. Being mentioned in a YouTube video transcript helps AI associate your brand with marine engineering.
- **Review Platforms & Directories:** Maintain a high volume and diversity of reviews on Google Business Profile, vertical-specific marine directories, and B2B platforms.
- **Freshness of Citations:** You must acquire *new* mentions continually. Old citations lose value in AI training sets.
- **Citation Loops:** Cross-promote assets. Don't just link to the website. Link your emails to a YouTube video, your YouTube video to LinkedIn, and your LinkedIn to a blog post, building a massive contextual AI web.

### 20% First-Party Signals (On-Page)
- **100% HTML Rendering:** LLMs crawl raw HTML. Do not rely heavily on client-side JavaScript for your main content. Next.js App Router (used in this project) is excellent since it Server-Side Renders (SSR) HTML.
- **Circle of Competence:** Only write content you have absolute expertise in. Venturing outside your core marine/engineering niche will confuse the algorithm's understanding of your entity.
- **`llms.txt` File:** A new standard to provide AI web crawlers a clean summary of what your business does.
- **Comprehensive Schema Markup:** Granular, nested JSON-LD schema (LocalBusiness, Organization, Product, Article, Breadcrumb) helps LLMs parse entities directly.
- **Quarterly Content Audits:** Every 3 months, delete, consolidate, redirect, or upgrade underperforming content to maintain absolute site freshness.

## 4. Implementation Checklist for Leon International

- [x] **Technical Foundation (Next.js):** Website is using SSR/SSG, delivering clean HTML for LLMs to crawl.
- [x] **Social & Brand Awareness:** Integrated YouTube, Pinterest, LinkedIn, Facebook, Instagram, Reddit, and Quora to the website's footprint.
- [x] **Content Freshness:** Added `dateModified` / `lastUpdated` timestamps dynamically via Schema markup previously.
- [x] **`llms.txt`:** Added `public/llms.txt` to help AI agents contextualize the site.
- [x] **Schema Optimization:** Ensuring all major service/product pages use strong structured data.

## 5. Future Actions (For Project Maintainers)
1. **Focus heavily on YouTube** and post technical videos/case studies. AI parses these transcripts.
2. **Gain inclusions on third-party marine portals** or B2B platforms.
3. **Audit Content Quarterly**: If a service page or blog post gets 0 impressions, rewrite it completely or delete/redirect it to keep the overall site quality score exceptionally high.
