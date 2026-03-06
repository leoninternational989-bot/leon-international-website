import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Deck Machinery Overhauling | Leon International",
  description: "Complete mechanical services for diverse deck machinery systems.",
  alternates: {
    canonical: 'https://leon-international.com/deck-machinery-overhauling/',
  },
};

const mainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Deck Machinery Overhauling",
  "description": "Complete mechanical services for diverse deck machinery systems.",
  "provider": {
    "@type": "Organization",
    "name": "Leon International",
    "url": "https://leon-international.com"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Pakistan"
    },
    {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    {
      "@type": "Country",
      "name": "China"
    },
    {
      "@type": "Country",
      "name": "Latvia"
    }
  ],
  "serviceType": "Marine Engineering Service"
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What deck machinery overhauling does Leon International offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leon International provides comprehensive deck machinery overhauling for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "Does Leon International provide emergency deck machinery overhauling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer 24/7 rapid response for emergency marine repairs and services."
      }
    },
    {
      "@type": "Question",
      "name": "Are your technicians certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our engineers and technicians are highly experienced and hold necessary class approvals (including BV, LR) for specialized marine engineering tasks."
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
