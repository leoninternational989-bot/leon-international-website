const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx', { cwd: __dirname });
let missingCount = 0;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // We want to find <Image ... />
    // Regex matches <Image followed by anything up to />
    // We use [\s\S]*? for non-greedy multiline matching
    const regex = /<Image([\s\S]*?)\/?>/g;

    content = content.replace(regex, (match, p1) => {
        // If it already has a valid alt text (not empty)
        if (p1.includes('alt=') && !p1.includes('alt=""') && !p1.includes("alt={''}")) {
            return match;
        }

        // Determine what alt text to use based on the file path
        let altText = "Leon International marine engineering and ship repair";
        if (file.includes('ship-repair')) altText = "Vessel in dry dock at Karachi Port for ship repair";
        else if (file.includes('mechanical-repair')) altText = "Marine engine overhauling and mechanical repair";
        else if (file.includes('electrical')) altText = "Marine electrical motor rewinding and PCB repair";
        else if (file.includes('fabrication')) altText = "BV-certified steel fabrication and welding for marine vessels";
        else if (file.includes('ndt-inspection')) altText = "Ultrasonic thickness gauging for marine hull inspection";
        else if (file.includes('protective-coatings') || file.includes('sandblasting')) altText = "Industrial protective coating application on marine equipment";
        else if (file.includes('hvac')) altText = "Marine HVAC and refrigeration system maintenance";
        else if (file.includes('about')) altText = "Leon International team of marine engineers";
        else if (file.includes('TrustBar') || file.includes('clients')) altText = "Classification society and partner certification logo";
        else if (file.includes('ServicesGrid')) altText = "Marine engineering services by Leon International";
        else if (file.includes('food-supply-chain')) altText = "Food supply chain machinery and processing equipment";
        else if (file.includes('chemical-supplies')) altText = "Industrial chemical supply handling and storage";

        missingCount++;
        console.log(`Fixing image in ${file} -> alt="${altText}"`);

        // Remove empty alt="" if present
        let newContent = p1.replace(/alt=(?:""|{''})/g, '');
        return `<Image${newContent} alt="${altText}" />`;
    });

    if (modified || missingCount > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log(`Fixed ${missingCount} images.`);
