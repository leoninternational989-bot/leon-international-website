import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Comprehensive Crane Inspection | Leon International",
  description: "Visual and mechanical inspection of marine hoisting equipment.",
  alternates: {
    canonical: 'https://leon-international.com/crane-inspection/',
  },
};

const mainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Comprehensive Crane Inspection",
  "description": "Visual and mechanical inspection of marine hoisting equipment.",
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
      "name": "What comprehensive crane inspection does Leon International offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leon International provides comprehensive comprehensive crane inspection for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "Does Leon International provide emergency comprehensive crane inspection?",
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
