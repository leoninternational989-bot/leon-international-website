'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Anchor, Settings, Zap, Drill, Search, PaintBucket, Snowflake, PlusCircle, Database, BatteryCharging, Wind, Gauge, Compass, Plug, Droplets, Flame, ShieldAlert, Navigation, Filter, Factory, Lightbulb, Microscope, PaintRoller, Thermometer, Wrench } from 'lucide-react';

type SubItem = {
    name: string;
    href: string;
    icon?: React.ElementType;
    subItems?: { name: string; href: string; }[];
};

type MenuItem = {
    name: string;
    href: string;
    type?: 'dropdown';
    items?: SubItem[];
};

const servicesMenu: SubItem[] = [
    {
        name: 'Ship Repair & Dry Docking',
        href: '/ship-repair/',
        icon: Anchor,
        subItems: [
            { name: 'Dry Docking & SLTS', href: '/dry-docking-slts/' },
            { name: 'Major Ship Repair', href: '/major-ship-repair/' },
            { name: 'Anchorage Repair', href: '/vessel-repair-anchorage/' },
        ]
    },
    {
        name: 'Mechanical Repair & Engineering',
        href: '/mechanical-repair/',
        icon: Settings,
        subItems: [
            { name: 'Main Engine & Gen. Repair', href: '/main-engine-generator-repair/' },
            { name: 'Boiler Repair', href: '/boiler-repair/' },
            { name: 'Hydraulic Pump Overhaul', href: '/hydraulic-pump-overhauling/' },
            { name: 'Windlass Major Repair', href: '/windlass-repair/' },
            { name: 'Deck Machinery Overhaul', href: '/deck-machinery-overhauling/' },
        ]
    },
    {
        name: 'Electrical & Electronics',
        href: '/electrical/',
        icon: Lightbulb,
        subItems: [
            { name: 'Motor Rewinding', href: '/motor-rewinding/' },
            { name: 'PCB Card Repair', href: '/pcb-card-repair/' },
            { name: 'Transformer Rewinding', href: '/transformer-rewinding/' },
            { name: 'Equipment Repair', href: '/electrical-equipment-repair/' },
        ]
    },
    {
        name: 'Fabrication & Welding',
        href: '/fabrication/',
        icon: Flame,
        subItems: [
            { name: 'Steel Structure Fab.', href: '/steel-structure-fabrication/' },
            { name: 'Welding (BV Approved)', href: '/welding-services/' },
            { name: 'Buoys Fabrication', href: '/buoys-fabrication/' },
        ]
    },
    {
        name: 'NDT & Inspection',
        href: '/ndt-inspection/',
        icon: Microscope,
        subItems: [
            { name: 'Ultrasonic Gauging', href: '/ultrasonic-gauging/' },
            { name: 'UFD Testing', href: '/ultrasonic-flaw-detection/' },
            { name: 'Magnetic Particle', href: '/magnetic-particle-inspection/' },
            { name: 'Dye Penetrant', href: '/dye-penetrant-testing/' },
            { name: 'Hardness Testing', href: '/hardness-testing/' },
            { name: 'Crane Load Test', href: '/crane-load-test/' },
            { name: 'Crane Inspection', href: '/crane-inspection/' },
            { name: 'Tools Calibration', href: '/marine-tools-calibration/' },
            { name: 'Hatch Cover Test', href: '/hatch-cover-testing/' },
            { name: 'Gyro Compass', href: '/gyro-compass-overhauling/' },
        ]
    },
    {
        name: 'Protective Coatings',
        href: '/protective-coatings/',
        icon: PaintRoller,
        subItems: [
            { name: 'Belzona / Coatings', href: '/industrial-coatings/' },
            { name: 'Sandblasting', href: '/sandblasting/' },
            { name: 'Metal Stitching', href: '/metal-stitching/' },
        ]
    },
    {
        name: 'HVAC & Refrigeration',
        href: '/hvac/',
        icon: Thermometer,
        subItems: [
            { name: 'AC Plant Repair', href: '/ac-plant-repair/' },
            { name: 'Cold Storage Repair', href: '/cold-storage-repair/' },
        ]
    },
    {
        name: 'Specialized Services',
        href: '/specialized/',
        icon: Wrench,
        subItems: [
            { name: 'Air Lifting Balloon', href: '/air-lifting-balloon/' },
            { name: 'Spare Parts Supply', href: '/spare-parts-supply/' },
            { name: 'Custom Parts Fab.', href: '/custom-parts-fabrication/' },
        ]
    },
];

