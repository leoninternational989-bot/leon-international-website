# LEON INTERNATIONAL — Complete Website Blueprint & Page-by-Page Content

> **Purpose:** This is the master reference file for building the Leon International website. It contains the complete sitemap, page-by-page content (ready to paste), design direction, and development instructions. Feed this to Claude Code, Gemini, or any AI coding assistant to build the entire site.

> **Tech Stack:** Next.js 14+ (App Router) + Tailwind CSS + TypeScript + Framer Motion

---

## TABLE OF CONTENTS

1. [Competitor & Inspiration Websites](#1-competitor--inspiration-websites)
2. [Brand Identity & Design System](#2-brand-identity--design-system)
3. [Complete Sitemap](#3-complete-sitemap)
4. [Page 1: Homepage](#page-1-homepage)
5. [Page 2: About Us](#page-2-about-us)
6. [Page 3: Services Overview](#page-3-services-overview)
7. [Page 4-11: Individual Service Pages](#pages-4-11-individual-service-pages)
8. [Page 12: Products Overview](#page-12-products-overview)
9. [Page 13-27: Individual Product Pages](#pages-13-27-individual-product-pages)
10. [Page 28: Projects / Portfolio](#page-28-projects--portfolio)
11. [Page 29: Contact Us](#page-29-contact-us)
12. [Page 30: Request a Quote](#page-30-request-a-quote)
13. [Page 31: Blog](#page-31-blog)
14. [Global Components](#global-components)
15. [SEO Configuration](#seo-configuration)

---

## 1. COMPETITOR & INSPIRATION WEBSITES

### LOCAL COMPETITORS (Pakistan — Karachi)

Study these websites to understand what your direct market competition looks like. Leon International needs to be significantly better than ALL of these.

| # | Company | Website | What They Do | Notes |
|---|---------|---------|-------------|-------|
| 1 | Al Meena Marine Engineers | https://almeenamarine.com | Ship repair, marine workshop, spare parts, NDT testing (50+ years, Lloyd's & BV certified) | Good service range but average design, some content errors |
| 2 | Dynamic Engineering | https://www.dynamiceng.com.pk | Ship repair, spare parts at Karachi Port (since 1978, served COSCO 29 years) | Very outdated single-page site, not mobile responsive |
| 3 | HSCO Pro | https://hscopro.com | Marine engine parts, 9+ brands, offices in Pakistan/China/Latvia | Product-focused but repetitive homepage, basic design |
| 4 | Ikhlaq Marine Spares | https://ikhlaqmarinespares.com | Marine spare parts from ship demolition yards, power plants | Minimal content, basic Elementor design |
| 5 | Navron Ltd | https://navron-ltd.com | OEM parts for Pakistan Navy, PMSA, Karachi Shipyard, KPT | Government/military focused supplier |
| 6 | OHM Enterprises | https://ohmshipchandler.com | Ship chandlering & marine supplies in Karachi | Clean layout but limited service scope |
| 7 | HM Enterprises | https://hmenterprises.pk | Ship chandlering, provisions, safety gear, technical equipment | Good content structure, basic design |
| 8 | JMP Marine | Listed on ShipServ | Marine diesel engine parts, turbocharger, compressor, separator, pump, deck machinery | Specialist spare parts supplier |

### INTERNATIONAL COMPETITORS (Global)

These are your global competitors. Study their websites to understand world-class standards.

| # | Company | Website | What They Do | Why Study This |
|---|---------|---------|-------------|----------------|
| 1 | Wärtsilä | https://www.wartsila.com/marine/services | Global marine technology leader — engines, spare parts, services, 70+ countries | **BEST UI in the industry.** Clean, professional, excellent service pages, great UX. Study their navigation, service page layout, and content structure |
| 2 | Ocean & Brine | https://www.oceanandbrine.com | Marine spare parts & OEM supplier, global delivery | Modern, clean website design. Good product presentation |
| 3 | Marine Spares | https://marinespares.com | EVAC spare parts, marine pipes, valves, pumps — global | Clean product-card layout, good brand showcase |
| 4 | All Marine Spares International | https://allmarinespares.com | Machinery & spare parts, 20+ manufacturers, USA based | Good manufacturer showcase and service categorization |
| 5 | GIMSCO | https://gimsco.net | Gulf International Marine Services — spare parts, ship supplies | Modern design, good service pages with quality assurance section |
| 6 | Marine Parts Source | https://marinepartssource.com | Boat parts & accessories with e-commerce | Excellent product search and brand-based navigation |
| 7 | Wholesale Marine | https://www.wholesalemarine.com | Boat parts, supplies & accessories e-commerce | **Best e-commerce marine UX.** Great product filters, brand navigation |
| 8 | MarineSpareParts.com | https://www.marinespareparts.com | 50,000+ spare parts online, brand-based search | Excellent brand-based product search system |
| 9 | RECMAR | https://recmarineparts.com | Marine engine spare parts — international distributor (Spain) | Clean international brand, good product layout |
| 10 | Records Marine | https://recordsmarine.com | Marine spare parts supplier directory — verified vendors | Great trust-building structure and vendor verification approach |

### BEST UI / DESIGN INSPIRATION WEBSITES

These are NOT competitors but websites with excellent design that you should reference for visual inspiration.

| # | Website | Why It's Great for Inspiration |
|---|---------|-------------------------------|
| 1 | https://www.wartsila.com | **#1 Reference.** World-class marine services website. Clean navigation, mega menus, beautiful service pages, hero videos, trust bars, global map |
| 2 | https://www.cat.com | Caterpillar — Industrial/equipment company. Dark hero sections, product grids, brand authority feel |
| 3 | https://www.man-es.com | MAN Energy Solutions — Marine engines. Premium industrial design, tech-forward aesthetic |
| 4 | https://www.rolls-royce.com/products-and-services/marine.aspx | Rolls-Royce Marine — Premium marine engineering. Elegant, minimal, authoritative |
| 5 | https://www.kongsberg.com/maritime/ | Kongsberg Maritime — Norwegian marine tech. Excellent use of hero imagery, clean grids, strong CTAs |
| 6 | https://www.oceanandbrine.com | Modern marine spare parts. Clean cards, good product presentation, strong trust signals |
| 7 | https://www.boatoutfitters.com | Great product categorization, clean filters, excellent UX for hardware/parts |
| 8 | https://spep.com | Sierra Pacific Engineering — Marine hardware. Clean industrial design, good product catalog |
| 9 | https://whitewatermh.com | White Water Marine Hardware — Clean, professional, great product showcase |
| 10 | https://www.shipserv.com | ShipServ platform — Marine supplier directory. Great search UX, supplier profiles, trust signals |

---

## 2. BRAND IDENTITY & DESIGN SYSTEM

### Color Palette (Tailwind Config)

```javascript
// tailwind.config.ts
colors: {
  primary: {
    50: '#EBF5FB',
    100: '#D6EAF8',
    200: '#AED6F1',
    300: '#85C1E9',
    400: '#5DADE2',
    500: '#2E86C1',
    600: '#2471A3',
    700: '#1A5276',
    800: '#154360',
    900: '#0E2F44',
    950: '#071A26',
  },
  accent: {
    50: '#FEF5E7',
    100: '#FDEBD0',
    200: '#FAD7A0',
    300: '#F8C471',
    400: '#F5B041',
    500: '#E67E22',
    600: '#CA6F1E',
    700: '#AF601A',
    800: '#935116',
    900: '#784212',
  },
  navy: '#0E2F44',
  ocean: '#2E86C1',
  steel: '#5D6D7E',
  lightgray: '#F8F9FA',
}
```

### Typography
- **Headings:** Inter or Plus Jakarta Sans (bold, clean, modern)
- **Body:** Inter (excellent readability)
- **Accent/Numbers:** DM Sans or Outfit (for stats, counters)

### Design Principles
- Dark navy headers/heroes with white text for authority
- White/light gray content sections for readability
- Accent orange ONLY for CTAs and important highlights
- Professional photography — avoid generic stock. Use actual ship/workshop/engine imagery
- Subtle scroll animations (Framer Motion fade-up on sections)
- Mobile-first responsive design
- Mega menu navigation for Services and Products

---

## 3. COMPLETE SITEMAP

```
/                              → Homepage
/about/                        → About Us
/services/                     → Services Overview
/ship-repair/                  → Ship Repair & Dry Docking
/mechanical-repair/            → Mechanical Repair & Engineering
/electrical/                   → Electrical & Electronics
/fabrication/                  → Fabrication & Welding
/ndt-inspection/               → Testing, Inspection & Calibration (NDT)
/protective-coatings/          → Protective Coatings & Surface Treatment
/hvac/                         → HVAC & Refrigeration
/specialized/                  → Specialized Services
/products/                     → Products Overview
/engine-parts/                 → Engine Parts (Main Hub)
/mtu-parts/                    → MTU Parts
/man-parts/                    → MAN B&W Parts
/cummins-parts/                → Cummins Parts
/caterpillar-parts/            → Caterpillar Parts
/volvo-penta-parts/            → Volvo Penta Parts
/deutz-parts/                  → DEUTZ Parts
/perkins-parts/                → Perkins Parts
/mwm-parts/                    → MWM Parts
/waukesha-parts/               → Waukesha Parts
/main-engine-spares/           → Main Engine Spare Parts
/auxiliary-engines/            → Auxiliary Engine Components
/diesel-generators/            → Diesel Generators
/turbocharger-spares/          → Turbocharger Spares
/air-compressors/              → Air Compressor & Spares
/navigation-systems/           → Navigation Systems
/electrical-equipment/         → Electrical Equipment
/hydraulic-equipment/          → Hydraulic Equipment & Hoses
/petroleum-equipment/          → Petroleum Equipment
/explosion-proof/              → Explosion-Proof Equipment
/propulsion-systems/           → Propulsion Systems
/deck-machinery/               → Deck Machinery & Equipment
/purifiers/                    → Purifiers / Oil Separators
/power-plant/                  → Power Plant Equipment
/projects/                     → Projects / Portfolio Gallery
/blog/                         → Blog / Resources
/blog/[slug]/                  → Individual Blog Post
/contact/                      → Contact Us
/quote/                        → Request a Quote
```

> **URL RULES:** All URLs are flat (no nesting like `/services/ship-repair/` or `/products/engine-parts/`). Every URL has a trailing slash. This is better for SEO and cleaner navigation. Configure `trailingSlash: true` in `next.config.js`.

---

## PAGE 1: HOMEPAGE

**Route:** `/`
**File:** `src/app/page.tsx`

### Section 1: Hero Banner

Full-width hero with auto-rotating carousel (3 slides) or background video with overlay.

**Slide 1:**
- Heading: "Your Global Partner in Marine Engineering & Spare Parts"
- Subheading: "Serving 7 Oceans from 4 Countries — Pakistan | UAE | China | Latvia"
- CTA Primary: "Request a Quote" → links to /quote/
- CTA Secondary: "Explore Our Services" → links to /services/

**Slide 2:**
- Heading: "50+ Years of Marine Technical Excellence"
- Subheading: "Certified by Lloyd's Register, Bureau Veritas, DNV, ABS & Leading Classification Societies"
- CTA Primary: "View Our Certifications" → links to /about/#certifications
- CTA Secondary: "Our Projects" → links to /projects/

**Slide 3:**
- Heading: "Complete Ship Repair & Spare Parts Under One Roof"
- Subheading: "From Engine Overhauling to Navigation Systems — 20+ Engine Brands Covered"
- CTA Primary: "Browse Products" → links to /products/
- CTA Secondary: "Contact Us" → links to /contact/

**Design:** Dark overlay on high-quality ship/port/workshop imagery. White text. Navy blue primary buttons, accent orange secondary buttons.

---

### Section 2: Trust Bar / Certification Strip

Slim horizontal bar immediately below hero. Gray or light background.

Show logos of: Lloyd's Register, Bureau Veritas, DNV, ABS, NKK, CCS, Germanischer Lloyd, Hellenic Register, ISO 9001:2008

Add small text: "Certified by the World's Leading Classification Societies"

---

### Section 3: About Snapshot

**Layout:** Two columns — Image left (40%), Text right (60%)

**Content:**

Leon International is a premier marine engineering and industrial hardware company with roots stretching back over five decades. Operating from strategic locations across Pakistan, the UAE, China, and Latvia, we deliver comprehensive ship repair services, marine spare parts, and industrial equipment to clients spanning every major ocean route.

Our team of certified marine engineers, skilled fabricators, and sourcing specialists works around the clock to keep your vessels operational, your equipment performing at peak efficiency, and your projects delivered on time and within budget. We hold certifications from Lloyd's Register, Bureau Veritas, DNV, ABS, and other leading classification societies — your assurance that every job meets the highest international standards.

**Stats Row (4 counters):**
- 50+ → Years of Experience
- 4 → Countries of Operation
- 500+ → Projects Completed
- 24/7 → Round-the-Clock Service

**CTA:** "Learn More About Us" → /about/

---

### Section 4: Core Services Grid

**Layout:** 4-column grid (responsive: 2-col on tablet, 1-col on mobile)
**Card Style:** Icon + Title + 2-line description + Arrow link

**Card 1 — Ship Repair & Dry Docking**
Icon: Ship/Anchor
Description: Complete dry docking, ship lift transfer systems, and afloat repair facilities at Karachi Port and Port Bin Qasim.
Link: /ship-repair/

**Card 2 — Engine Overhauling & Mechanical Repair**
Icon: Engine/Gear
Description: Main engine, generator, pump, and boiler overhauling with full reconditioning capabilities for all major engine brands.
Link: /mechanical-repair/

**Card 3 — Electrical & Electronics**
Icon: Lightning bolt
Description: Industrial motor rewinding, PCB card repair, transformer rewinding, and complete marine electrical system servicing.
Link: /electrical/

**Card 4 — Fabrication & Welding**
Icon: Welding torch
Description: Steel structure fabrication, hull repair, pipe works, and all types of welding by BV-approved certified welders.
Link: /fabrication/

**Card 5 — NDT & Inspection**
Icon: Magnifying glass
Description: Ultrasonic thickness gauging, flaw detection, magnetic particle inspection, dye penetrant testing, and crane load testing.
Link: /ndt-inspection/

**Card 6 — Spare Parts Supply**
Icon: Box/Package
Description: New, reconditioned, and used spare parts for 20+ engine brands with worldwide delivery from our global sourcing network.
Link: /products/

**Card 7 — HVAC & Refrigeration**
Icon: Snowflake/AC
Description: Air conditioning plant repair, compressor overhauling, cold storage system maintenance, and Freon gas servicing.
Link: /hvac/

**Card 8 — Protective Coatings**
Icon: Shield/Spray
Description: Industrial protective coatings, Belzona applications, sandblasting, grit blasting, and metal stitching services.
Link: /protective-coatings/

**Section CTA:** "View All Services" → /services/

---

### Section 5: Products Showcase

**Layout:** Horizontal scrolling carousel or tabbed interface

**Heading:** "Marine & Industrial Products"
**Subheading:** "From engine components to navigation systems — sourced globally, delivered worldwide"

Show 6-8 product category cards with images:
- Engine Parts (show engine components image)
- Diesel Generators (show generator set image)
- Turbocharger Spares (show turbocharger image)
- Navigation Systems (show radar/navigation equipment)
- Electrical Equipment (show motors/switchboards)
- Propulsion Systems (show propeller/gearbox)
- Deck Machinery (show windlass/crane)
- Hydraulic Equipment (show hydraulic pumps)

Each card: Image + Category name + "Explore" link

**CTA:** "Browse All Products" → /products/

---

### Section 6: Engine Brands We Cover

**Layout:** Logo grid (4-5 logos per row, auto-scroll carousel on mobile)

**Heading:** "Trusted Parts for 20+ Engine Manufacturers"
**Subheading:** "Whatever powers your vessel, we have the parts to keep it running"

**Brand Logos to Display:**
MAN B&W, Wärtsilä, Cummins, Caterpillar (CAT), MTU, Volvo Penta, Yanmar, Daihatsu, DEUTZ, Perkins, Hyundai HiMSEN, MWM, Waukesha, Bergen, MAK, Scania, John Deere, Mitsubishi, Hanshin Diesel, Stork, Lombardini, Sulzer

---

### Section 7: Why Choose Leon International

**Layout:** 2-column alternating (image + content blocks) or feature cards

**Heading:** "Why Shipowners & Operators Trust Leon International"

**Feature 1 — Global Reach, Local Expertise**
Operating from Pakistan, UAE, China, and Latvia, we combine international sourcing capabilities with deep local knowledge of the Karachi Port and Port Bin Qasim ecosystem. Whether your vessel is docked locally or anchored overseas, we deliver.

**Feature 2 — Certified Excellence**
Our work is backed by certifications from Lloyd's Register, Bureau Veritas, DNV, ABS, and other leading classification societies. Every repair, every inspection, and every part meets internationally recognized standards.

**Feature 3 — Direct Sourcing Advantage**
By sourcing directly from ship demolition yards and maintaining relationships with manufacturers across three continents, we eliminate middlemen and pass the savings to you — without compromising on quality.

**Feature 4 — Complete Inventory: New, Reconditioned & Used**
We offer three tiers of parts availability. Need a brand-new OEM component? We have it. Looking for a quality reconditioned alternative at half the cost? We have that too. Every part undergoes rigorous quality checks before dispatch.

**Feature 5 — 24/7 Emergency Response**
Marine emergencies don't follow business hours. Our operations team is available around the clock, ready to board vessels, conduct inspections, and begin repair work whenever you need us — Karachi anchorage, Bin Qasim, or beyond.

**Feature 6 — Custom Fabrication of Obsolete Parts**
Can't find a discontinued part anywhere? Our fabrication team can manufacture obsolete or hard-to-find components to exact specifications, getting your equipment back online when others can't help.

---

### Section 8: Featured Projects Gallery

**Layout:** 3-column masonry grid (6 items)

**Heading:** "Our Work Speaks for Itself"
**Subheading:** "A glimpse of recent projects across ship repair, fabrication, and engine overhauling"

Show 6 project thumbnails with overlay text:
1. Buoys Fabrication — Steel structure fabrication
2. Generator Overhauling — Daihatsu DK20 complete overhaul
3. Loading Arms Repairing — Port facility maintenance
4. Fender Repair Work — Marine fender restoration
5. Weighbridge Repair — Industrial infrastructure
6. Main Engine Overhaul — Complete reconditioning

**CTA:** "View All Projects" → /projects/

---

### Section 9: Client Logos & Testimonials

**Layout:** Auto-scrolling logo carousel + 2-3 testimonial cards below

**Heading:** "Trusted by Leading Shipping Companies Worldwide"

**Client Logos (from Dynamic Engineering's extensive list):**
COSCO, CMA CGM, Apollonia Lines, Argosy Shipmanagement, Ethiopian Shipping Lines, STX Pan Ocean, Green Ocean Ship Management, Oasis Maritime, Phoenix Reederei, Swiss Marine Inc, and more.

**Testimonial Cards:**

*Testimonial 1:*
"Leon International's team completed our main engine overhaul ahead of schedule, allowing us to resume operations without any delay. Their technical expertise and commitment to quality is unmatched in the region."
— Fleet Manager, International Shipping Company

*Testimonial 2:*
"We've relied on their spare parts supply for over a decade. Whether it's an urgent turbocharger component or a routine maintenance kit, they always deliver on time with proper documentation."
— Technical Superintendent, Bulk Carrier Fleet

*Testimonial 3:*
"Their ability to fabricate custom parts for our aging vessel saved us from a costly and time-consuming international procurement process. Highly recommended."
— Chief Engineer, Container Vessel

---

### Section 10: Global Presence Map

**Layout:** Full-width section with world map or stylized map graphic

**Heading:** "Strategically Positioned Across 4 Countries"

**Office Pins:**

📍 **Pakistan (Headquarters)**
Plot#122-C, Keamari Township, Keamari, Karachi-75260
Phone: +92-21-32850282
Email: info@leoninternational.com

📍 **UAE Office**
Office No: CWS-1V-223879, 26th Floor, Amber Gem Tower, Sheikh Khalifa Street, Ajman, UAE

📍 **China Office**
No. 29-4, Xinhuaqiang District, Shiyan City, Hubei, China

📍 **Latvia Office**
Annas Brigaderes iela 4-47, LV-1082, Rīga, Latvia

---

### Section 11: Quick Quote CTA Strip

**Layout:** Full-width dark navy background section

**Heading:** "Need Parts or Repair Service?"
**Subheading:** "Get a Free Quote Within 24 Hours"

**Inline Form Fields:** Name, Email, Phone, Service Type (dropdown), Brief Message
**Submit Button:** "Request Quote" (accent orange)

**OR:** Two large buttons side by side:
- "Request a Quote" → /quote/
- "WhatsApp Us Now" → wa.me link

---

### Section 12: Footer

Multi-column footer with dark navy background.

**Column 1 — Company:**
Leon International logo
Brief 2-line tagline: "Your global partner in marine engineering, ship repair, and industrial spare parts supply."
Social media icons: Facebook, LinkedIn, Instagram, WhatsApp

**Column 2 — Quick Links:**
- About Us
- Services
- Products
- Projects
- Blog
- Contact Us

**Column 3 — Our Services:**
- Ship Repair & Dry Docking
- Mechanical Repair
- Electrical & Electronics
- Fabrication & Welding
- NDT & Inspection
- Spare Parts Supply

**Column 4 — Contact Info:**
- Karachi HQ address & phone
- Email: info@leoninternational.com
- 24/7 Operations: ops@leoninternational.com

**Bottom Bar:** © 2026 Leon International. All Rights Reserved. | Privacy Policy | Terms of Service

---

## PAGE 2: ABOUT US

**Route:** `/about/`
**File:** `src/app/about/page.tsx`

### Hero Section
- Background: Workshop/team photo with dark overlay
- Heading: "About Leon International"
- Subheading: "Five Decades of Marine Engineering Excellence Under One Roof"

### Our Story

Leon International was born from the convergence of decades of marine engineering expertise, global sourcing networks, and an unwavering commitment to quality. Our roots trace back to 1974, when our founding operations began serving the growing maritime needs of Karachi Port — one of the busiest ports along the Arabian Sea trade routes.

Over the years, we have grown from a local ship repair workshop into a multi-national marine engineering powerhouse with operations spanning Pakistan, the United Arab Emirates, China, and Latvia. Today, Leon International stands as one of the most comprehensive marine and industrial service providers in the region, offering everything from engine overhauling and steel fabrication to global spare parts procurement and advanced non-destructive testing.

What sets us apart is not just the breadth of our capabilities, but the depth of our expertise. Our team includes certified marine engineers, Bureau Veritas-approved welders, experienced electrical technicians, and sourcing specialists who maintain direct relationships with manufacturers and ship recycling yards across three continents. This combination allows us to deliver solutions that are not only technically superior but also cost-effective and time-efficient.

### Our Mission

To deliver expedited, reliable, and high-quality marine engineering services and spare parts that keep vessels operational and industries productive. We serve our clients with an unsurpassed level of commitment, guided by our adherence to international standards and high moral values.

### Our Vision

To be the most trusted and comprehensive marine engineering and industrial hardware provider across the Indian Ocean, Middle East, and beyond — recognized for our technical excellence, global reach, and customer-first approach.

### Our Values

**Reliability:** When your vessel is down, every hour counts. We respond fast, work efficiently, and deliver on our commitments.

**Quality:** From the parts we source to the welds we lay, every output meets internationally recognized standards. We hold certifications from Lloyd's Register, Bureau Veritas, DNV, ABS, and more.

**Integrity:** We provide honest assessments, transparent pricing, and never cut corners. Our reputation is built on trust earned over five decades of service.

**Innovation:** We continuously invest in modern testing equipment, advanced coating technologies, and efficient procurement systems to stay ahead of evolving industry demands.

### Global Presence

**Pakistan Headquarters — Karachi**
Our main operations hub is located in Keamari, strategically positioned near Karachi Port and Port Bin Qasim. This facility houses our marine workshop, fabrication yard, motor rewinding center, and spare parts warehouse. With government licensing and Karachi Port Trust authorization, our teams can board vessels, conduct on-site inspections, and carry out repairs both alongside and at anchorage, 24 hours a day, 7 days a week.

**UAE Office — Ajman**
Our Middle East presence enables us to serve vessels transiting through the Persian Gulf and the broader GCC region. The Ajman office handles sales, marketing, and coordination for clients in the UAE, Saudi Arabia, Oman, and neighboring maritime hubs.

**China Office — Shiyan City, Hubei**
Our China office provides direct access to one of the world's largest manufacturing ecosystems. From here, we source engine components, electrical equipment, and industrial hardware directly from manufacturers, ensuring competitive pricing and shorter lead times for our global clients.

**Latvia Office — Riga**
Our European presence in Riga serves as the gateway to the European and Baltic maritime markets. This office supports procurement, logistics coordination, and customer relationships across Northern and Western Europe.

### Certifications & Accreditations

Leon International maintains certifications and approvals from the following internationally recognized classification societies and standards bodies:

- **Lloyd's Register (LR)** — Approved for marine repair and testing services
- **Bureau Veritas (BV)** — Certified welders, approved ultrasonic thickness gauging, marine repair approval
- **Det Norske Veritas (DNV)** — Recognized service provider
- **American Bureau of Shipping (ABS)** — Certified repair facility
- **Nippon Kaiji Kyokai (NKK/ClassNK)** — Recognized
- **China Classification Society (CCS)** — Recognized
- **Germanischer Lloyd (GL)** — Recognized
- **Hellenic Register of Shipping** — Recognized
- **ISO 9001:2008** — Quality Management System certified

### Our Clients

Over the past five decades, we have proudly served hundreds of shipping companies, industrial operators, and maritime organizations from around the world. Our client roster includes:

COSCO (China Ocean Shipping Company — 29+ year relationship), CMA CGM, Apollonia Lines S.A., Argosy Shipmanagement, Clipper Fleet Management (Denmark), Ethiopian Shipping Lines, STX Pan Ocean (South Korea), Green Ocean Ship Management, Oasis Maritime (Dubai), Phoenix Reederei (Germany), Swiss Marine Inc, Al Jaber Shipping (UAE), Eurocarriers S.A. (Athens), Falcon Shipping (Vietnam), First Marine Service (Tokyo), Jin Yang Shipping (Seoul), and many more across Greece, Turkey, Norway, UK, Romania, Hong Kong, Indonesia, Singapore, and beyond.

### Quality Management

We are committed to:
- Providing excellent ship repair and maintenance services to achieve complete customer satisfaction
- Fulfilling all requirements of customers, statutory and regulatory bodies, and the ISO 9001:2008 Quality Management System
- Providing ongoing training to employees and ensuring necessary equipment and resources are available
- Ensuring continual improvement in the effectiveness of our Quality Management System

---

## PAGE 3: SERVICES OVERVIEW

**Route:** `/services/`
**File:** `src/app/services/page.tsx`

### Hero Section
- Heading: "Our Services"
- Subheading: "Comprehensive Marine Engineering & Industrial Solutions — From Dry Docking to Precision Testing"

### Intro Paragraph

Leon International offers an end-to-end range of marine engineering and industrial services designed to keep your vessels operational, your equipment performing at peak efficiency, and your projects delivered to the highest international standards. Our services span the entire lifecycle of marine and industrial assets — from major ship repairs and engine overhauling to precision testing, surface treatment, and emergency response.

Every service is backed by our certifications from Lloyd's Register, Bureau Veritas, DNV, ABS, and other leading classification societies. Our team of experienced engineers and technicians is available around the clock, ready to deploy at Karachi Port, Port Bin Qasim, outer anchorage, or any location your operations require.

### Service Cards Grid (8 cards linking to individual pages)

*(Use the same 8 cards as the homepage Section 4, but larger with more description text)*

---

## PAGES 4-11: INDIVIDUAL SERVICE PAGES

Each service page follows this template structure:

```
Hero Banner (service-specific image + title + breadcrumb)
Overview (2-3 paragraphs)
What We Offer (detailed bullet list of capabilities)
Equipment & Technology (what tools/machines we use)
Certifications & Standards (applicable class approvals)
Project Gallery (4-6 related photos)
Related Services (sidebar or bottom section)
CTA: "Request a Quote for This Service"
```

### PAGE 4: Ship Repair & Dry Docking (`/ship-repair/`)

**Heading:** "Ship Repair & Dry Docking Services"

**Overview:**
Leon International provides comprehensive ship repair and dry docking services at Karachi Port and Port Bin Qasim — two of the busiest maritime hubs along the Arabian Sea trade corridor. With full government licensing, Karachi Port Trust authorization, and approvals from leading classification societies, our teams are equipped to handle everything from routine maintenance to major structural repairs.

Whether your vessel requires alongside repairs, dry docking with ship lift transfer systems, or emergency work at outer anchorage, our round-the-clock operations team is ready to respond. We maintain the capability to board vessels at Karachi anchorage or Bin Qasim anchorage, conduct thorough inspections, and begin repair work without delay — keeping your vessel's schedule intact and minimizing costly downtime.

Our ship repair services are class-approved and executed under the supervision of qualified surveyors from Lloyd's Register, Bureau Veritas, DNV, ABS, NKK, CCS, and other recognized classification societies. We maintain the highest standards of safety, workmanship, and documentation throughout every project.

**What We Offer:**
- Dry Docking & Ship Lift Transfer System (SLTS) Services
- Major Ship Repair Facilities (afloat and alongside)
- Vessel Repair on Outer Anchorage (Karachi and Bin Qasim)
- Hull Repair, Steel Renewal, and Structural Modifications
- Deck Plate Renewal, Double Bottom Tank Repair
- Fore Peak Tank and Ballast Tank Repairs
- Chipping, Cleaning, and Painting Services
- Fender Repair and Replacement
- Anchor Chain Inspection and Repair
- Fair Leads and Roller Repair
- Loading Arms Repair and Maintenance
- Weighbridge Repair and Calibration
- Emergency Ship Repair and Quick-Response Services

**Standards We Follow:**
Lloyd's Register, Bureau Veritas, DNV, ABS, NKK, CCS, Germanischer Lloyd, Hellenic Register

---

### PAGE 5: Mechanical Repair & Engineering (`/mechanical-repair/`)

**Heading:** "Mechanical Repair & Engineering Services"

**Overview:**
Keeping your vessel's mechanical systems in optimal condition is essential for safe and efficient operations. Leon International offers a comprehensive range of mechanical repair and reconditioning services, covering everything from main engine overhauling to the precision reconditioning of individual components. Our workshops and on-board repair teams are equipped to handle machinery of any size, make, or horsepower.

Our mechanical expertise spans the full spectrum of marine and industrial equipment. Whether you need a complete main engine overhaul, emergency generator repair, or the reconditioning of worn pump impellers, our team delivers results that meet or exceed original equipment manufacturer specifications. Every repair is documented, tested, and certified to satisfy class survey requirements.

With a fully equipped workshop in Karachi and a mobile team capable of on-board repairs at port or anchorage, we provide flexibility to match your operational schedule. Our 24/7 availability means we can respond to breakdowns and emergencies as quickly as they arise.

**What We Offer:**
- Main Engine Repair & Complete Overhauling (any horsepower)
- Auxiliary Engine Repair & Servicing
- Generator Repair & Overhauling
- Overhauling of Pumps, Air Compressors, Heat Exchangers, and Purifiers
- Engine Room Auxiliaries Repair
- Major Repair of Main & Auxiliary Boilers
- Boiler Annual Inspection Service
- Overhauling & Repairing Hydraulic Pumps
- Hydraulic / Pneumatic System Repair & Complete Overhauling
- Repair of Hydraulic Cranes, Systems, and Equipment
- Windlass Major Repair & Servicing
- Winch & Deck Machinery Overhauling
- Repair of All Types of Condensers
- Renewal of Exhaust Gas Receiver Expansion Bellows
- Engine Room Blower Repair
- Air Condition Plant Repair & Compressor Overhauling
- Cold Storage Compressor Repair & System Cleaning
- Reconditioning of Cylinder Heads, Pump Impellers, Casings, and Shafts
- Exhaust Valve Bodies, Spindles & Seats Reconditioning
- Main Engine High-Pressure Pipes Reconditioning
- Pneumatic and Hydraulic Tools Repair
- Alternator Engine Heads and Spindles Repair
- Freon Gas Refilling Services

---

### PAGE 6: Electrical & Electronics (`/electrical/`)

**Heading:** "Electrical & Electronics Services"

**Overview:**
From industrial motor rewinding to advanced PCB card repair, Leon International provides a full range of electrical and electronic services for the marine and industrial sectors. Our electrical engineers and technicians are experts in their field, capable of diagnosing complex faults, executing precision repairs, and delivering high-standard results that keep your systems running reliably.

Our electrical team operates on a 24-hour basis, ensuring that urgent repairs can be completed on time and in alignment with your vessel's sailing schedule. Whether you need an emergency motor rewinding, a complete transformer overhaul, or sophisticated PCB-level repair work, we have the equipment, expertise, and experience to deliver.

**What We Offer:**
- Industrial Motor Rewinding & Reconditioning (AC/DC, any capacity)
- Electrical & Electronics Equipment Repair
- PCB Card Repair (Software & Hardware Level Services)
- Transformer Rewinding
- Armature Repair
- AVR (Automatic Voltage Regulator) Manufacture & Repair
- Coil Rewinding (Any Type)
- Electric Fault Finding & Diagnosis
- Electrical / Electronics Imports and Supply
- Marine Navigation Equipment Servicing
- Switchboard Repair and Maintenance
- Alternator Repair and Testing

---

### PAGE 7: Fabrication & Welding (`/fabrication/`)

**Heading:** "Fabrication & Welding Services"

**Overview:**
Leon International's fabrication and welding capabilities are a cornerstone of our service offering. Our team of skilled fabricators and Bureau Veritas-approved welders undertakes projects ranging from precision pipe fabrication to large-scale steel structure erection — all executed to classification society requirements and international welding standards.

Our fabrication facility in Karachi is equipped to work with mild steel, stainless steel, and aluminum, allowing us to handle diverse project requirements across the marine, industrial, and infrastructure sectors. Whether it's a critical hull repair, a custom pressure vessel, or the fabrication of navigational buoys, our team delivers craftsmanship that meets the demanding conditions of maritime and industrial environments.

**What We Offer:**
- Fabrication of Steel Structures, Hulls, and Pressure Vessels
- Metal Fabrication to Specification (Mild Steel, Stainless Steel, Aluminum)
- All Types of Welding by BV-Approved Certified Welders
- Renewal of Deck Plates, Double Bottom Tanks, Fore Peak Tanks, and Ballast Tanks
- Pipe Fabrication and Steel Works
- Buoys Fabrication
- Custom Structure Erection and Installation
- Repair and Fabrication of Loading Arms
- Custom Fabrication of Obsolete or Unavailable Parts

---

### PAGE 8: Testing, Inspection & Calibration (NDT) (`/ndt-inspection/`)

**Heading:** "Testing, Inspection & Calibration Services"

**Overview:**
Ensuring the structural integrity and operational safety of your marine and industrial assets requires advanced testing and inspection capabilities. Leon International offers a comprehensive suite of Non-Destructive Testing (NDT) services, crane testing, and precision calibration — all performed by qualified technicians using Bureau Veritas-approved equipment.

Our NDT services detect hidden flaws, measure material thickness, and verify structural soundness without damaging the component being tested. These services are essential for class surveys, regulatory compliance, and preventive maintenance programs. Whether you need ultrasonic gauging for hull plating, magnetic particle inspection for engine components, or a full crane load test with water balloons, our team delivers accurate, certified results.

**What We Offer:**
- Ultrasonic Thickness Gauging (UTM) — BV Approved
- Ultrasonic Flaw Detection (UFD)
- Magnetic Particle Inspection / Testing (MT)
- Dye Penetrant Testing (PT)
- Hardness Testing
- Crane Load Test (Using Water Balloons & Certified Load-Indicating Equipment)
- Crane Inspection Services
- Marine Tools & Equipment Calibration and Certification
- Hatch Cover Ultrasonic Tightness Testing
- Overhauling of Gyro Compasses
- Certification to Lloyd's Register, Bureau Veritas, and other class society standards

---

### PAGE 9: Protective Coatings & Surface Treatment (`/protective-coatings/`)

**Heading:** "Protective Coatings & Surface Treatment"

**Overview:**
Marine and industrial environments subject equipment to relentless corrosion, erosion, and wear. Leon International's protective coating and surface treatment services restore and protect your critical assets, extending their operational life and maintaining peak performance.

Our coating specialists work with industry-leading products including Belzona industrial coatings, which are specifically formulated to recondition machinery parts affected by wear and erosion. Combined with our sandblasting and grit blasting capabilities, we deliver surface preparation and coating application that meet the most demanding operational requirements.

**What We Offer:**
- Industrial Protective Coatings (Belzona Applications)
- Sandblasting / Grit Blasting for Surface Preparation
- Metal Stitching / Metalocking for Crack Repair
- Erosion and Corrosion Protection Coatings
- Machinery Part Reconditioning through Coating Applications
- Anti-Fouling and Marine Paint Systems
- Tank Coating and Lining Services

---

### PAGE 10: HVAC & Refrigeration (`/hvac/`)

**Heading:** "HVAC & Refrigeration Services"

**Overview:**
Properly functioning air conditioning and refrigeration systems are essential for crew comfort, cargo preservation, and regulatory compliance aboard marine vessels and in industrial facilities. Leon International provides comprehensive HVAC and refrigeration services, from routine maintenance to emergency compressor overhauls.

**What We Offer:**
- Air Conditioning Plant Repair and Maintenance
- AC Compressor Overhauling
- Freon Gas Refilling and System Recharging
- Cold Storage Compressor Repair
- Refrigeration System Cleaning and Maintenance
- Marine Refrigeration System Servicing
- HVAC System Design Consultation
- Preventive Maintenance Programs for HVAC Systems

---

### PAGE 11: Specialized Services (`/specialized/`)

**Heading:** "Specialized Marine & Industrial Services"

**Overview:**
Beyond our core service categories, Leon International offers a range of specialized services that address unique maritime and industrial challenges. These capabilities demonstrate our commitment to being a truly comprehensive service provider — one that can handle virtually any requirement your operations present.

**What We Offer:**
- Air Lifting Balloon Recovery Services — Utilizing air lifting balloons for salvage and recovery operations in Karachi and surrounding waters
- Propulsion System Services — Complete propulsion system maintenance, repair, and overhauling including propellers, gearboxes, and drive systems
- Custom Manufacturing of Obsolete Parts — When parts are discontinued or unavailable, our fabrication team can manufacture replacements to exact specifications
- Spare Parts Procurement & Global Sourcing — Leveraging our offices in Pakistan, China, and Latvia to source parts from manufacturers worldwide
- Worldwide Delivery Coordination — End-to-end logistics management for spare parts delivery to any port or location globally
- Vessel Inspection & Survey Services — Free-of-cost vessel boarding, inspection, and survey to assess work scope and provide competitive quotations

---

## PAGE 12: PRODUCTS OVERVIEW

**Route:** `/products/`
**File:** `src/app/products/page.tsx`

### Hero Section
- Heading: "Marine & Industrial Products"
- Subheading: "New, Reconditioned & Used — Sourced Globally, Delivered Worldwide"

### Intro

Leon International maintains an extensive inventory of marine and industrial products spanning engine components, electrical equipment, navigation systems, deck machinery, and beyond. Our sourcing network spans four countries — Pakistan, China, Latvia, and the UAE — giving us direct access to manufacturers, OEM distributors, and ship recycling facilities.

We offer products in three condition tiers to match every budget and timeline: brand-new OEM parts for critical applications, professionally reconditioned components that perform like new at a fraction of the cost, and quality-tested used parts sourced from ship demolition yards. Every product undergoes rigorous quality checks and is dispatched with complete documentation to ensure smooth customs clearance and traceability.

### Product Categories Grid

*(Display as large cards with images, linking to individual product pages)*

1. **Engine Parts** — Components for 20+ engine brands (MTU, MAN, Cummins, CAT, etc.) → /engine-parts/
2. **Main Engine Spare Parts** — Cylinder covers, liners, pistons, exhaust valves, fuel pumps → /main-engine-spares/
3. **Auxiliary Engine Components** — Complete sets and major components → /auxiliary-engines/
4. **Diesel Generators** — Complete overhauled gen sets for marine and power sectors → /diesel-generators/
5. **Turbocharger Spares** — Complete units and individual components → /turbocharger-spares/
6. **Air Compressor & Spares** — Marine air compressors and replacement parts → /air-compressors/
7. **Navigation Systems** — Radar, GPS, communication equipment (new, used, reconditioned) → /navigation-systems/
8. **Electrical Equipment** — Motors, alternators, governors, transformers, AVRs, PCB cards → /electrical-equipment/
9. **Hydraulic Equipment & Hoses** — Pumps, tools, hoses, system components → /hydraulic-equipment/
10. **Petroleum Equipment** — Specialized oil & gas sector equipment → /petroleum-equipment/
11. **Explosion-Proof Equipment** — ATEX-rated components for hazardous environments → /explosion-proof/
12. **Propulsion Systems** — Propellers, gearboxes, drive systems (30HP to 4500HP) → /propulsion-systems/
13. **Deck Machinery & Equipment** — Windlasses, winches, cranes, anchor chains → /deck-machinery/
14. **Purifiers / Oil Separators** — Oil purifier units and spare parts → /purifiers/
15. **Power Plant Equipment** — Industrial generators and power plant components → /power-plant/

### Engine Brands Section (repeat from homepage)

### CTA: "Can't Find What You Need? Contact Us for Custom Sourcing"

---

## PAGES 13-27: INDIVIDUAL PRODUCT PAGES

Each product page follows this template:

```
Breadcrumb Navigation
Hero/Banner with product category image
Product Overview (2-3 paragraphs)
Available Parts List
Supported Engine Brands/Manufacturers
Condition Options: New | Reconditioned | Used
Product Image Gallery
Inquiry Form (Name, Email, Part Number/Description, Quantity, Urgency)
Related Products section
```

**Note:** I am including the full content for 3 key product pages below as examples. The remaining product pages should follow the same pattern with content adapted to their specific category.

### Example: Engine Parts Page (`/engine-parts/`)

**Heading:** "Engine Parts & Components"
**Subheading:** "Genuine, OEM & Alternative Parts for 20+ Engine Manufacturers"

Leon International is a leading independent supplier of marine and industrial engine parts, serving clients across the maritime, mining, energy, and transportation sectors. Our extensive inventory covers components for over twenty major engine manufacturers, from two-stroke marine propulsion engines to high-speed industrial power units.

Whether you operate container ships, bulk carriers, tugboats, fishing vessels, or power generation facilities, we can supply the engine parts you need to maintain performance and reliability. Our sourcing network spans Pakistan, China, Latvia, and the UAE, allowing us to offer competitive pricing, fast procurement, and worldwide delivery.

**Engine Brands We Supply Parts For:**

**Two-Stroke (Main Engines):** MAN B&W, Wärtsilä / Sulzer, Mitsubishi, Hanshin Diesel

**Four-Stroke / Medium Speed:** Daihatsu, Yanmar, Hyundai HiMSEN, Bergen, Stork, MAK

**High-Speed / Industrial:** MTU, MWM, DEUTZ, Cummins, Perkins, Caterpillar (CAT), Volvo Penta, Waukesha, John Deere, Scania, Lombardini

**Available Components:**
Cylinder Covers, Cylinder Liners, Piston Crowns, Piston Skirts, Piston Rods, Connecting Rods, Crankshafts, Camshafts, Exhaust Valves, Valve Seats, Fuel Pumps, Fuel Injectors, Turbochargers, Gaskets, Bearings, Seals, Cooling System Components, Lubrication System Parts, Starting Air System Components, and more.

**Browse by Brand:** *(Links to brand-specific sub-pages)*
MTU | MAN | Cummins | Caterpillar | Volvo Penta | DEUTZ | Perkins | MWM | Waukesha

---

### Example: Diesel Generators Page (`/diesel-generators/`)

**Heading:** "Diesel Generator Sets"
**Subheading:** "Complete Overhauled Generator Sets for Marine & Power Sectors"

Leon International maintains a large inventory of complete, overhauled diesel generator sets suitable for both marine propulsion/auxiliary power and land-based power generation applications. Our generator sets are sourced from reputable origins, thoroughly inspected, and fully tested before delivery to ensure reliable performance from day one.

We supply generator sets from leading manufacturers including Daihatsu, Yanmar, Wärtsilä, Hyundai HiMSEN, MAN B&W, Bergen, Stork, and MAK. Whether you need a replacement auxiliary generator for your vessel or a standby power unit for an industrial facility, we can match the right generator to your specific power requirements, fuel type, and operating conditions.

**Supported Manufacturers:** Daihatsu, Yanmar, Wärtsilä, Hyundai HiMSEN, MAN B&W, Bergen, Stork, MAK

**Available Configurations:** Complete overhauled generator sets, Major components (engine blocks, alternators, control panels), Individual spare parts for generator maintenance

---

### Example: Navigation Systems Page (`/navigation-systems/`)

**Heading:** "Navigation & Communication Systems"
**Subheading:** "New, Used & Reconditioned Equipment for Commercial and Naval Vessels"

Leon International supplies a comprehensive range of navigation and communication equipment for commercial vessels, naval ships, submarines, and other maritime platforms. Our inventory includes both new and reconditioned systems, providing flexible options for fleet upgrades, emergency replacements, and new build projects.

**Equipment Categories:**
Radar Systems, GPS Units and Receivers, Electronic Chart Display (ECDIS), Gyro Compasses, Magnetic Compasses, Autopilot Systems, Echo Sounders, Speed Logs, AIS (Automatic Identification Systems), VHF/UHF Radios, GMDSS Equipment, Satellite Communication Systems, Weather Monitoring Equipment, Bridge Navigational Watch Alarm Systems (BNWAS)

---

## PAGE 28: PROJECTS / PORTFOLIO

**Route:** `/projects/`
**File:** `src/app/projects/page.tsx`

### Hero Section
- Heading: "Our Projects"
- Subheading: "Decades of Maritime Excellence — See Our Work Across Ship Repair, Fabrication & Engineering"

### Filter Bar
Categories: All | Ship Repair | Fabrication | Engine Overhauling | Electrical | Coatings | Deck Machinery | Industrial

### Project Grid (Filterable)

Each project card: Large image + Title + Category tag + Short description on hover

**Projects to showcase:**
1. Buoys Fabrication — Custom steel buoy fabrication for port navigation
2. Loading Arms Repairing — Industrial loading arm overhaul and restoration
3. Weighbridge Repairing — Precision calibration and mechanical repair
4. Fender Repair Work — Marine fender restoration and replacement
5. Generator Overhauling — Daihatsu DK20 complete overhaul
6. Fair Leads Roller Repair — Deck hardware reconditioning
7. Main Engine Overhaul — Two-stroke diesel engine complete reconditioning
8. Oil Purifier Reconditioning — Purifier disassembly, cleaning, and reassembly
9. Compressor Overhaul — Sperre air conditioning compressor servicing
10. Hydraulic Windlass Motor — Shaft fabrication and motor repair
11. Tanker Chipping & Painting — Full vessel surface preparation and painting
12. Crankshaft Reconditioning — Generator crankshaft precision machining

---

## PAGE 29: CONTACT US

**Route:** `/contact/`
**File:** `src/app/contact/page.tsx`

### Hero Section
- Heading: "Contact Us"
- Subheading: "Get in Touch With Our Team — We're Available 24/7"

### Contact Information Grid

**Pakistan Headquarters**
Address: Plot#122-C, Keamari Township, Keamari, Karachi-75260, Pakistan
Landlines: +92-21-32850282, +92-21-32850507, +92-21-32851421, +92-21-32857358
Admin: Mr. Danish (+92-300-950-9573), Mr. Shahmir (+92-336-211-4496)
Operations: Mr. Saqib (+92-321-922-9872), Mr. Mahmood (+92-333-214-8142), Mr. Shehryar (+92-331-294-6844)
Email: info@leoninternational.com, ops@leoninternational.com, supplies@leoninternational.com

**UAE Office**
Address: Office No: CWS-1V-223879, 26th Floor, Amber Gem Tower, Sheikh Khalifa Street, Ajman, UAE
Contact: Mr. Shahzad
Email: shahzad@leoninternational.com

**China Office**
Address: No. 29-4, Xinhuaqiang District, Shiyan City, Hubei, China
Email: china@leoninternational.com

**Latvia Office**
Address: Annas Brigaderes iela 4-47, LV-1082, Rīga, Latvia
Email: europe@leoninternational.com

### Contact Form
Fields: Full Name, Email, Phone, Company Name, Subject (dropdown: General Inquiry, Service Request, Parts Inquiry, Quote Request, Other), Message
Submit Button: "Send Message"

### Embedded Google Map
Show Karachi HQ location with pin

---

## PAGE 30: REQUEST A QUOTE

**Route:** `/quote/`
**File:** `src/app/quote/page.tsx`

### Heading: "Request a Free Quote"
### Subheading: "Tell us what you need and we'll respond within 24 hours"

### Multi-Step Form or Single-Page Form

**Step 1 — Your Details:**
Full Name, Company Name, Email, Phone, Country

**Step 2 — What You Need:**
Request Type: (Radio buttons) Service | Spare Parts | Both
If Service: Service Category dropdown (Ship Repair, Mechanical, Electrical, Fabrication, NDT, Coatings, HVAC, Other)
If Parts: Part Description (textarea), Engine Brand dropdown, Part Number (if known), Quantity, Condition Preference (New / Reconditioned / Used / Any)

**Step 3 — Additional Details:**
Vessel Name (optional), IMO Number (optional), Urgency (dropdown: Standard / Urgent / Emergency), Preferred Delivery Location, Additional Notes (textarea), File Upload (for drawings, photos, part lists)

**Submit Button:** "Submit Quote Request"

**Confirmation:** Show success message + estimated response time (24 hours)

---

## PAGE 31: BLOG

**Route:** `/blog/`
**File:** `src/app/blog/page.tsx`

### Heading: "Insights & Resources"
### Subheading: "Industry news, technical guides, and expert advice from our marine engineering team"

### Blog Post Ideas (Initial Content Calendar):

1. "The Complete Guide to Marine Engine Maintenance: When to Repair vs. Replace"
2. "Understanding Non-Destructive Testing: UFD, MT, PT, and When You Need Each"
3. "New vs. Reconditioned vs. Used Marine Parts: Making the Right Choice for Your Vessel"
4. "Crane Load Testing: Why It Matters and How It's Done"
5. "The Importance of Industrial Protective Coatings in Marine Environments"
6. "Top 10 Signs Your Ship's Main Engine Needs Overhauling"
7. "How to Choose the Right Turbocharger Spare Parts for Your Engine"
8. "Belzona Coatings: Applications and Benefits for Marine Machinery"
9. "Understanding Class Surveys: What Lloyd's, BV, and DNV Look For"
10. "Marine Welding Standards: What Makes a BV-Approved Weld Different"

---

## GLOBAL COMPONENTS

### Header / Navbar
- **Layout:** Logo (left) | Navigation Links (center) | Search + WhatsApp + "Get Quote" button (right)
- **Sticky on scroll** with slight shadow
- **Mega Menu for Services:** 8 service categories in 2-column grid with icons
- **Mega Menu for Products:** 15 product categories in 3-column grid with icons
- **Mobile:** Hamburger menu with slide-in drawer

### WhatsApp Floating Button
- Fixed position, bottom-right
- Green WhatsApp icon
- Links to wa.me/923009509573 (or primary WhatsApp number)
- Subtle bounce animation on page load

### Breadcrumb Navigation
- Present on all inner pages
- Format: Home > Services > Ship Repair & Dry Docking

---

## SEO CONFIGURATION

### Meta Titles Pattern:
- Homepage: "Leon International | Marine Engineering, Ship Repair & Spare Parts Supplier"
- Services: "[Service Name] | Leon International Marine Services"
- Products: "[Product Category] | Leon International Marine & Industrial Products"
- Brand pages: "[Brand] Engine Parts Supplier | Leon International"

### Meta Descriptions Pattern:
- Keep under 155 characters
- Include primary keyword + location (Pakistan/Karachi) + unique value prop

### Schema Markup:
- LocalBusiness schema on all pages
- Service schema on service pages
- Product schema on product pages
- FAQ schema where applicable
- BreadcrumbList schema on all inner pages

### Technical SEO:
- **CRITICAL: `next.config.js` must include `trailingSlash: true`** — all URLs end with `/`
- All page routes are FLAT (no nesting) — see Sitemap section
- `next-sitemap` package for automatic XML sitemap generation
- Proper canonical URLs
- Image optimization with `next/image` (WebP, lazy loading)
- Open Graph and Twitter Card meta tags on all pages

---

## DEVELOPMENT INSTRUCTIONS FOR AI CODING ASSISTANT

When building this website, follow these instructions:

1. **Initialize:** `npx create-next-app@latest leon-international --typescript --tailwind --app --src-dir`
2. **Install dependencies:** `npm install framer-motion swiper lucide-react react-hook-form @hookform/resolvers zod`
3. **Configure `next.config.js`** — Add `trailingSlash: true` so all URLs end with `/`
4. **Set up Tailwind config** with the color palette defined in Section 2
5. **Build components first:** Start with global components (Header, Footer, MegaMenu, WhatsApp button)
6. **Build Homepage** section by section following the exact content above
7. **Build inner pages** using the content provided — NOTE: all page routes are FLAT (e.g., `src/app/ship-repair/page.tsx` NOT `src/app/services/ship-repair/page.tsx`)
8. **Make everything responsive** — mobile-first approach
9. **Add animations** — subtle fade-up on scroll using Framer Motion
10. **Use `next/image`** for all images with proper alt text
11. **Generate sitemap** with next-sitemap
12. **Add schema markup** using JSON-LD in the head of each page

### Next.js App Router Folder Structure (Flat Routes):

```
src/app/
├── page.tsx                    → / (Homepage)
├── about/page.tsx              → /about/
├── services/page.tsx           → /services/
├── ship-repair/page.tsx        → /ship-repair/
├── mechanical-repair/page.tsx  → /mechanical-repair/
├── electrical/page.tsx         → /electrical/
├── fabrication/page.tsx        → /fabrication/
├── ndt-inspection/page.tsx     → /ndt-inspection/
├── protective-coatings/page.tsx → /protective-coatings/
├── hvac/page.tsx               → /hvac/
├── specialized/page.tsx        → /specialized/
├── products/page.tsx           → /products/
├── engine-parts/page.tsx       → /engine-parts/
├── mtu-parts/page.tsx          → /mtu-parts/
├── man-parts/page.tsx          → /man-parts/
├── cummins-parts/page.tsx      → /cummins-parts/
├── caterpillar-parts/page.tsx  → /caterpillar-parts/
├── volvo-penta-parts/page.tsx  → /volvo-penta-parts/
├── deutz-parts/page.tsx        → /deutz-parts/
├── perkins-parts/page.tsx      → /perkins-parts/
├── mwm-parts/page.tsx          → /mwm-parts/
├── waukesha-parts/page.tsx     → /waukesha-parts/
├── main-engine-spares/page.tsx → /main-engine-spares/
├── auxiliary-engines/page.tsx  → /auxiliary-engines/
├── diesel-generators/page.tsx  → /diesel-generators/
├── turbocharger-spares/page.tsx → /turbocharger-spares/
├── air-compressors/page.tsx    → /air-compressors/
├── navigation-systems/page.tsx → /navigation-systems/
├── electrical-equipment/page.tsx → /electrical-equipment/
├── hydraulic-equipment/page.tsx → /hydraulic-equipment/
├── petroleum-equipment/page.tsx → /petroleum-equipment/
├── explosion-proof/page.tsx    → /explosion-proof/
├── propulsion-systems/page.tsx → /propulsion-systems/
├── deck-machinery/page.tsx     → /deck-machinery/
├── purifiers/page.tsx          → /purifiers/
├── power-plant/page.tsx        → /power-plant/
├── projects/page.tsx           → /projects/
├── blog/page.tsx               → /blog/
├── blog/[slug]/page.tsx        → /blog/[slug]/
├── contact/page.tsx            → /contact/
├── quote/page.tsx              → /quote/
└── layout.tsx                  → Root layout (Header, Footer)
```

**Design Aesthetic:** Think Wärtsilä meets Caterpillar — clean, professional, dark navy and white with orange accents. No clutter. Lots of whitespace. High-quality imagery. Strong CTAs.

---

*End of Leon International Website Blueprint — February 2026*
