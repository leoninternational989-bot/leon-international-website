const fs = require('fs');
const path = require('path');

const files = [
    'd:/Projetcs/leon-international-website/src/app/ship-repair/page.tsx',
    'd:/Projetcs/leon-international-website/src/app/mechanical-repair/page.tsx',
    'd:/Projetcs/leon-international-website/src/app/electrical/page.tsx',
    'd:/Projetcs/leon-international-website/src/app/fabrication/page.tsx',
    'd:/Projetcs/leon-international-website/src/app/ndt-inspection/page.tsx',
    'd:/Projetcs/leon-international-website/src/app/protective-coatings/page.tsx',
    'd:/Projetcs/leon-international-website/src/app/hvac/page.tsx',
    'd:/Projetcs/leon-international-website/src/app/specialized/page.tsx'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;

    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes("import Link from 'next/link';") && !content.includes('import Link from "next/link";')) {
        const lines = content.split('\n');
        const importIndex = lines.findIndex(l => l.startsWith('import '));
        if (importIndex !== -1) {
            lines.splice(importIndex + 1, 0, "import Link from 'next/link';");
            fs.writeFileSync(file, lines.join('\n'));
            console.log('Added Link to', path.basename(file));
        }
    }
});
