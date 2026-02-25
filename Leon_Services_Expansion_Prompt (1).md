# AGENT TASK: Expand Services — Sub-Dropdown Mega Menu (Services + Homepage Nav) + Individual Pages for Every Service

## WHAT CHANGED

Previously, we had 8 service category pages and a simple dropdown menu. Now the client wants:

1. **Every individual service** (25+ services) to appear as a **sub-item inside the Services mega menu dropdown** under its parent category — this applies to BOTH the **Homepage navbar** AND **all inner pages navbar**
2. **Every individual service to have its OWN dedicated page** with a flat URL and trailing slash
3. **The Products mega menu is ALREADY DONE — do NOT touch it**

This means we're going from 8 service pages to **8 parent pages + 27 individual service sub-pages = 35 service pages total**.

---

## PART 1: UPDATED MEGA MENU STRUCTURE

Update `Header.tsx` to show this exact structure when hovering/clicking "Services":

```
Services ▼
├── Ship Repair & Dry Docking          → /ship-repair/
│   ├── Dry Docking & SLTS Services    → /dry-docking-slts/
│   ├── Major Ship Repair Facilities   → /major-ship-repair/
│   └── Vessel Repair on Anchorage     → /vessel-repair-anchorage/
│
├── Mechanical Repair & Engineering    → /mechanical-repair/
│   ├── Main Engine & Generator Repair → /main-engine-generator-repair/
│   ├── Major Repair of Boilers        → /boiler-repair/
│   ├── Hydraulic Pump Overhauling     → /hydraulic-pump-overhauling/
│   ├── Windlass Major Repair          → /windlass-repair/
│   └── Deck Machinery Overhauling     → /deck-machinery-overhauling/
│
├── Electrical & Electronics           → /electrical/
│   ├── Industrial Motor Rewinding     → /motor-rewinding/
│   ├── PCB Card Repair                → /pcb-card-repair/
│   ├── Transformer Rewinding          → /transformer-rewinding/
│   └── Electrical Equipment Repair    → /electrical-equipment-repair/
│
├── Fabrication & Welding              → /fabrication/
│   ├── Steel Structure Fabrication    → /steel-structure-fabrication/
│   ├── Welding Services               → /welding-services/
│   └── Buoys Fabrication              → /buoys-fabrication/
│
├── NDT & Inspection                   → /ndt-inspection/
│   ├── Ultrasonic Thickness Gauging   → /ultrasonic-gauging/
│   ├── Ultrasonic Flaw Detection      → /ultrasonic-flaw-detection/
│   ├── Magnetic Particle Inspection   → /magnetic-particle-inspection/
│   ├── Dye Penetrant Testing          → /dye-penetrant-testing/
│   ├── Hardness Testing               → /hardness-testing/
│   ├── Crane Load Test                → /crane-load-test/
│   ├── Crane Inspection               → /crane-inspection/
│   ├── Marine Tools Calibration       → /marine-tools-calibration/
│   ├── Hatch Cover Tightness Testing  → /hatch-cover-testing/
│   └── Gyro Compass Overhauling       → /gyro-compass-overhauling/
│
├── Protective Coatings                → /protective-coatings/
│   ├── Belzona / Industrial Coatings  → /industrial-coatings/
│   ├── Sandblasting / Grit Blasting   → /sandblasting/
│   └── Metal Stitching / Metalocking  → /metal-stitching/
│
├── HVAC & Refrigeration               → /hvac/
│   ├── AC Plant Repair                → /ac-plant-repair/
│   └── Cold Storage & Refrigeration   → /cold-storage-repair/
│
└── Specialized Services               → /specialized/
    ├── Air Lifting Balloon Services   → /air-lifting-balloon/
    ├── Spare Parts Supply             → /spare-parts-supply/
    └── Custom Parts Fabrication       → /custom-parts-fabrication/
```

### Mega Menu Design (Desktop):

