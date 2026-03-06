import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Hatch Cover Ultrasonic Testing | Leon International",
  description: "Verifying cargo hold weather-tightness using advanced ultrasonic tools.",
  alternates: {
    canonical: 'https://leon-international.com/hatch-cover-testing/',
  },
};

const mainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Hatch Cover Ultrasonic Testing",
  "description": "Verifying cargo hold weather-tightness using advanced ultrasonic tools.",
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
      "name": "What hatch cover ultrasonic testing does Leon International offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leon International provides comprehensive hatch cover ultrasonic testing for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "Does Leon International provide emergency hatch cover ultrasonic testing?",
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
