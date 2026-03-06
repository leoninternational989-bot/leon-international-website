import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Mechanical Repair & Engine Overhaul | Leon International",
  description: "Comprehensive mechanical repairs including main engine overhauls, boiler repairs, and hydraulic systems.",
  alternates: {
    canonical: 'https://leon-international.com/mechanical-repair/',
  },
};

const mainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mechanical Repair & Engine Overhaul",
  "description": "Comprehensive mechanical repairs including main engine overhauls, boiler repairs, and hydraulic systems.",
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
      "name": "What mechanical repair & engine overhaul does Leon International offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leon International provides comprehensive mechanical repair & engine overhaul for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "Does Leon International provide emergency mechanical repair & engine overhaul?",
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
