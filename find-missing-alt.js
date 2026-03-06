const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx', { cwd: __dirname });

let missingCount = 0;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // We are looking for `<Image` components only.
    // Let's split by "<Image", ignoring the first split part.
    const parts = content.split('<Image');

    for (let i = 1; i < parts.length; i++) {
        // Find the end of the tag
        const tagEndIndex = parts[i].indexOf('/>');
        const tagEndIndex2 = parts[i].indexOf('>');

        let endIdx = Math.min(
            tagEndIndex !== -1 ? tagEndIndex : Infinity,
            tagEndIndex2 !== -1 ? tagEndIndex2 : Infinity
        );

        if (endIdx !== Infinity) {
            const tagContent = parts[i].substring(0, endIdx);
            // check if it has alt=...
            if (!tagContent.includes('alt=') || tagContent.includes('alt=""') || tagContent.includes("alt={''}")) {
                const upToMatch = content.substring(0, content.indexOf(parts[i]) - 6);
                const lineNumber = upToMatch.split('\n').length;
                console.log(`Missing alt in: ${file}:${lineNumber}`);
                console.log(`Tag content: <Image${tagContent.replace(/\s+/g, ' ')}\n`);
                missingCount++;
            }
        }
    }
});
console.log(`Total missing: ${missingCount}`);
