const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'services');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const images = [
    { srcName: 'service_ship_repair_1772043041657.png', out: 'service-1.webp' },
    { srcName: 'service_engine_repair_1772043072191.png', out: 'service-2.webp' },
    { srcName: 'service_electrical_1772043167415.png', out: 'service-3.webp' },
    { srcName: 'service_fabrication_1772043276775.png', out: 'service-4.webp' },
    { srcName: 'service_ndt_1772043454373.png', out: 'service-5.webp' },
    { srcName: 'service_coatings_1772043533546.png', out: 'service-6.webp' },
    { srcName: 'service_hvac_1772043565228.png', out: 'service-7.webp' },
    // We will find the latest generated image for the 8th one dynamically to avoid race condition on filename
];

const brainDir = 'C:\\Users\\ummeh\\.gemini\\antigravity\\brain\\22e24190-aafb-45ed-a6e5-2746e3a559fa';

async function optimizeImages() {
    // Dynamically find the specialized services image
    const files = fs.readdirSync(brainDir);
    const specializedFile = files.filter(f => f.startsWith('service_specialized_') && f.endsWith('.png')).sort().pop();

    if (specializedFile) {
        images.push({ srcName: specializedFile, out: 'service-8.webp' });
    }

    for (const img of images) {
        const inputPath = path.join(brainDir, img.srcName);
        const outputPath = path.join(publicDir, img.out);

        if (fs.existsSync(inputPath)) {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted ${img.srcName} to ${img.out}`);
        } else {
            console.log(`File not found: ${inputPath}`);
        }
    }
}

optimizeImages().catch(console.error);
