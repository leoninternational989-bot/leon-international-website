import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://leon-international.com'),
  title: {
    default: 'Leon International | Marine Engineering, Ship Repair & Spare Parts',
    template: '%s | Leon International'
  },
  description: 'Leading marine engineering company offering ship repair, dry docking, NDT inspection, fabrication, protective coatings, HVAC services & OEM spare parts. global operations headquartered in Pakistan.',
  keywords: ['marine engineering', 'ship repair', 'marine spare parts', 'dry docking', 'NDT inspection', 'marine fabrication', 'protective coatings', 'Karachi ship repair', 'UAE marine services'],
  authors: [{ name: 'Leon International' }],
  creator: 'Leon International',
  publisher: 'Leon International',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leon-international.com',
    siteName: 'Leon International',
    title: 'Leon International | Marine Engineering, Ship Repair & Spare Parts',
    description: 'Leading marine engineering company offering ship repair, dry docking, NDT inspection, fabrication, protective coatings, HVAC services & OEM spare parts worldwide.',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Leon International — Marine Engineering & Ship Repair',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leon International | Marine Engineering & Ship Repair',
    description: 'Ship repair, NDT inspection, fabrication, spare parts supply. Pakistan and worldwide.',
    images: ['/og/default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://leon-international.com',
  },
  verification: {
    google: 'N1aQd723r-b5p-9-MKwGypBt5nHW1tgtUZHXUrTdrJI',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Leon International",
  "url": "https://leon-international.com",
  "logo": "https://leon-international.com/images/logo.png",
  "description": "Marine engineering company specializing in ship repair, NDT inspection, fabrication, protective coatings, HVAC, and marine spare parts supply.",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 100,
    "maxValue": 500
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61586251654169",
    "https://www.linkedin.com/company/112222068/",
    "https://www.instagram.com/leoninternational4/",
    "https://www.reddit.com/user/Comfortable-Pool2720/",
    "https://www.quora.com/profile/Leon-International-1",
    "https://www.youtube.com/@Leon_International",
    "https://pin.it/3nvrmRtCp"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+92-21-32277773",
      "contactType": "sales",
      "areaServed": ["PK", "AE", "CN", "LV", "Worldwide"],
      "availableLanguage": ["English", "Urdu", "Arabic", "Chinese"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot#122-C, Keamari Township",
    "addressLocality": "Karachi",
    "addressRegion": "Sindh",
    "postalCode": "75260",
    "addressCountry": "PK"
  },
  "location": [
    {
      "@type": "Place",
      "name": "Leon International — Pakistan HQ",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Karachi",
        "addressCountry": "PK"
      }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "32"
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Fleat Manager, International Shipping"
    },
    "reviewBody": "Leon International's team completed our main engine overhaul ahead of schedule with unmatched technical expertise."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${dmSans.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <Script
          strategy="afterInteractive"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="DoFZYuNOOxurW3YFTV/XvA"
        />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-0Y2XLDSGBX" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0Y2XLDSGBX');
            `,
          }}
        />
        <JsonLd data={organizationSchema} />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
