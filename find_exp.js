const fs = require('fs');
const path = require('path');

const targetPaths = [
    'd:/Projetcs/leon-international-website/src',
    'd:/Projetcs/leon-international-website/COMPANY-PROFILE.html'
];
const regex = /(1974|50\s*\+?\s*years|years of experiences?|since 1974|five decades?)/gi;

let results = [];

function walk(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    const stat = fs.statSync(currentPath);
    if (stat.isFile()) {
        if (/\.(tsx|ts|html)$/i.test(currentPath)) {
            const content = fs.readFileSync(currentPath, 'utf-8');
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
                const matchLine = line;
                if (regex.test(matchLine)) {
                    // Reset regex state
                    regex.lastIndex = 0;
                    results.push({
                        file: currentPath.replace(/\\/g, '/').replace('d:/Projetcs/leon-international-website/', ''),
                        line: idx + 1,
                        text: matchLine.trim()
                    });
                }
            });
        }
    } else if (stat.isDirectory()) {
        const files = fs.readdirSync(currentPath);
        files.forEach(file => walk(path.join(currentPath, file)));
    }
}

targetPaths.forEach(walk);

fs.writeFileSync('d:/Projetcs/leon-international-website/temp_matches.json', JSON.stringify(results, null, 2));
console.log("Found matches: " + results.length);
