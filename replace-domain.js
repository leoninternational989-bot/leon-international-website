const fs = require('fs');
const path = require('path');

const targetString = 'leon-international.com';
const replacementString = 'leon-international.com';

const ignoreDirs = ['node_modules', '.next', '.git', 'out', 'build', '.gemini'];

function walkAndReplace(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!ignoreDirs.includes(file)) {
                walkAndReplace(fullPath);
            }
        } else {
            // Only process likely text files based on extension
            const ext = path.extname(fullPath);
            if (['.ts', '.tsx', '.js', '.jsx', '.html', '.md', '.json', '.xml', '.txt'].includes(ext)) {
                let content = fs.readFileSync(fullPath, 'utf8');
                if (content.includes(targetString)) {
                    const regex = new RegExp(targetString, 'g');
                    const newContent = content.replace(regex, replacementString);
                    if (newContent !== content) {
                        fs.writeFileSync(fullPath, newContent, 'utf8');
                        console.log(`Updated: ${fullPath}`);
                    }
                }
            }
        }
    });
}

const targetDir = 'd:\\Projetcs\\leon-international-website';
walkAndReplace(targetDir);
console.log('Domain replacement complete.');