The Services dropdown should be a **multi-column mega menu panel** that appears on hover:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  Ship Repair & Dry Docking    │  Mechanical Repair          │  Electrical        │
│  ─────────────────────────    │  ────────────────           │  ───────────       │
│  • Dry Docking & SLTS         │  • Main Engine & Generator  │  • Motor Rewinding │
│  • Major Ship Repair          │  • Boiler Repair            │  • PCB Card Repair │
│  • Vessel Repair Anchorage    │  • Hydraulic Pump Overhaul  │  • Transformer     │
│                               │  • Windlass Repair          │  • Equipment Repair│
│  Fabrication & Welding        │  • Deck Machinery Overhaul  │                    │
│  ─────────────────────        │                             │  HVAC & Refrig.    │
│  • Steel Structure Fab.       │  NDT & Inspection           │  ───────────       │
│  • Welding Services           │  ────────────────           │  • AC Plant Repair │
│  • Buoys Fabrication          │  • Ultrasonic Gauging       │  • Cold Storage    │
│                               │  • Ultrasonic Flaw Detect.  │                    │
│  Protective Coatings          │  • Magnetic Particle Insp.  │  Specialized       │
│  ─────────────────────        │  • Dye Penetrant Testing    │  ───────────       │
│  • Industrial Coatings        │  • Hardness Testing         │  • Air Lifting     │
│  • Sandblasting               │  • Crane Load Test          │  • Spare Parts     │
│  • Metal Stitching            │  • Crane Inspection         │  • Custom Parts    │
│                               │  • Tools Calibration        │                    │
│                               │  • Hatch Cover Testing      │                    │
│                               │  • Gyro Compass Overhaul    │                    │
├──────────────────────────────────────────────────────────────────────────────────┤
│                          View All Services →  /services/                         │
└──────────────────────────────────────────────────────────────────────────────────┘
```

- 3-column layout on desktop
- Parent categories are bold headings with a link
- Sub-items are regular links indented below each parent
- Bottom bar: "View All Services →" linking to `/services/`
- On mobile: accordion style inside hamburger menu (parent expands to show children)
- Use Framer Motion for open/close animation

### IMPORTANT: Apply to BOTH Homepage and Inner Pages

The Services mega menu must appear in the navbar on **every page** — including the Homepage. Since the Header component is global (rendered via `layout.tsx`), this should work automatically. But verify that:

- The Homepage navbar shows the Services mega menu on hover/click
- All inner page navbars show the same Services mega menu
- The existing Products mega menu remains untouched and continues working
- Both mega menus can be open independently (hovering Services shows Services menu, hovering Products shows Products menu)

---

## PART 2: CREATE ALL 27 INDIVIDUAL SERVICE SUB-PAGES

### Step 1: Build a Reusable `ServiceSubPageLayout` Component

Create `src/components/ui/ServiceSubPageLayout.tsx`

This component will be reused for ALL 27 sub-pages. Props:

```typescript
interface ServiceSubPageProps {
  title: string                    // "Dry Docking & SLTS Services"
  subtitle: string                 // Short tagline
  parentService: {                 // The parent category
    title: string                  // "Ship Repair & Dry Docking"
    href: string                   // "/ship-repair/"
  }
  overview: string[]               // 2-3 paragraphs of content
  capabilities: string[]           // Bullet list of what we do
  standards?: string[]             // Applicable certifications/standards
  relatedServices: {               // 3-4 related service links
    title: string
    href: string
  }[]
}
```

Layout (top to bottom):
1. **PageHero** (reuse existing) — Breadcrumb: Home > Services > {Parent Category} > {Service Title}
2. **Overview Section** — Render the `overview` paragraphs
3. **Our Capabilities** — Styled bullet list from `capabilities`
4. **Standards & Certifications** — If `standards` provided, show certification badges/text
5. **Related Services** — Card links to other service pages
6. **CTA Section** — "Need This Service? Request a Quote" with button → `/quote/`

### Step 2: Create All 27 Pages

Every page is a flat route. Each file is at `src/app/{slug}/page.tsx`.

---

#### SHIP REPAIR & DRY DOCKING SUB-PAGES:

**Page: `/dry-docking-slts/`**
File: `src/app/dry-docking-slts/page.tsx`
Title: "Dry Docking & SLTS Services"
Parent: Ship Repair & Dry Docking → `/ship-repair/`
Overview:
Leon International provides complete dry docking and Ship Lift Transfer System (SLTS) services at Karachi Port and Port Bin Qasim. Our dry docking capabilities encompass full hull inspection, cleaning, repair, and repainting — all performed under the supervision of classification society surveyors from Lloyd's Register, Bureau Veritas, DNV, ABS, and other recognized bodies.

Our SLTS facilities enable efficient transfer of vessels from water to dry dock and back, minimizing turnaround time and reducing operational costs. Whether your vessel requires routine bottom maintenance, emergency hull repair, or class-mandated dry docking surveys, our team ensures the work is completed to the highest international standards with minimal disruption to your sailing schedule.

Capabilities:
- Complete dry docking services for vessels of various sizes
- Ship Lift Transfer System (SLTS) operations
- Hull inspection, cleaning, and surface preparation
- Bottom plate renewal and steel replacement
- Propeller and rudder inspection and repair
- Sea chest and sea valve maintenance
- Anti-fouling and protective coating application
- Class survey support and documentation
- Emergency dry docking services
Standards: Lloyd's Register, Bureau Veritas, DNV, ABS, NKK, CCS
Related: Major Ship Repair → `/major-ship-repair/`, Vessel Repair on Anchorage → `/vessel-repair-anchorage/`, Protective Coatings → `/protective-coatings/`

---

**Page: `/major-ship-repair/`**
File: `src/app/major-ship-repair/page.tsx`
Title: "Major Ship Repair Facilities"
Parent: Ship Repair & Dry Docking → `/ship-repair/`
Overview:
Leon International operates one of the most comprehensive ship repair facilities in the Karachi Port region. Our team of experienced marine engineers, certified welders, and skilled technicians handles everything from routine maintenance to complex structural repairs on vessels of all types and sizes — including bulk carriers, tankers, container ships, tugboats, and specialized craft.

We are fully licensed by the Pakistan Government and Karachi Port Trust, with the capability to carry out both afloat and alongside repairs. Our workshop is equipped with heavy-duty machining tools, welding stations, and specialized lifting equipment, while our mobile repair teams are ready to deploy to any berth or anchorage location at short notice.

Capabilities:
- Afloat and alongside ship repairs
- Hull structural repair and steel renewal
- Engine room repairs and machinery overhauling
- Deck machinery maintenance and repair
- Emergency repair services at port and anchorage
- Pipe fabrication and renewal
- Tank cleaning and repair (ballast, cargo, fuel)
- Classification society survey attendance
- Complete project management and documentation

---

**Page: `/vessel-repair-anchorage/`**
File: `src/app/vessel-repair-anchorage/page.tsx`
Title: "Vessel Repair on Outer Anchorage"
Parent: Ship Repair & Dry Docking → `/ship-repair/`
Overview:
When your vessel cannot afford the time or cost of entering port for repairs, Leon International brings the workshop to you. We maintain full capability for conducting repairs on vessels anchored at Karachi outer anchorage or Bin Qasim anchorage — allowing critical maintenance and emergency work to be completed without disrupting your vessel's schedule.

Our anchorage repair teams are equipped with portable machining tools, welding equipment, testing instruments, and a comprehensive inventory of commonly needed spare parts. We coordinate directly with port authorities, pilots, and agents to ensure smooth access to your vessel, and our work is performed to the same class-approved standards as our workshop-based services.

Capabilities:
- Mechanical repairs on outer anchorage (Karachi and Bin Qasim)
- Emergency engine and generator repair at anchor
- Welding and fabrication work on board
- Electrical fault finding and repair at anchor
- Spare parts delivery to anchorage
- Class survey attendance at anchorage
- 24/7 vessel boarding capability
- Coordination with port authorities and agents

---

#### MECHANICAL REPAIR SUB-PAGES:

**Page: `/main-engine-generator-repair/`**
File: `src/app/main-engine-generator-repair/page.tsx`
Title: "Main Engine & Generator Repair"
Parent: Mechanical Repair & Engineering → `/mechanical-repair/`
Overview:
The main engine and generators are the heart of your vessel's operational capability. Leon International provides comprehensive repair, overhauling, and reconditioning services for main engines and generators of any horsepower, covering all major manufacturers including MAN B&W, Wärtsilä, Cummins, Caterpillar, Yanmar, Daihatsu, and more.

Our mechanical engineering team performs everything from routine maintenance and minor adjustments to complete engine overhauls involving cylinder head reconditioning, piston and liner replacement, crankshaft inspection, fuel injection system servicing, and turbocharger maintenance. Every repair is documented and executed to meet classification society requirements.

Capabilities:
- Complete main engine overhauling (any horsepower, any manufacturer)
- Generator repair and complete overhauling
- Cylinder head reconditioning and replacement
- Piston, piston rod, and liner replacement
- Crankshaft inspection, polishing, and repair
- Fuel injection system servicing and calibration
- Turbocharger maintenance and repair
- Connecting rod inspection and reconditioning
- Engine alignment and performance testing
- Associated parts repair (pumps, coolers, condensers)

---

**Page: `/boiler-repair/`**
File: `src/app/boiler-repair/page.tsx`
Title: "Major Repair of Boilers"
Parent: Mechanical Repair & Engineering → `/mechanical-repair/`
Overview:
Marine boilers operate under extreme pressure and temperature conditions, making regular inspection and expert repair essential for safety and regulatory compliance. Leon International provides comprehensive boiler repair services for both main and auxiliary boilers, including annual inspection services that satisfy classification society survey requirements.

Our boiler repair capabilities cover everything from tube replacement and refractory lining repair to complete boiler overhauls. We work with fire-tube, water-tube, and exhaust gas boilers across all major manufacturers, ensuring your steam generation systems operate safely and efficiently.

Capabilities:
- Major repair of main and auxiliary boilers
- Boiler annual inspection service
- Boiler tube replacement and plugging
- Refractory lining repair and renewal
- Safety valve testing and calibration
- Boiler mountings repair and replacement
- Economizer and superheater maintenance
- Boiler water treatment system servicing
- Pressure testing and certification
- Emergency boiler repair services

---

**Page: `/hydraulic-pump-overhauling/`**
File: `src/app/hydraulic-pump-overhauling/page.tsx`
Title: "Overhauling & Repairing Hydraulic Pumps"
Parent: Mechanical Repair & Engineering → `/mechanical-repair/`
Overview:
Hydraulic systems power many of your vessel's most critical operations — from steering gear and cargo cranes to hatch covers and ramp mechanisms. Leon International specializes in the complete overhauling, repair, and testing of hydraulic pumps and associated system components, restoring them to peak operating condition.

Our hydraulic repair team handles pumps of all types and capacities, including axial piston, radial piston, gear, and vane pumps. We also service hydraulic motors, cylinders, control valves, and complete hydraulic power packs. Every repaired unit undergoes rigorous pressure testing before being returned to service.

Capabilities:
- Complete overhauling of hydraulic pumps (all types)
- Hydraulic motor repair and reconditioning
- Hydraulic cylinder repair and re-sealing
- Control valve repair and calibration
- Hydraulic power pack maintenance
- System pressure testing and diagnostics
- Hydraulic hose fabrication and replacement
- Pneumatic system repair and overhauling
- Hydraulic oil flushing and system cleaning

---

**Page: `/windlass-repair/`**
File: `src/app/windlass-repair/page.tsx`
Title: "Windlass Major Repair"
Parent: Mechanical Repair & Engineering → `/mechanical-repair/`
Overview:
The anchor windlass is essential for safe anchoring operations, and a windlass failure at a critical moment can put your vessel and crew at risk. Leon International provides major windlass repair and overhauling services, covering both hydraulic and electric windlass systems from all major manufacturers.

Our deck machinery specialists perform thorough inspections, component replacement, bearing renewal, brake adjustment, and complete system testing to restore your windlass to reliable, survey-ready condition.

Capabilities:
- Windlass major overhauling and repair
- Hydraulic and electric windlass servicing
- Brake lining renewal and adjustment
- Bearing replacement and shaft repair
- Gearbox inspection and overhauling
- Clutch mechanism repair
- Anchor chain inspection and testing
- Complete system testing and certification

---

**Page: `/deck-machinery-overhauling/`**
File: `src/app/deck-machinery-overhauling/page.tsx`
Title: "Deck Machinery Overhauling"
Parent: Mechanical Repair & Engineering → `/mechanical-repair/`
Overview:
Deck machinery endures some of the harshest operating conditions on any vessel — constant exposure to seawater, heavy loads, and demanding duty cycles. Leon International provides comprehensive overhauling services for all types of deck machinery including winches, capstans, cranes, davits, and mooring equipment.

Capabilities:
- Winch overhauling and repair (mooring, towing, cargo)
- Capstan maintenance and repair
- Crane overhauling and mechanical repair
- Davit servicing and load testing
- Mooring equipment inspection and repair
- Fairlead and roller maintenance
- Loading arm repair and reconditioning
- Steering gear overhauling

---

#### ELECTRICAL & ELECTRONICS SUB-PAGES:

**Page: `/motor-rewinding/`**
File: `src/app/motor-rewinding/page.tsx`
Title: "Industrial Motor Rewinding & Reconditioning"
Parent: Electrical & Electronics → `/electrical/`
Overview:
Electric motors are the workhorses of marine and industrial operations, driving pumps, compressors, fans, and countless other critical systems. When a motor fails, rapid expert repair is essential to minimize downtime. Leon International specializes in industrial motor rewinding and reconditioning for AC and DC motors of any type and any capacity.

Our motor rewinding facility uses standard quality winding wire, precision insulation materials, and experienced motor winders who deliver results that match or exceed OEM specifications. Every rewound motor undergoes comprehensive testing — insulation resistance, winding resistance, no-load current, and vibration analysis — before being cleared for return to service.

Capabilities:
- AC and DC motor rewinding (any capacity)
- Motor reconditioning and bearing replacement
- Insulation resistance testing and improvement
- Dynamic balancing of motor rotors
- Motor shaft repair and re-machining
- Coil rewinding for all motor types
- Submersible motor rewinding
- Motor performance testing and certification
- Emergency motor rewinding services (fast turnaround)

---

**Page: `/pcb-card-repair/`**
File: `src/app/pcb-card-repair/page.tsx`
Title: "PCB Card Repair"
Parent: Electrical & Electronics → `/electrical/`
Overview:
Printed Circuit Board (PCB) failures can bring critical marine and industrial systems to a standstill. Leon International offers specialized PCB card repair services at both the hardware and software level, diagnosing and fixing faults in control boards, power supply modules, inverter cards, PLC modules, and other electronic assemblies.

Our electronics technicians use advanced diagnostic equipment to identify component-level faults, replacing damaged ICs, capacitors, resistors, transistors, and other components. We also handle firmware and software-related issues where applicable.

Capabilities:
- PCB card repair (hardware and software level)
- Component-level fault diagnosis and repair
- Control board repair for marine machinery
- Power supply module repair
- Inverter and converter card repair
- PLC module troubleshooting and repair
- Marine electronics system diagnostics
- Software/firmware restoration where applicable

---

**Page: `/transformer-rewinding/`**
File: `src/app/transformer-rewinding/page.tsx`
Title: "Transformer Rewinding"
Parent: Electrical & Electronics → `/electrical/`
Overview:
Transformers are essential for power distribution in marine vessels and industrial facilities. Leon International provides professional transformer rewinding services, restoring failed or degraded transformers to their original specifications and performance levels.

Capabilities:
- Transformer rewinding (all types and capacities)
- Core inspection and re-lamination
- Insulation replacement and upgrade
- Oil-filled transformer servicing
- Dry-type transformer repair
- Tap changer repair and testing
- Transformer testing and certification
- AVR (Automatic Voltage Regulator) manufacture and repair
- Armature repair and rewinding

---

**Page: `/electrical-equipment-repair/`**
File: `src/app/electrical-equipment-repair/page.tsx`
Title: "Electrical & Electronics Equipment Repair"
Parent: Electrical & Electronics → `/electrical/`
Overview:
Leon International provides comprehensive repair services for all types of marine and industrial electrical and electronic equipment. From switchboard troubleshooting to navigation system repair, our electrical engineers deliver reliable solutions that keep your systems operational.

Capabilities:
- Marine and industrial electrical equipment repair
- Switchboard repair and maintenance
- Alternator repair and testing
- Electric fault finding and diagnostics
- Navigation equipment servicing and repair
- Communication equipment repair
- Electrical / electronics equipment imports and supply
- Emergency electrical repair services (24/7)

---

#### FABRICATION & WELDING SUB-PAGES:

**Page: `/steel-structure-fabrication/`**
File: `src/app/steel-structure-fabrication/page.tsx`
Title: "Fabrication of Steel Structures"
Parent: Fabrication & Welding → `/fabrication/`
Overview:
Leon International's fabrication facility handles projects ranging from precision marine components to large-scale structural steelwork. Our team of skilled fabricators works with mild steel, stainless steel, and aluminum to produce structures, hulls, pressure vessels, and custom components that meet classification society requirements.

Capabilities:
- Fabrication of steel structures and frameworks
- Hull fabrication and repair
- Pressure vessel fabrication and testing
- Pipe fabrication and piping systems
- Renewal of deck plates and structural members
- Double bottom tank, fore peak tank, and ballast tank fabrication
- Structural modifications and reinforcements
- Metal fabrication to customer specifications

---

**Page: `/welding-services/`**
File: `src/app/welding-services/page.tsx`
Title: "Welding Services"
Parent: Fabrication & Welding → `/fabrication/`
Overview:
Welding is fundamental to ship repair, fabrication, and structural maintenance. Leon International provides all types of welding services performed exclusively by Bureau Veritas-approved certified welders. Our welding capabilities cover every joint type and material commonly encountered in marine and industrial environments.

Capabilities:
- All types of welding (MIG, TIG, SMAW, FCAW, SAW)
- BV-approved certified welders
- Structural welding to classification society standards
- Pipe welding and pipeline fabrication
- Underwater welding capabilities
- Aluminum and stainless steel welding
- Cast iron welding and repair
- Weld inspection and quality documentation
- Emergency welding services (24/7)

---

**Page: `/buoys-fabrication/`**
File: `src/app/buoys-fabrication/page.tsx`
Title: "Buoys Fabrication"
Parent: Fabrication & Welding → `/fabrication/`
Overview:
Leon International designs and fabricates marine navigation buoys and marker buoys for port authorities, maritime agencies, and offshore operators. Our buoy fabrication combines precision steelwork with protective coating systems to produce durable, regulation-compliant navigational aids.

Capabilities:
- Navigation buoy fabrication
- Marker buoy design and construction
- Mooring buoy fabrication
- Steel structure cutting, forming, and welding
- Hot-dip galvanizing and protective coating
- Light and radar reflector installation
- Buoy chain and mooring hardware supply
- Delivery and deployment coordination

---

#### NDT & INSPECTION SUB-PAGES:

**Page: `/ultrasonic-gauging/`**
File: `src/app/ultrasonic-gauging/page.tsx`
Title: "Ultrasonic Thickness Gauging"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Ultrasonic Thickness Measurement (UTM) is essential for assessing the remaining wall thickness of hull plating, piping, tanks, and structural members without requiring physical access to both sides of the material. Leon International provides Bureau Veritas-approved ultrasonic thickness gauging services for classification surveys, condition assessments, and preventive maintenance programs.

Capabilities:
- BV-approved ultrasonic thickness gauging
- Hull plating thickness measurement
- Pipe wall thickness assessment
- Tank and structural member gauging
- Corrosion mapping and trending reports
- Classification survey support
- Comprehensive measurement reports with location charts
- On-board and workshop testing

---

**Page: `/ultrasonic-flaw-detection/`**
File: `src/app/ultrasonic-flaw-detection/page.tsx`
Title: "Ultrasonic Flaw Detection (UFD)"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Ultrasonic Flaw Detection identifies internal defects — cracks, voids, inclusions, and density variations — within materials that are invisible to the naked eye. Leon International uses advanced UFD equipment to locate and characterize flaws in critical components including shafts, forgings, castings, and welds.

Capabilities:
- Internal flaw detection in metallic components
- Weld inspection for subsurface defects
- Shaft and forging inspection
- Casting quality assessment
- Flaw location and sizing
- Certified inspection reports

---

**Page: `/magnetic-particle-inspection/`**
File: `src/app/magnetic-particle-inspection/page.tsx`
Title: "Magnetic Particle Inspection (MT)"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Magnetic Particle Inspection is used to detect surface and near-surface defects in ferromagnetic materials by applying a magnetic current and observing the resulting particle patterns. This method is highly effective for finding cracks in engine components, structural welds, and critical machinery parts.

Capabilities:
- Surface and near-surface crack detection
- Weld inspection on ferromagnetic materials
- Engine component inspection (crankshafts, connecting rods, cylinder heads)
- Structural member inspection
- Both dry and wet particle methods
- Certified inspection and reporting

---

**Page: `/dye-penetrant-testing/`**
File: `src/app/dye-penetrant-testing/page.tsx`
Title: "Dye Penetrant Testing (PT)"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Dye Penetrant Testing reveals surface-breaking cracks and defects on both ferromagnetic and non-ferromagnetic materials by applying a liquid dye that seeps into surface discontinuities. When a chalk-like developer is applied, the dye is drawn out, making defects clearly visible.

Capabilities:
- Surface crack detection on all metal types
- Applicable to welds, castings, forgings, and machined surfaces
- Color contrast and fluorescent methods available
- Post-weld inspection
- Certified inspection reports

---

**Page: `/hardness-testing/`**
File: `src/app/hardness-testing/page.tsx`
Title: "Hardness Testing"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Hardness testing measures the resistance of a material to deformation, providing valuable data about its mechanical properties, heat treatment condition, and suitability for service. Leon International performs hardness testing on marine and industrial components to verify material specifications and assess wear conditions.

Capabilities:
- Portable and bench hardness testing
- Brinell, Rockwell, and Vickers methods
- Post-weld hardness verification
- Material identification and verification
- Heat treatment assessment
- Certified test reports

---

**Page: `/crane-load-test/`**
File: `src/app/crane-load-test/page.tsx`
Title: "Crane Load Test"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Periodic proof-load testing of cranes and lifting equipment is a regulatory and classification requirement for maritime and industrial operations. Leon International conducts crane load tests using water balloons and certified load-indicating equipment, providing certification to internationally recognized standards including Bureau Veritas, Lloyd's Register, and others.

The use of water balloons offers a significant safety advantage over solid test weights — in the event of equipment failure during testing, water dissipates harmlessly rather than causing catastrophic impact damage.

Capabilities:
- Crane proof-load testing using water balloons
- Certified load-indicating equipment
- Certification to BV, Lloyd's Register, and other international standards
- Ship crane, port crane, and industrial crane testing
- Derrick testing
- Safe Working Load (SWL) verification
- Complete test certificates and documentation

---

**Page: `/crane-inspection/`**
File: `src/app/crane-inspection/page.tsx`
Title: "Crane Inspection"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Regular crane inspection ensures your lifting equipment operates safely and remains compliant with maritime and industrial regulations. Leon International provides thorough crane inspection services covering structural integrity, mechanical condition, electrical systems, and safety devices.

Capabilities:
- Complete crane structural inspection
- Wire rope inspection and assessment
- Hook and block examination
- Brake and clutch testing
- Electrical and control system checks
- Safety device verification (limit switches, overload protection)
- Inspection reports and compliance documentation

---

**Page: `/marine-tools-calibration/`**
File: `src/app/marine-tools-calibration/page.tsx`
Title: "Marine Tools Calibration"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Accurate measuring tools and instruments are essential for maintaining quality standards in marine repair and maintenance work. Leon International provides professional calibration and certification services for a wide range of marine and industrial measuring instruments.

Capabilities:
- Torque wrench calibration
- Pressure gauge calibration
- Temperature instrument calibration
- Micrometer and caliper calibration
- Dial indicator and gauge block calibration
- Calibration certificates with traceability
- On-site and workshop calibration available

---

**Page: `/hatch-cover-testing/`**
File: `src/app/hatch-cover-testing/page.tsx`
Title: "Hatch Cover Ultrasonic Tightness Testing"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
Hatch cover weathertightness is critical for protecting cargo from water ingress and maintaining vessel seaworthiness. Leon International performs ultrasonic hatch cover tightness testing, which provides precise and reliable results without requiring water hose testing.

Capabilities:
- Ultrasonic hatch cover tightness testing
- Identification of compression seal failures
- Cross-joint and end-closure testing
- Testing report with exact leak location mapping
- Recommendations for seal adjustment and replacement
- Classification survey support

---

**Page: `/gyro-compass-overhauling/`**
File: `src/app/gyro-compass-overhauling/page.tsx`
Title: "Overhauling of Gyro Compasses"
Parent: NDT & Inspection → `/ndt-inspection/`
Overview:
The gyro compass is a critical navigation instrument that requires regular overhauling to maintain heading accuracy and reliability. Leon International provides professional gyro compass overhauling services, restoring these precision instruments to factory performance specifications.

Capabilities:
- Complete gyro compass overhauling
- Bearing replacement and rotor maintenance
- Follow-up system calibration
- Repeater system servicing
- Performance testing and error correction
- Certified overhauling reports

---

#### PROTECTIVE COATINGS SUB-PAGES:

**Page: `/industrial-coatings/`**
File: `src/app/industrial-coatings/page.tsx`
Title: "Belzona / Industrial Protective Coatings"
Parent: Protective Coatings → `/protective-coatings/`
Overview:
Wear, erosion, and corrosion progressively degrade machinery parts and structural surfaces, reducing efficiency and eventually leading to failure. Leon International applies industrial protective coatings — including the globally recognized Belzona range — to recondition affected components and protect them against future degradation.

Belzona coatings enable the rebuilding of worn surfaces, sealing of leaks, and protection of equipment from chemical attack, erosion, and corrosion — often eliminating the need for costly component replacement.

Capabilities:
- Belzona coating application for marine and industrial machinery
- Erosion and corrosion protection coatings
- Pump and valve reconditioning through coating
- Pipe repair and protection coatings
- Tank lining and coating systems
- Machinery part rebuilding (shafts, housings, casings)
- Anti-fouling coating systems
- Surface preparation and coating specification consultation

---

**Page: `/sandblasting/`**
File: `src/app/sandblasting/page.tsx`
Title: "Sandblasting / Grit Blasting"
Parent: Protective Coatings → `/protective-coatings/`
Overview:
Proper surface preparation is the foundation of any effective coating system. Leon International provides professional sandblasting and grit blasting services that remove rust, old paint, mill scale, and surface contaminants to achieve the specified surface profile required for optimal coating adhesion.

Capabilities:
- Dry sandblasting and grit blasting
- Surface preparation to SA 2.5 and SA 3 standards
- Hull surface preparation for repainting
- Steel structure surface preparation
- Tank interior blasting
- Spot blasting for localized repair areas
- Dust-free blasting for sensitive environments

---

**Page: `/metal-stitching/`**
File: `src/app/metal-stitching/page.tsx`
Title: "Metal Stitching / Metalocking"
Parent: Protective Coatings → `/protective-coatings/`
Overview:
Metal stitching (also known as metalocking) is a cold repair technique for restoring cracked or broken cast iron, steel, and aluminum components without the risks associated with welding — no heat distortion, no metallurgical damage, and no need for pre-heating or post-weld heat treatment.

This method uses precision-machined interlocking pins and keys that are inserted across the crack line, mechanically joining the material and restoring structural integrity. It is ideal for engine blocks, cylinder heads, gearbox casings, and other components where welding is impractical or risky.

Capabilities:
- Cold repair of cracked cast iron components
- Engine block crack repair
- Cylinder head crack repair
- Gearbox and housing crack repair
- Aluminum casting repair
- Restoration of structural integrity without heat
- Pressure-tight repairs for fluid-containing components
- On-site and workshop metalocking services

---

#### HVAC & REFRIGERATION SUB-PAGES:

**Page: `/ac-plant-repair/`**
File: `src/app/ac-plant-repair/page.tsx`
Title: "Air Conditioning Plant Repair"
Parent: HVAC & Refrigeration → `/hvac/`
Overview:
A properly functioning air conditioning system is essential for crew welfare, equipment protection, and maintaining comfortable conditions aboard vessels and in industrial facilities. Leon International provides comprehensive AC plant repair services, from compressor overhauling to complete system diagnostics and Freon gas management.

Capabilities:
- AC plant repair and maintenance
- Compressor overhauling (all types)
- Freon gas refilling and system recharging
- Refrigerant leak detection and repair
- Condenser and evaporator cleaning and repair
- Control system diagnostics and repair
- Ductwork inspection and repair
- Preventive maintenance programs

---

**Page: `/cold-storage-repair/`**
File: `src/app/cold-storage-repair/page.tsx`
Title: "Cold Storage & Refrigeration Repair"
Parent: HVAC & Refrigeration → `/hvac/`
Overview:
Marine refrigeration and cold storage systems require specialized expertise to maintain the precise temperature control needed for cargo preservation, provisions storage, and compliance with health and safety regulations. Leon International services and repairs cold storage compressors, refrigeration systems, and associated controls.

Capabilities:
- Cold storage compressor repair and overhauling
- Refrigeration system cleaning and maintenance
- Freon gas refilling and refrigerant management
- Temperature control system repair and calibration
- Evaporator and condenser maintenance
- Insulation inspection and repair
- Provisions refrigeration system servicing
- Cargo refrigeration container (reefer) support

---

#### SPECIALIZED SERVICES SUB-PAGES:

**Page: `/air-lifting-balloon/`**
File: `src/app/air-lifting-balloon/page.tsx`
Title: "Air Lifting Balloon Services"
Parent: Specialized Services → `/specialized/`
Overview:
Leon International provides air lifting balloon services for marine salvage, recovery, and underwater lifting operations in Karachi waters and surrounding areas. Air lifting balloons offer a safe, controlled method for raising submerged objects, refloating grounded vessels, and supporting underwater construction and maintenance activities.

Capabilities:
- Air lifting balloon recovery operations
- Submerged object salvage and recovery
- Vessel refloating assistance
- Underwater lifting support
- Marine salvage coordination
- Equipment and deployment provided

---

**Page: `/spare-parts-supply/`**
File: `src/app/spare-parts-supply/page.tsx`
Title: "Spare Parts Supply"
Parent: Specialized Services → `/specialized/`
Overview:
Ensuring the availability of the right spare parts at the right time is critical for minimizing vessel downtime and maintaining operational schedules. Leon International operates a global spare parts supply network with sourcing offices in Pakistan, China, Latvia, and the UAE — enabling us to procure and deliver marine and industrial spare parts to any port worldwide.

Our sourcing team maintains direct relationships with OEM manufacturers, authorized distributors, and ship recycling facilities, allowing us to offer genuine, OEM-equivalent, and quality-tested reconditioned parts across every major equipment category. We handle complete logistics including procurement, quality inspection, documentation, packaging in sea-worthy crates, and delivery coordination.

Capabilities:
- Global spare parts sourcing and procurement
- New, reconditioned, and used parts supply
- OEM, genuine, and alternative parts available
- Engine parts for 20+ manufacturers
- Navigational equipment supply (new, used, reconditioned)
- General order supplies and lubricants
- Custom fabrication of obsolete or unavailable parts
- Sea-worthy packaging and worldwide delivery
- Complete customs and shipping documentation

---

**Page: `/custom-parts-fabrication/`**
File: `src/app/custom-parts-fabrication/page.tsx`
Title: "Custom Parts Fabrication"
Parent: Specialized Services → `/specialized/`
Overview:
When a critical part has been discontinued by the manufacturer, is no longer in production, or simply cannot be sourced within your required timeframe, Leon International can fabricate it for you. Our machine shop and fabrication facility can manufacture custom components to exact specifications using precision machining, CNC processes, and skilled manual craftsmanship.

We work from technical drawings, OEM part numbers, sample components, or even detailed descriptions to produce parts that meet the original equipment specifications. This capability has saved countless vessel operators from the expense and delay of international procurement for hard-to-find components.

Capabilities:
- Custom fabrication of discontinued and obsolete parts
- Manufacture from drawings, samples, or specifications
- Precision machining (turning, milling, boring, grinding)
- CNC and manual machining capabilities
- Material sourcing (steel, stainless steel, bronze, aluminum, etc.)
- Quality inspection and dimensional verification
- Reverse engineering from sample components
- Fast turnaround for emergency requirements

---

## PART 3: UPDATE THE SERVICES OVERVIEW PAGE

Update `/services/page.tsx` to show ALL services organized under their parent categories (not just the 8 parent cards). Make it a comprehensive directory:

For each of the 8 categories, show:
- Category card with icon and description (existing)
- Below each card OR on click, show the sub-services as linked items
- Every sub-service links to its dedicated page

---

## PART 4: UPDATE THE 8 PARENT SERVICE PAGES

Each existing parent service page (e.g., `/ship-repair/page.tsx`) should be updated to:
1. Keep all existing content
2. Add a **"Detailed Services"** section that lists and links to all its child service pages
3. Format as cards or styled links with brief descriptions

Example for `/ship-repair/`:
```
## Our Ship Repair Services in Detail

