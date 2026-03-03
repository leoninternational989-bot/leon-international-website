const fs = require('fs');
const path = require('path');

const targetPaths = [
    'd:/Projetcs/leon-international-website/src',
    'd:/Projetcs/leon-international-website/COMPANY-PROFILE.html'
];

const replacements = [
    // Service pages repetitive intros
    { search: /, and offices in UAE, China, and Latvia/gi, replace: '' },
    { search: /Offices in Pakistan, UAE, China(&| and) Latvia\.?/gi, replace: 'Headquartered in Pakistan, serving globally.' },
    { search: /Pakistan, UAE, China, and Latvia/gi, replace: 'Pakistan and globally' },

    // About Layout
    { search: /offices in Pakistan, UAE, China & Latvia/gi, replace: 'global operations headquartered in Pakistan' },
    { search: /operations spanning Pakistan, the United Arab Emirates, China, and Latvia/gi, replace: 'operations spanning across the globe from our headquarters in Pakistan' },
    { search: /Pakistan, UAE, China, Latvia/gi, replace: 'Pakistan and worldwide' },

    // Contact Layout 
    { search: /Offices in Karachi \(HQ\), Dubai, Shanghai, and Riga\./gi, replace: 'Headquartered in Karachi, delivering globally.' },
    { search: /across our offices in Pakistan, UAE, China, and Latvia\./gi, replace: 'from our headquarters in Pakistan, delivering globally.' },

    // Terms Layout
    { search: /across our global offices \(Pakistan, UAE, China, Latvia\)/gi, replace: 'worldwide from our Pakistan headquarters' },

    // Privacy
    { search: /Pakistan, UAE, China, and Latvia operations/gi, replace: 'global operations' },
    { search: /Between our internal network of offices \(Pakistan, UAE, China, Latvia\)/gi, replace: 'Across our global network' },

    // Schema
    { search: /"UAE", "CN", "LV", /gi, replace: '' },

    // Company Profile HTML specific
    { search: /Pakistan, UAE, China, and Latvia,/gi, replace: 'Pakistan and globally,' },
    { search: /operating from Pakistan, UAE, China, and Latvia,/gi, replace: 'operating from our Pakistan headquarters and delivering globally,' }
];

let changedFiles = 0;

function walk(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    const stat = fs.statSync(currentPath);
    if (stat.isFile()) {
        if (/\.(tsx|ts|html)$/i.test(currentPath)) {
            let content = fs.readFileSync(currentPath, 'utf-8');
            let initialContent = content;

            replacements.forEach(r => {
                content = content.replace(r.search, r.replace);
            });

            if (content !== initialContent) {
                fs.writeFileSync(currentPath, content, 'utf-8');
                console.log(`Updated: ${currentPath}`);
                changedFiles++;
            }
        }
    } else if (stat.isDirectory()) {
        const files = fs.readdirSync(currentPath);
        files.forEach(file => walk(path.join(currentPath, file)));
    }
}

targetPaths.forEach(walk);
console.log(`\nSuccessfully updated ${changedFiles} files with basic string replacements.`);
