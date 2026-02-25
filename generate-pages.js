const fs = require('fs');
const path = require('path');

const pages = [
    // 8 Parent Services
    { slug: 'ship-repair', title: 'Ship Repair & Dry Docking Services', desc: 'Expert ship repair, dry docking, and anchorage repair services globally by Leon International.', type: 'service' },
    { slug: 'mechanical-repair', title: 'Mechanical Repair & Engine Overhaul', desc: 'Comprehensive mechanical repairs including main engine overhauls, boiler repairs, and hydraulic systems.', type: 'service' },
    { slug: 'electrical', title: 'Marine Electrical & Electronics Services', desc: 'Specialized motor rewinding, PCB card repair, and transformer services for maritime vessels.', type: 'service' },
    { slug: 'fabrication', title: 'Steel Fabrication & Welding', desc: 'BV-approved welding, steel structure fabrication, and custom buoy building by certified professionals.', type: 'service' },
    { slug: 'ndt-inspection', title: 'NDT Inspection & Calibration Services', desc: 'Advanced non-destructive testing including ultrasonic gauging, MPI, and crane load testing.', type: 'service' },
    { slug: 'protective-coatings', title: 'Marine Protective Coatings & Sandblasting', desc: 'Industrial coatings, sandblasting, and Belzona applications to protect vessel structures from corrosion.', type: 'service' },
    { slug: 'hvac', title: 'Marine HVAC & Refrigeration Solutions', desc: 'Installation and repair of marine AC plants and cold storage refrigeration systems.', type: 'service' },
    { slug: 'specialized', title: 'Specialized Marine Services', desc: 'Unique maritime solutions including air lifting balloon services and urgent spare parts supply.', type: 'service' },

    // 27 Sub-Services
    { slug: 'dry-docking-slts', title: 'Dry Docking & SLTS Services', desc: 'Professional dry docking management and SLTS execution for all vessel types.', type: 'service' },
    { slug: 'major-ship-repair', title: 'Major Ship Repair Projects', desc: 'Extensive structural and mechanical ship repair projects undertaken globally.', type: 'service' },
    { slug: 'vessel-repair-anchorage', title: 'Vessel Repair at Anchorage', desc: 'Fast-response afloat repair services performed at anchorage.', type: 'service' },
    { slug: 'main-engine-generator-repair', title: 'Main Engine & Generator Overhaul', desc: 'Complete teardown and repair of marine two-stroke and four-stroke engines.', type: 'service' },
    { slug: 'boiler-repair', title: 'Marine Boiler Repair Services', desc: 'Retubing, casing repairs, and complete overhauls for marine boiler systems.', type: 'service' },
    { slug: 'hydraulic-pump-overhauling', title: 'Hydraulic Pump & System Overhaul', desc: 'Testing, repair, and parts replacement for complex marine hydraulic systems.', type: 'service' },
    { slug: 'windlass-repair', title: 'Windlass & Mooring Winch Repair', desc: 'Maintenance and overhaul of deck windlass and heavy mooring equipment.', type: 'service' },
    { slug: 'deck-machinery-overhauling', title: 'Deck Machinery Overhauling', desc: 'Complete mechanical services for diverse deck machinery systems.', type: 'service' },
    { slug: 'motor-rewinding', title: 'Electric Motor Rewinding', desc: 'Precision AC/DC motor rewinding and testing services.', type: 'service' },
    { slug: 'pcb-card-repair', title: 'Marine PCB Card Repair', desc: 'Component-level diagnosis and repair of marine printed circuit boards.', type: 'service' },
    { slug: 'transformer-rewinding', title: 'Transformer Rewinding Services', desc: 'Specialized repair and rewinding of marine high-voltage transformers.', type: 'service' },
    { slug: 'electrical-equipment-repair', title: 'Electrical Equipment Repair', desc: 'Troubleshooting and fixing various marine electrical panels and equipment.', type: 'service' },
    { slug: 'steel-structure-fabrication', title: 'Steel Structure Fabrication', desc: 'Heavy steel renewal, pipe replacement, and custom marine structural fabrication.', type: 'service' },
    { slug: 'welding-services', title: 'Approved Marine Welding Services', desc: 'Class-approved welding solutions by certified technicians.', type: 'service' },
    { slug: 'buoys-fabrication', title: 'Custom Buoys Fabrication', desc: 'Design and construction of heavy-duty mooring and navigation buoys.', type: 'service' },
    { slug: 'ultrasonic-gauging', title: 'Ultrasonic Thickness Gauging (UTG)', desc: 'Class-approved ultrasonic thickness measurements for vessel hulls and tanks.', type: 'service' },
    { slug: 'ultrasonic-flaw-detection', title: 'Ultrasonic Flaw Detection (UFD)', desc: 'Detecting sub-surface cracks and welding defects using advanced UFD equipment.', type: 'service' },
    { slug: 'magnetic-particle-inspection', title: 'Magnetic Particle Inspection (MPI)', desc: 'Surface defect detection using magnetic particle testing methods.', type: 'service' },
    { slug: 'dye-penetrant-testing', title: 'Dye Penetrant / Liquid Penetrant Testing', desc: 'Non-destructive testing for surface-breaking defects in non-porous materials.', type: 'service' },
    { slug: 'hardness-testing', title: 'Metal Hardness Testing', desc: 'Vickers, Brinell, and Rockwell hardness testing for marine components.', type: 'service' },
    { slug: 'crane-load-test', title: 'Marine Crane Load Testing', desc: 'Water bag load testing for cargo cranes, davits, and lifting equipment.', type: 'service' },
    { slug: 'crane-inspection', title: 'Comprehensive Crane Inspection', desc: 'Visual and mechanical inspection of marine hoisting equipment.', type: 'service' },
    { slug: 'marine-tools-calibration', title: 'Marine Tools & Equipment Calibration', desc: 'Certified calibration for pressure, temperature, and electrical measuring instruments.', type: 'service' },
    { slug: 'hatch-cover-testing', title: 'Hatch Cover Ultrasonic Testing', desc: 'Verifying cargo hold weather-tightness using advanced ultrasonic tools.', type: 'service' },
    { slug: 'gyro-compass-overhauling', title: 'Gyro Compass Maintenance', desc: 'Overhauling and calibration of marine gyro compass systems.', type: 'service' },
    { slug: 'industrial-coatings', title: 'Belzona & Industrial Coatings', desc: 'Application of high-performance epoxy and protective Belzona compounds.', type: 'service' },
    { slug: 'sandblasting', title: 'Marine Sandblasting & Surface Prep', desc: 'Grit and hydro blasting to prepare hull surfaces for painting.', type: 'service' },
    { slug: 'metal-stitching', title: 'Cold Metal Stitching', desc: 'Repairing cracked or broken cast iron engine blocks without heat.', type: 'service' },
    { slug: 'ac-plant-repair', title: 'Marine AC Plant Repair', desc: 'Compressor overhaul and refrigerant management for central AC plants.', type: 'service' },
    { slug: 'cold-storage-repair', title: 'Cold Storage Refrigeration Service', desc: 'Ensuring reliable operation of provision room cooling systems.', type: 'service' },
    { slug: 'air-lifting-balloon', title: 'Air Lifting Balloon Services', desc: 'Underwater salvage and buoyancy support using heavy-duty lifting balloons.', type: 'service' },
    { slug: 'spare-parts-supply', title: 'Urgent Marine Spare Parts Supply', desc: 'Global sourcing and delivery of critical OEM and aftermarket marine spares.', type: 'service' },
    { slug: 'custom-parts-fabrication', title: 'Custom Spare Parts Fabrication', desc: 'Reverse engineering and machining of obsolete mechanical components.', type: 'service' },

    // 15 Product Categories
    { slug: 'engine-parts', title: 'Marine Engine Parts — OEM & Aftermarket', desc: 'Pistons, liners, rings, bearings, and valves for all major 2-stroke and 4-stroke engines.', type: 'product' },
    { slug: 'main-engine-spares', title: 'Main Engine Spare Parts', desc: 'Critical spares for heavy propulsion marine diesel engines.', type: 'product' },
    { slug: 'auxiliary-engines', title: 'Auxiliary Engine Spares', desc: 'Parts for marine generator sets covering all leading brands.', type: 'product' },
    { slug: 'diesel-generators', title: 'Marine Diesel Generators', desc: 'Complete gensets and replacement parts for reliable onboard power.', type: 'product' },
    { slug: 'turbocharger-spares', title: 'Turbocharger Repair & Spares', desc: 'Cartridges, bearings, and rotors for ABB, MET, and Napier turbochargers.', type: 'product' },
    { slug: 'air-compressors', title: 'Marine Air Compressors & Spares', desc: 'Starting air, working air compressor blocks, and overhaul kits.', type: 'product' },
    { slug: 'navigation-systems', title: 'Navigation & Communication Systems', desc: 'Radars, ECDIS, VHF, and GMDSS equipment for safe vessel operation.', type: 'product' },
    { slug: 'electrical-equipment', title: 'Marine Electrical Equipment', desc: 'Switches, breakers, sensors, and full automation system components.', type: 'product' },
    { slug: 'hydraulic-equipment', title: 'Marine Hydraulic Parts', desc: 'Motors, pumps, valves, and seal kits for heavy-duty marine hydraulics.', type: 'product' },
    { slug: 'petroleum-equipment', title: 'Petroleum & Oilfield Equipment', desc: 'Specialized fittings, hoses, and measurement tools for oil handling.', type: 'product' },
    { slug: 'explosion-proof', title: 'Explosion-Proof (Ex) Equipment', desc: 'ATEX-certified lighting and electrical fittings for hazardous areas.', type: 'product' },
    { slug: 'propulsion-systems', title: 'Propulsion Systems & Shafts', desc: 'Propellers, stern tubes, and bow thruster components.', type: 'product' },
    { slug: 'deck-machinery', title: 'Deck Machinery & Winch Spares', desc: 'Motors, brakes, and control blocks for winches and windlasses.', type: 'product' },
    { slug: 'purifiers', title: 'Oil Purifiers & Separators', desc: 'Bowls, discs, and service kits for Alfa Laval and Westfalia separators.', type: 'product' },
    { slug: 'power-plant', title: 'Power Plant Equipment Supply', desc: 'Industrial-grade generators and heavy mechanical components for land-based power.', type: 'product' },

    // 9 Brands
    { slug: 'mtu-parts', title: 'MTU Engine Parts & Spares', desc: 'Genuine and OEM replacement parts for MTU marine diesel engines.', type: 'brand' },
    { slug: 'man-parts', title: 'MAN B&W Engine Spare Parts', desc: 'High-quality spares for MAN two-stroke and four-stroke marine engines.', type: 'brand' },
    { slug: 'cummins-parts', title: 'Cummins Marine Engine Parts', desc: 'Reliable parts supply for Cummins KTA, NTA, and QSK series engines.', type: 'brand' },
    { slug: 'caterpillar-parts', title: 'Caterpillar (CAT) Marine Parts', desc: 'Fast delivery of parts for CAT 3400, 3500, and C-series engines.', type: 'brand' },
    { slug: 'volvo-penta-parts', title: 'Volvo Penta Engine Spares', desc: 'Filters, belts, and major overhaul components for Volvo Penta.', type: 'brand' },
    { slug: 'deutz-parts', title: 'DEUTZ Marine Engine Parts', desc: 'Specialized parts distributor for DEUTZ legacy and modern engines.', type: 'brand' },
    { slug: 'perkins-parts', title: 'Perkins Marine Engines & Spares', desc: 'Complete range of spares for Perkins auxiliary marine engines.', type: 'brand' },
    { slug: 'mwm-parts', title: 'MWM Engine Replacement Parts', desc: 'Sourcing OEM-quality parts for MWM gas and diesel engines.', type: 'brand' },
    { slug: 'waukesha-parts', title: 'Waukesha Engine Components', desc: 'Heavy-duty parts supply for Waukesha industrial and marine applications.', type: 'brand' },
];

