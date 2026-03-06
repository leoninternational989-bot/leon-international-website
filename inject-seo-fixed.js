const fs = require('fs');
const path = require('path');

const pageData = [
    {
        path: 'src/app/ship-repair/page.tsx',
        title: 'Ship Repair & Dry Docking',
        slug: '/ship-repair/',
        faqs: [
            { question: "What types of vessels can Leon International repair at Karachi Port?", answer: "We service vessels of all sizes including bulk carriers, tankers, container ships, tugboats, barges, and offshore vessels at Karachi Port and Port Bin Qasim." },
            { question: "Do you offer emergency ship repair at anchorage?", answer: "Yes, we provide 24/7 emergency repair services at anchorage with rapid mobilization capability. Our teams can be deployed within hours for urgent repairs." },
            { question: "What classification societies approve your ship repair work?", answer: "Our work is approved by Lloyd's Register, Bureau Veritas, DNV, ABS, and ClassNK. All repairs meet internationally recognized classification standards." }
        ]
    },
    {
        path: 'src/app/mechanical-repair/page.tsx',
        title: 'Mechanical Repair',
        slug: '/mechanical-repair/',
        faqs: [
            { question: "Which engine brands do you service?", answer: "We cover 20+ brands including MAN B&W, Wartsila, Cummins, Caterpillar, MTU, Volvo Penta, Yanmar, Daihatsu, DEUTZ, Perkins, and more." },
            { question: "Can you overhaul a complete main engine?", answer: "Yes, we perform complete main engine overhauling including crankshaft grinding, cylinder liner replacement, piston reconditioning, and full reassembly with testing." },
            { question: "Do you provide hydraulic pump repair services?", answer: "Yes, we offer comprehensive hydraulic pump overhauling, testing, and reconditioning for all major marine hydraulic systems and deck machinery." }
        ]
    },
    {
        path: 'src/app/electrical/page.tsx',
        title: 'Electrical & Automation',
        slug: '/electrical/',
        faqs: [
            { question: "What types of marine motors can you rewind?", answer: "We rewind AC and DC motors of all sizes for marine and industrial applications, including main propulsion motors, pump motors, and auxiliary motors." },
            { question: "Do you repair PCB cards and electronic boards?", answer: "Yes, our electronics team specializes in PCB card repair, component-level troubleshooting, and replacement for marine navigation and control systems." },
            { question: "Can you overhaul gyro compass systems?", answer: "Yes, we provide complete gyro compass overhauling, calibration, and servicing for all major manufacturers." }
        ]
    },
    {
        path: 'src/app/fabrication/page.tsx',
        title: 'Fabrication & Welding',
        slug: '/fabrication/',
        faqs: [
            { question: "Are your welders certified by classification societies?", answer: "Yes, our welders are Bureau Veritas (BV) approved and certified for all types of marine welding including structural steel, pipe works, and hull repairs." },
            { question: "Can you fabricate custom replacement parts for obsolete equipment?", answer: "Yes, we specialize in custom fabrication of discontinued and obsolete parts, manufactured to exact OEM specifications to get your operations back online." },
            { question: "What types of steel fabrication do you offer?", answer: "We handle steel structures, hull repair, pipe fabrication, buoys, pontoons, and all types of custom marine and industrial steel work." }
        ]
    },
    {
        path: 'src/app/ndt-inspection/page.tsx',
        title: 'NDT Inspection',
        slug: '/ndt-inspection/',
        faqs: [
            { question: "What NDT methods do you offer for marine inspection?", answer: "We perform ultrasonic thickness gauging, ultrasonic flaw detection, magnetic particle inspection (MPI), dye penetrant testing (DPT), and hardness testing." },
            { question: "Do you provide crane load testing and certification?", answer: "Yes, we perform marine crane load testing, proof load testing, and provide certification in compliance with classification society requirements." },
            { question: "Can you perform hatch cover testing on vessels?", answer: "Yes, we conduct ultrasonic hatch cover testing to check weathertightness and structural integrity, meeting international maritime safety standards." }
        ]
    },
    {
        path: 'src/app/protective-coatings/page.tsx',
        title: 'Protective Coatings',
        slug: '/protective-coatings/',
        faqs: [
            { question: "What types of protective coatings do you apply?", answer: "We apply industrial protective coatings, Belzona applications, epoxy coatings, anti-corrosion treatments, and specialized marine-grade coatings for hull and deck protection." },
            { question: "Do you offer sandblasting and surface preparation?", answer: "Yes, we provide sandblasting, grit blasting, and comprehensive surface preparation services to ensure proper coating adhesion and long-lasting protection." },
            { question: "Do your coatings meet international maritime standards?", answer: "Yes, all our coating solutions meet international maritime standards and are approved for use by major classification societies." }
        ]
    },
    {
        path: 'src/app/hvac/page.tsx',
        title: 'HVAC & Refrigeration',
        slug: '/hvac/',
        faqs: [
            { question: "Can you repair marine air conditioning plant systems?", answer: "Yes, we service and repair complete marine AC plants including compressors, condensers, evaporators, and control systems for vessels of all sizes." },
            { question: "Do you handle cold storage and refrigeration on ships?", answer: "Yes, we provide complete cold storage system maintenance, refrigerant gas servicing, and compressor overhauling for marine refrigeration systems." },
            { question: "Do you service Freon-based systems?", answer: "Yes, we handle Freon gas charging, leak detection, and system servicing in compliance with current environmental regulations." }
        ]
    },
    {
        path: 'src/app/specialized/page.tsx',
        title: 'Specialized Services',
        slug: '/specialized/',
        faqs: [
            { question: "What specialized marine services does Leon International offer?", answer: "We provide tools calibration, gyro compass servicing, marine instruments testing, load testing, and comprehensive vessel inspection services." },
            { question: "Do you calibrate marine measurement tools and instruments?", answer: "Yes, we offer professional calibration services for marine tools, gauges, and measurement instruments to ensure accuracy and compliance with standards." },
            { question: "Can you service navigation equipment onboard vessels?", answer: "Yes, our technicians service radar systems, GPS equipment, echo sounders, and other navigation electronics from major manufacturers." }
        ]
    }
];