→ Dry Docking & SLTS Services (/dry-docking-slts/)
→ Major Ship Repair Facilities (/major-ship-repair/)
→ Vessel Repair on Outer Anchorage (/vessel-repair-anchorage/)
```

---

## PART 5: SEO METADATA FOR ALL 27 NEW PAGES

Add `metadata` exports to every new page:

| Page | Title Tag |
|------|----------|
| `/dry-docking-slts/` | Dry Docking & SLTS Services · Leon International |
| `/major-ship-repair/` | Major Ship Repair Facilities · Leon International |
| `/vessel-repair-anchorage/` | Vessel Repair on Outer Anchorage · Leon International |
| `/main-engine-generator-repair/` | Main Engine & Generator Repair · Leon International |
| `/boiler-repair/` | Major Repair of Boilers · Leon International |
| `/hydraulic-pump-overhauling/` | Hydraulic Pump Overhauling · Leon International |
| `/windlass-repair/` | Windlass Major Repair · Leon International |
| `/deck-machinery-overhauling/` | Deck Machinery Overhauling · Leon International |
| `/motor-rewinding/` | Industrial Motor Rewinding · Leon International |
| `/pcb-card-repair/` | PCB Card Repair Services · Leon International |
| `/transformer-rewinding/` | Transformer Rewinding · Leon International |
| `/electrical-equipment-repair/` | Electrical Equipment Repair · Leon International |
| `/steel-structure-fabrication/` | Steel Structure Fabrication · Leon International |
| `/welding-services/` | Welding Services (BV Approved) · Leon International |
| `/buoys-fabrication/` | Buoys Fabrication · Leon International |
| `/ultrasonic-gauging/` | Ultrasonic Thickness Gauging · Leon International |
| `/ultrasonic-flaw-detection/` | Ultrasonic Flaw Detection (UFD) · Leon International |
| `/magnetic-particle-inspection/` | Magnetic Particle Inspection · Leon International |
| `/dye-penetrant-testing/` | Dye Penetrant Testing (PT) · Leon International |
| `/hardness-testing/` | Hardness Testing Services · Leon International |
| `/crane-load-test/` | Crane Load Test · Leon International |
| `/crane-inspection/` | Crane Inspection Services · Leon International |
| `/marine-tools-calibration/` | Marine Tools Calibration · Leon International |
| `/hatch-cover-testing/` | Hatch Cover Tightness Testing · Leon International |
| `/gyro-compass-overhauling/` | Gyro Compass Overhauling · Leon International |
| `/industrial-coatings/` | Belzona / Industrial Coatings · Leon International |
| `/sandblasting/` | Sandblasting / Grit Blasting · Leon International |
| `/metal-stitching/` | Metal Stitching / Metalocking · Leon International |
| `/ac-plant-repair/` | AC Plant Repair · Leon International |
| `/cold-storage-repair/` | Cold Storage & Refrigeration Repair · Leon International |
| `/air-lifting-balloon/` | Air Lifting Balloon Services · Leon International |
| `/spare-parts-supply/` | Spare Parts Supply · Leon International |
| `/custom-parts-fabrication/` | Custom Parts Fabrication · Leon International |

---

## EXECUTION ORDER

1. **First:** Build the `ServiceSubPageLayout` reusable component
2. **Second:** Create all 27 service sub-page files using the component
3. **Third:** Update `Header.tsx` — replace the current simple Services dropdown with the full Services mega menu (3-column, with all sub-services). Do NOT touch the existing Products dropdown.
4. **Fourth:** Update `/services/page.tsx` to show all sub-services
5. **Fifth:** Update the 8 parent service pages to link to their children
6. **Sixth:** Add SEO metadata to all 27 new pages
7. **Run `npm run build`** — zero errors

---

## RULES

- All URLs are FLAT with trailing slashes (e.g., `/crane-load-test/` NOT `/services/ndt-inspection/crane-load-test/`)
- Reuse the `ServiceSubPageLayout` component for ALL 27 pages — do NOT create unique layouts for each
- Reuse the existing `PageHero.tsx` component inside `ServiceSubPageLayout`
- Keep Framer Motion animations consistent with existing pages
- Do NOT modify the Homepage content sections — only the Header/navbar mega menu applies globally
- Do NOT modify the Products dropdown/mega menu — it is already done and working
- Do NOT modify any product pages
- Every internal `href` must end with `/`
- The Services mega menu must appear on ALL pages (Homepage included) since the Header is a global component in `layout.tsx`
