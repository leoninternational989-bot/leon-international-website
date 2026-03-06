import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Waukesha Engine Components | Leon International",
  description: "Heavy-duty parts supply for Waukesha industrial and marine applications.",
  alternates: {
    canonical: 'https://leon-international.com/waukesha-parts/',
  },
};

const mainSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Waukesha Engine Components",
  "description": "Heavy-duty parts supply for Waukesha industrial and marine applications.",
  "brand": {
    "@type": "Brand",
    "name": "Leon International"
  },
  "category": "Marine Engine Parts",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "url": "https://leon-international.com/waukesha-parts/"
  }
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What waukesha engine components does Leon International supply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leon International supplies high-quality OEM and aftermarket waukesha engine components for marine engines and industrial applications, serving vessels globally."
      }
    },
    {
      "@type": "Question",
      "name": "Are the waukesha engine components OEM or aftermarket?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We supply both Genuine/OEM parts and high-quality European/Japanese aftermarket equivalents depending on client budgets and requirements."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can you deliver marine spare parts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With stock at key locations and a global logistics network, we ensure rapid dispatch of critical parts to minimize vessel downtime."
      }
    }
  ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={mainSchema} />
      <JsonLd data={faqSchema} />
      {children}
    </>
  );
}
