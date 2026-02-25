const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const images = [
    { in: 'hero-1.png', out: 'hero-1.webp' },
    { in: 'hero-image-2.png', out: 'hero-image-2.webp' },
    { in: 'hero-3.png', out: 'hero-3.webp' }
];

async function optimizeImages() {
    for (const img of images) {
        const inputPath = path.join(publicDir, img.in);
        const outputPath = path.join(publicDir, img.out);

        if (fs.existsSync(inputPath)) {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted ${img.in} to WebP`);
            fs.unlinkSync(inputPath); // remove original
        } else {
            console.log(`File not found: ${img.in}`);
        }
    }
}

optimizeImages().catch(console.error);
