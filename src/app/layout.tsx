import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

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
  metadataBase: new URL('https://leoninternational.com'),
  title: {
    default: 'Leon International | Marine Engineering, Ship Repair & Spare Parts',
    template: '%s | Leon International'
  },
  description: 'Leading marine engineering company offering ship repair, dry docking, NDT inspection, fabrication, protective coatings, HVAC services & OEM spare parts. Offices in Pakistan, UAE, China & Latvia.',
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
    url: 'https://leoninternational.com',
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
    description: 'Ship repair, NDT inspection, fabrication, spare parts supply. Pakistan, UAE, China, Latvia.',
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
    canonical: 'https://leoninternational.com',
  },
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE_HERE',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Leon International",
  "url": "https://leoninternational.com",
  "logo": "https://leoninternational.com/logo.png",
  "description": "Marine engineering company specializing in ship repair, NDT inspection, fabrication, protective coatings, HVAC, and marine spare parts supply.",
  "foundingDate": "1974",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 100,
    "maxValue": 500
  },
  "sameAs": [
    "https://www.linkedin.com/company/leon-international",
    "https://www.facebook.com/leoninternational"
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
    },
    {
      "@type": "Place",
      "name": "Leon International — UAE Office",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    {
      "@type": "Place",
      "name": "Leon International — China Office",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Shanghai",
        "addressCountry": "CN"
      }
    },
    {
      "@type": "Place",
      "name": "Leon International — Latvia Office",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riga",
        "addressCountry": "LV"
      }
    }
  ]
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
        <JsonLd data={organizationSchema} />
        <Header />
        <main className="flex-grow flex flex-col pt-20 lg:pt-24">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