const productsMenu: SubItem[] = [
    {
        name: 'Engine Parts',
        href: '/engine-parts/',
        icon: Settings,
        subItems: [
            { name: 'MTU Parts', href: '/mtu-parts/' },
            { name: 'MAN Parts', href: '/man-parts/' },
            { name: 'Cummins Parts', href: '/cummins-parts/' },
            { name: 'Caterpillar Parts', href: '/caterpillar-parts/' },
            { name: 'Volvo Penta Parts', href: '/volvo-penta-parts/' },
            { name: 'DEUTZ Parts', href: '/deutz-parts/' },
            { name: 'Perkins Parts', href: '/perkins-parts/' },
            { name: 'MWM Parts', href: '/mwm-parts/' },
            { name: 'Waukesha Parts', href: '/waukesha-parts/' },
        ]
    },
    { name: 'Main Engine Spares', href: '/main-engine-spares/', icon: Database },
    { name: 'Auxiliary Engines', href: '/auxiliary-engines/', icon: Zap },
    { name: 'Diesel Generators', href: '/diesel-generators/', icon: BatteryCharging },
    { name: 'Turbocharger Spares', href: '/turbocharger-spares/', icon: Wind },
    { name: 'Air Compressors', href: '/air-compressors/', icon: Gauge },
    { name: 'Navigation Systems', href: '/navigation-systems/', icon: Compass },
    { name: 'Electrical Equipment', href: '/electrical-equipment/', icon: Plug },
    { name: 'Hydraulic Equipment', href: '/hydraulic-equipment/', icon: Droplets },
    { name: 'Petroleum Equipment', href: '/petroleum-equipment/', icon: Flame },
    { name: 'Explosion-Proof Equipment', href: '/explosion-proof/', icon: ShieldAlert },
    { name: 'Propulsion Systems', href: '/propulsion-systems/', icon: Navigation },
    { name: 'Deck Machinery', href: '/deck-machinery/', icon: Anchor },
    { name: 'Purifiers / Oil Separators', href: '/purifiers/', icon: Filter },
    { name: 'Power Plant Equipment', href: '/power-plant/', icon: Factory },
];