pages.forEach(page => {
    const dirPath = path.join(__dirname, 'src', 'app', page.slug);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const pagePath = path.join(dirPath, 'page.tsx');
    const shortTitle = page.title.split('—')[0].trim();

    let faqQuestions = [];
    if (page.type === 'service') {
        faqQuestions = [
            { q: `What ${shortTitle.toLowerCase()} does Leon International offer?`, a: `Leon International provides comprehensive ${shortTitle.toLowerCase()} for marine vessels and industrial clients at Karachi Port, Bin Qasim anchorage, and worldwide.` },
            { q: `Does Leon International provide emergency ${shortTitle.toLowerCase()}?`, a: "Yes, we offer 24/7 rapid response for emergency marine repairs and services." },
            { q: "Are your technicians certified?", a: "Yes, our engineers and technicians are highly experienced and hold necessary class approvals (including BV, LR) for specialized marine engineering tasks." }
        ];
    } else {
        faqQuestions = [
            { q: `What ${shortTitle.toLowerCase()} does Leon International supply?`, a: `Leon International supplies high-quality OEM and aftermarket ${shortTitle.toLowerCase()} for marine engines and industrial applications, serving vessels globally.` },
            { q: `Are the ${shortTitle.toLowerCase()} OEM or aftermarket?`, a: "We supply both Genuine/OEM parts and high-quality European/Japanese aftermarket equivalents depending on client budgets and requirements." },
            { q: "How quickly can you deliver marine spare parts?", a: "With stock at key locations and a global logistics network, we ensure rapid dispatch of critical parts to minimize vessel downtime." }
        ];
    }

    const breadcrumbParent = page.type === 'service' ? 'Services' : 'Products';
    const breadcrumbHref = page.type === 'service' ? '/services/' : '/products/';

    const content = `import PageHero from '@/components/ui/PageHero';
import QuickQuote from '@/components/sections/home/QuickQuote';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Page() {
    return (
        <main className="bg-primary-950 min-h-screen">
            <PageHero
                title="${page.title}"
                subtitle="${page.desc}"
                breadcrumbs={[
                    { label: '${breadcrumbParent}', href: '${breadcrumbHref}' },
                    { label: '${shortTitle}', href: '/${page.slug}/' }
                ]}
            />

            <section className="py-20 lg:py-28 relative z-10 w-full min-w-full m-0 p-0 border-0 outline-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-plus-jakarta-sans">
                                About Our ${shortTitle}
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                ${page.desc} Leon International is a leading marine engineering company with over 50 years of experience. We provide class-approved solutions to ship owners, managers, and offshore industrial operators worldwide from our headquarters in Karachi, and offices in UAE, China, and Latvia.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Our highly trained technicians and marine engineers ensure that every project meets the highest international maritime standards. Whether it's emergency response at anchorage or routine maintenance, you can rely on our expertise.
                            </p>
                            
                            <h3 className="text-xl font-bold text-white mb-4">Why Choose Leon International?</h3>
                            <ul className="space-y-4 mb-8">
                                {[
                                    '50+ Years Maritime Experience',
                                    '24/7 Fast Response Teams',
                                    'ISO 9001:2008 & BV Certified',
                                    'Global Supply Chain & Logistics'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 hidden sm:block" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/quote/" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Request a Quote <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        
                        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 mx-auto w-full">
                            {/* Standardizing the image across all for now */}
                            <Image 
                                src="https://images.unsplash.com/photo-1542317148-8bdfbc8cb8c9?q=80&w=1200"
                                alt="${shortTitle} performed by Leon International Marine Engineers"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-24 pt-16 border-t border-white/10 w-full">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center font-plus-jakarta-sans">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto space-y-6">
                            ${faqQuestions.map(faq => `
                            <div className="bg-primary-900/50 p-6 rounded-xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-3">${faq.q}</h3>
                                <p className="text-gray-300">${faq.a}</p>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>

            <QuickQuote />
        </main>
    );
}
`;

    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Generated page.tsx for ${page.slug}`);
});
