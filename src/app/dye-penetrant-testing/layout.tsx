import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Dye Penetrant / Liquid Penetrant Testing | Leon International",
  description: "Non-destructive testing for surface-breaking defects in non-porous materials.",
  alternates: {
    canonical: 'https://leon-international.com/dye-penetrant-testing/',
  },
};

const mainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Dye Penetrant / Liquid Penetrant Testing",
  "description": "Non-destructive testing for surface-breaking defects in non-porous materials.",
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
      "name": "What dye penetrant / liquid penetrant testing does Leon International offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leon International provides comprehensive dye penetrant / liquid penetrant testing for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "Does Leon International provide emergency dye penetrant / liquid penetrant testing?",
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