const navigation: MenuItem[] = [
    { name: 'About Us', href: '/about/' },
    { name: 'Services', href: '/services/', type: 'dropdown', items: servicesMenu },
    { name: 'Products', href: '/products/', type: 'dropdown', items: productsMenu },
    { name: 'Projects', href: '/projects/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'Contact', href: '/contact/' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = (name: string) => {
        setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary-950/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
                }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <span className="sr-only">Leon International</span>
                        <div className="h-8 w-8 bg-accent-500 rounded flex items-center justify-center font-bold text-white">L</div>
                        <span className="text-xl font-bold tracking-tight text-white uppercase drop-shadow-sm">Leon International</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden lg:flex lg:gap-x-8 items-center h-full">
                    {navigation.map((item) => (
                        item.type === 'dropdown' ? (
                            <div key={item.name} className="group/main relative h-full flex items-center">
                                <Link href={item.href} className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-200 hover:text-accent-200 transition-colors py-2">
                                    {item.name}
                                    <ChevronDown className="h-4 w-4 transition-transform group-hover/main:rotate-180" />
                                </Link>

                                {item.name === 'Products' ? (
                                    /* Mega Menu for Products */
                                    <div className="absolute left-1/2 -translate-x-[40%] top-10 pt-2 hidden group-hover/main:block z-50">
                                        <div className="w-[850px] p-6 bg-primary-950/95 backdrop-blur-lg border border-white/10 shadow-2xl rounded-xl flex gap-6">
                                            {/* Column 1: Engine Parts + sub items */}
                                            <div className="w-[30%] border-r border-white/10 pr-6">
                                                <Link href="/engine-parts/" className="flex items-center gap-2 text-accent-500 hover:text-accent-400 font-bold mb-4 font-plus-jakarta-sans text-lg transition-colors">
                                                    <Settings className="h-5 w-5" />
                                                    Engine Parts
                                                </Link>
                                                <div className="flex flex-col gap-3">
                                                    {productsMenu[0].subItems?.map(sub => (
                                                        <Link key={sub.name} href={sub.href} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Column 2 & 3: Other Products in 2-column grid */}
                                            <div className="w-[70%]">
                                                <h3 className="text-white font-bold mb-4 font-plus-jakarta-sans text-lg px-2">Other Categories</h3>
                                                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                                    {productsMenu.slice(1).map(prod => (
                                                        <Link key={prod.name} href={prod.href} className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-lg text-gray-200 hover:text-accent-200 transition-colors group">
                                                            {prod.icon && <prod.icon className="h-4 w-4 text-ocean flex-shrink-0 group-hover:text-accent-500 transition-colors" />}
                                                            <span className="text-sm font-medium">{prod.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : item.name === 'Services' ? (
                                    /* Mega Menu for Services */
                                    <div className="absolute left-1/2 -translate-x-[60%] top-10 pt-2 hidden group-hover/main:block z-50">
                                        <div className="w-[1000px] p-6 bg-primary-950/95 backdrop-blur-lg border border-white/10 shadow-2xl rounded-xl">
                                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                                                <h3 className="text-white font-bold font-plus-jakarta-sans text-xl">Our Services</h3>
                                                <Link href="/services/" className="text-accent-500 hover:text-accent-400 text-sm font-medium flex items-center gap-1 transition-colors">
                                                    View All Services <span className="text-lg leading-none">→</span>
                                                </Link>
                                            </div>

                                            <div className="grid grid-cols-3 gap-x-8 gap-y-0">
                                                {/* Column 1 */}
                                                <div className="flex flex-col gap-6">
                                                    {/* Ship Repair & Dry Docking */}
                                                    <div>
                                                        <Link href="/ship-repair/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <Anchor className="h-4 w-4" /> Ship Repair
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            <Link href="/dry-docking-slts/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Dry Docking & SLTS</Link>
                                                            <Link href="/major-ship-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Major Ship Repair</Link>
                                                            <Link href="/vessel-repair-anchorage/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Anchorage Repair</Link>
                                                        </div>
                                                    </div>

                                                    {/* Fabrication & Welding */}
                                                    <div>
                                                        <Link href="/fabrication/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <Flame className="h-4 w-4" /> Fabrication & Welding
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            <Link href="/steel-structure-fabrication/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Steel Structure Fab.</Link>
                                                            <Link href="/welding-services/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Welding (BV Approved)</Link>
                                                            <Link href="/buoys-fabrication/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Buoys Fabrication</Link>
                                                        </div>
                                                    </div>

                                                    {/* Electrical & Electronics */}
                                                    <div>
                                                        <Link href="/electrical/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <Lightbulb className="h-4 w-4" /> Electrical / Electronics
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            <Link href="/motor-rewinding/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Motor Rewinding</Link>
                                                            <Link href="/pcb-card-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">PCB Card Repair</Link>
                                                            <Link href="/transformer-rewinding/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Transformer Rewinding</Link>
                                                            <Link href="/electrical-equipment-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Equipment Repair</Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Column 2 */}
                                                <div className="flex flex-col gap-6">
                                                    {/* Mechanical Repair */}
                                                    <div>
                                                        <Link href="/mechanical-repair/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <Settings className="h-4 w-4" /> Mechanical Repair
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            <Link href="/main-engine-generator-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Main Engine & Gen. Repair</Link>
                                                            <Link href="/boiler-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Boiler Repair</Link>
                                                            <Link href="/hydraulic-pump-overhauling/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Hydraulic Pump Overhaul</Link>
                                                            <Link href="/windlass-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Windlass Major Repair</Link>
                                                            <Link href="/deck-machinery-overhauling/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Deck Machinery Overhaul</Link>
                                                        </div>
                                                    </div>

                                                    {/* NDT & Inspection */}
                                                    <div>
                                                        <Link href="/ndt-inspection/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <Microscope className="h-4 w-4" /> NDT & Inspection
                                                        </Link>
                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                            <Link href="/ultrasonic-gauging/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Ultrasonic Gauging</Link>
                                                            <Link href="/ultrasonic-flaw-detection/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">UFD Testing</Link>
                                                            <Link href="/magnetic-particle-inspection/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Magnetic Particle</Link>
                                                            <Link href="/dye-penetrant-testing/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Dye Penetrant</Link>
                                                            <Link href="/hardness-testing/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Hardness Testing</Link>
                                                            <Link href="/crane-load-test/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Crane Load Test</Link>
                                                            <Link href="/crane-inspection/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Crane Inspection</Link>
                                                            <Link href="/marine-tools-calibration/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Tools Calibration</Link>
                                                            <Link href="/hatch-cover-testing/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Hatch Cover Test</Link>
                                                            <Link href="/gyro-compass-overhauling/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Gyro Compass</Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Column 3 */}
                                                <div className="flex flex-col gap-6">
                                                    <div>
                                                        <Link href="/protective-coatings/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <PaintRoller className="h-4 w-4" /> Protective Coatings
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            <Link href="/industrial-coatings/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Belzona / Coatings</Link>
                                                            <Link href="/sandblasting/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Sandblasting</Link>
                                                            <Link href="/metal-stitching/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Metal Stitching</Link>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Link href="/hvac/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <Thermometer className="h-4 w-4" /> HVAC & Refrigeration
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            <Link href="/ac-plant-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">AC Plant Repair</Link>
                                                            <Link href="/cold-storage-repair/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Cold Storage Repair</Link>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Link href="/specialized/" className="flex items-center gap-2 text-ocean hover:text-accent-400 font-bold mb-3 transition-colors">
                                                            <Wrench className="h-4 w-4" /> Specialized Services
                                                        </Link>
                                                        <div className="flex flex-col gap-2">
                                                            <Link href="/air-lifting-balloon/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Air Lifting Balloon</Link>
                                                            <Link href="/spare-parts-supply/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Spare Parts Supply</Link>
                                                            <Link href="/custom-parts-fabrication/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent-500 before:rounded-full">Custom Parts Fab.</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Standard Dropdown */
                                    <div className="absolute left-0 top-10 pt-2 hidden group-hover/main:block z-50">
                                        <div className="w-80 max-h-[75vh] overflow-y-auto bg-primary-950/95 backdrop-blur-lg border border-white/10 shadow-2xl rounded-xl py-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                                            {item.items?.map((subItem, idx) => (
                                                <Link key={idx} href={subItem.href} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 text-gray-200 hover:text-accent-200 text-sm transition-colors group">
                                                    {subItem.icon && <subItem.icon className="h-4 w-4 opacity-70 text-ocean group-hover:text-accent-500 group-hover:opacity-100 transition-colors flex-shrink-0" />}
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-200 hover:text-accent-200 transition-colors py-2 drop-shadow-sm">
                                {item.name}
                            </Link>
                        )
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/quote/"
                        className="text-sm font-semibold leading-6 bg-accent-500 hover:bg-accent-400 text-white px-6 py-2.5 rounded-md transition-colors shadow-lg"
                    >
                        Request a Quote
                    </Link>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-950 px-6 py-6 sm:max-w-sm shadow-2xl">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Leon International</span>
                            <div className="h-8 w-8 bg-accent-500 rounded flex items-center justify-center font-bold text-white">L</div>
                            <span className="text-xl font-bold tracking-tight text-white uppercase">Leon Int.</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    item.type === 'dropdown' && item.items ? (
                                        <div key={item.name}>
                                            <button
                                                onClick={() => toggleMenu(item.name)}
                                                className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-primary-900 hover:text-accent-200 transition-colors"
                                            >
                                                {item.name}
                                                <ChevronDown className={`h-5 w-5 transition-transform ${openMenus[item.name] ? 'rotate-180' : ''}`} />
                                            </button>

                                            {openMenus[item.name] && (
                                                <div className="ml-4 pl-2 border-l border-white/10 mt-2 space-y-1">
                                                    {item.items.map(sub => (
                                                        <div key={sub.name}>
                                                            {sub.subItems ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => toggleMenu(sub.name)}
                                                                        className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium leading-6 text-gray-300 hover:bg-primary-900 transition-colors"
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            {sub.icon && <sub.icon className="h-4 w-4 text-ocean" />}
                                                                            {sub.name}
                                                                        </div>
                                                                        <ChevronDown className={`h-4 w-4 transition-transform ${openMenus[sub.name] ? 'rotate-180' : ''}`} />
                                                                    </button>
                                                                    {openMenus[sub.name] && (
                                                                        <div className="ml-6 pl-2 border-l border-white/5 mt-1 space-y-1">
                                                                            {sub.subItems.map(child => (
                                                                                <Link
                                                                                    key={child.name}
                                                                                    href={child.href}
                                                                                    className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-primary-800 transition-colors"
                                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                                >
                                                                                    {child.name}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <Link
                                                                    href={sub.href}
                                                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium leading-6 text-gray-300 hover:bg-primary-900 transition-colors flex-shrink-0"
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    {sub.icon && <sub.icon className="h-4 w-4 text-ocean flex-shrink-0" />}
                                                                    {sub.name}
                                                                </Link>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-primary-900 hover:text-accent-200 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="/quote/"
                                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-white bg-accent-500 hover:bg-accent-400 text-center transition-colors shadow-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Request a Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
