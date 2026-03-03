const fs = require('fs');
const path = require('path');

const targetPaths = [
    'd:/Projetcs/leon-international-website/src',
    'd:/Projetcs/leon-international-website/COMPANY-PROFILE.html'
];

const replacements = [
    { search: /over 50 years of combined marine engineering experience/gi, replace: 'decades of combined marine engineering experience' },
    { search: /over 50 years of experience/gi, replace: 'decades of experience' },
    { search: /50\+\s*Years Maritime Experience/gi, replace: 'Decades of Maritime Experience' },
    { search: /With over 50 years of technical expertise/gi, replace: 'With decades of technical expertise' },
    { search: /50\+\s*Years in Marine Engineering/gi, replace: 'Decades in Marine Engineering' },
    { search: /Five Decades of Marine Engineering Excellence/gi, replace: 'Decades of Marine Engineering Excellence' },
    { search: /Our roots trace back to 1974, when/gi, replace: 'Our roots trace back decades, when' },
    { search: /trust earned over five decades/gi, replace: 'trust earned over decades' },
    { search: /"foundingDate":\s*"1974",?\s*\n?/g, replace: '' },
    { search: /Engineering Excellence Since 1974/gi, replace: 'Long-Standing Engineering Excellence' },
    { search: /\{\s*label:\s*'Years of Experience',\s*value:\s*'50\+'\s*\}/g, replace: "{ label: 'Years of Experience', value: 'Decades' }" },
    { search: /50\+\s*Years of Marine Technical Excellence/gi, replace: 'Decades of Marine Technical Excellence' },
    { search: /For five decades,/gi, replace: 'For decades,' },
    { search: /over five decades/gi, replace: 'decades' },
    { search: /50\+\s*years experience/gi, replace: 'decades of experience' },
    { search: /With over 50 years/gi, replace: 'With decades' }
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
console.log(`\nSuccessfully updated ${changedFiles} files.`);
