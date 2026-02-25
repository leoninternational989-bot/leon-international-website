const fs = require('fs');
const path = require('path');

const configurations = [
    {
        file: 'd:/Projetcs/leon-international-website/src/app/electrical/page.tsx',
        title: 'Our Electrical & Electronics Services in Detail',
        links: [
            { href: '/motor-rewinding/', text: 'Industrial Motor Rewinding' },
            { href: '/pcb-card-repair/', text: 'PCB Card Repair' },
            { href: '/transformer-rewinding/', text: 'Transformer Rewinding' },
            { href: '/electrical-equipment-repair/', text: 'Electrical Equipment Repair' }
        ]
    },
    {
        file: 'd:/Projetcs/leon-international-website/src/app/fabrication/page.tsx',
        title: 'Our Fabrication & Welding Services in Detail',
        links: [
            { href: '/steel-structure-fabrication/', text: 'Steel Structure Fabrication' },
            { href: '/welding-services/', text: 'Welding Services' },
            { href: '/buoys-fabrication/', text: 'Buoys Fabrication' }
        ]
    },
    {
        file: 'd:/Projetcs/leon-international-website/src/app/hvac/page.tsx',
        title: 'Our HVAC & Refrigeration Services in Detail',
        links: [
            { href: '/ac-plant-repair/', text: 'AC Plant Repair' },
            { href: '/cold-storage-repair/', text: 'Cold Storage & Refrigeration' }
        ]
    },
    {
        file: 'd:/Projetcs/leon-international-website/src/app/specialized/page.tsx',
        title: 'Our Specialized Services in Detail',
        links: [
            { href: '/air-lifting-balloon/', text: 'Air Lifting Balloon Services' },
            { href: '/spare-parts-supply/', text: 'Spare Parts Supply' },
            { href: '/custom-parts-fabrication/', text: 'Custom Parts Fabrication' }
        ]
    },
    {
        file: 'd:/Projetcs/leon-international-website/src/app/ndt-inspection/page.tsx',
        title: 'Our NDT & Inspection Services in Detail',
        links: [
            { href: '/ultrasonic-gauging/', text: 'Ultrasonic Thickness Gauging' },
            { href: '/ultrasonic-flaw-detection/', text: 'Ultrasonic Flaw Detection' },
            { href: '/magnetic-particle-inspection/', text: 'Magnetic Particle Inspection' },
            { href: '/dye-penetrant-testing/', text: 'Dye Penetrant Testing' },
            { href: '/hardness-testing/', text: 'Hardness Testing' },
            { href: '/crane-load-test/', text: 'Crane Load Test' },
            { href: '/crane-inspection/', text: 'Crane Inspection' },
            { href: '/marine-tools-calibration/', text: 'Marine Tools Calibration' },
            { href: '/hatch-cover-testing/', text: 'Hatch Cover Testing' },
            { href: '/gyro-compass-overhauling/', text: 'Gyro Compass Overhauling' }
        ]
    },
    {
        file: 'd:/Projetcs/leon-international-website/src/app/protective-coatings/page.tsx',
        title: 'Our Protective Coatings Services in Detail',
        links: [
            { href: '/industrial-coatings/', text: 'Belzona / Industrial Coatings' },
            { href: '/sandblasting/', text: 'Sandblasting / Grit Blasting' },
            { href: '/metal-stitching/', text: 'Metal Stitching / Metalocking' }
        ]
    }
];

configurations.forEach(config => {
    if (!fs.existsSync(config.file)) {
        console.log('Skipping missing file:', config.file);
        return;
    }

    let content = fs.readFileSync(config.file, 'utf8');

    // check if we already added it
    if (content.includes('NEW SECTION: Detailed Services')) {
        console.log('Already added detailed services to', path.basename(config.file));
        return;
    }

    const targetString = `</ul>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;

    // A simpler and more robust way is to just find the end of the section by looking for the QuickQuote component
    const sections = content.split('<QuickQuote />');
    if (sections.length < 2) {
        console.log("Could not find <QuickQuote /> split point in", path.basename(config.file));
        return;
    }

    let linkHtml = config.links.map(link => `
                            <Link href="${link.href}" className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-ocean hover:shadow-md transition-all">
                                <span className="text-accent-500 group-hover:translate-x-1 transition-transform">→</span>
                                <span className="font-semibold text-gray-800 group-hover:text-ocean transition-colors">${link.text}</span>
                            </Link>`).join('');

    let gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    if (config.links.length === 2) gridClass = 'grid-cols-1 md:grid-cols-2 gap-4';
    if (config.links.length === 4) gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4';

    let newSectionHTML = `
                    {/* --- NEW SECTION: Detailed Services --- */}
                    <div className="mt-16 bg-lightgray p-8 rounded-2xl border border-gray-100">
                        <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-plus-jakarta-sans mb-6">
                            ${config.title}
                        </h3>
                        <div className="grid ${gridClass}">
${linkHtml}
                        </div>
                    </div>

                </div>
            </section>

            <QuickQuote />`;

    // We append it right before the Quick Quote. We need to replace the closing tags of the section above it.
    // Actually, we can just replace the trailing `                </div>\n            </section>\n\n            <QuickQuote />`
    const targetReplace = `                </div>\r\n            </section>\r\n\r\n            <QuickQuote />`;
    const targetReplaceLinux = `                </div>\n            </section>\n\n            <QuickQuote />`;

    if (content.includes(targetReplace)) {
        content = content.replace(targetReplace, newSectionHTML);
        fs.writeFileSync(config.file, content);
        console.log('Successfully injected into', path.basename(config.file));
    } else if (content.includes(targetReplaceLinux)) {
        content = content.replace(targetReplaceLinux, newSectionHTML);
        fs.writeFileSync(config.file, content);
        console.log('Successfully injected into', path.basename(config.file));
    } else {
        // try a more generic replace
        const endOfSectionRegex = /<\/div>\s*<\/section>\s*<QuickQuote \/>/;
        if (endOfSectionRegex.test(content)) {
            content = content.replace(endOfSectionRegex, newSectionHTML);
            fs.writeFileSync(config.file, content);
            console.log('Successfully injected into', path.basename(config.file));
        } else {
            console.log('Failed to find replace target in', path.basename(config.file));
        }
    }
});