pageData.forEach(item => {
    const fullPath = path.join(__dirname, item.path);
    if (!fs.existsSync(fullPath)) {
        console.log(`WARN: File not found: ${fullPath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Remove old FaqAccordion import
    content = content.replace(/import FaqAccordion from '@\/components\/ui\/FaqAccordion';\n?/g, '');

    // 2. Add New Imports at the top (after last import)
    const newImports = `import FAQSchema from '@/components/seo/FAQSchema';\nimport FAQSection from '@/components/ui/FAQSection';\nimport BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n`;

    if (!content.includes('import FAQSchema')) {
        let lines = content.split('\n');
        let lastImportIndex = lines.findLastIndex(l => l.startsWith('import '));
        lines.splice(lastImportIndex + 1, 0, newImports);
        content = lines.join('\n');
    }

    // 3. Replace the specific DOM tree branch safely.
    // We target the exact container <div className="mt-24 pt-16 border-t border-white/10 w-full"> down to <QuickQuote />
    const replacement = `                </div>
            </section>

            <FAQSchema faqs={${JSON.stringify(item.faqs, null, 4)}} />
            <FAQSection faqs={${JSON.stringify(item.faqs, null, 4)}} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services/" },
                { name: "${item.title}", url: "${item.slug}" }
            ]} />
            <QuickQuote />`;

    // Regex Explanation:
    // We match the exact starting div string, and everything until <QuickQuote /> globally (multiline)
    // using [\s\S]*? up to <QuickQuote \/>
    const regexTarget = /<div className="mt-24 pt-16 border-t border-white\/10 w-full">[\s\S]*?<QuickQuote \/>/g;

    if (content.match(regexTarget)) {
        content = content.replace(regexTarget, replacement);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Successfully fixed and injected SEO blocks into ${item.slug}`);
    } else {
        console.log(`Failed to match exact div tree structure in ${item.slug}`);
    }
});
