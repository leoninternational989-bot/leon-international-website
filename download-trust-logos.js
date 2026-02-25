const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'trust');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const logos = [
    { name: 'LR', url: 'https://logo.clearbit.com/lr.org' },
    { name: 'BV', url: 'https://logo.clearbit.com/bureauveritas.com' },
    { name: 'DNV', url: 'https://logo.clearbit.com/dnv.com' },
    { name: 'ABS', url: 'https://logo.clearbit.com/eagle.org' },
    { name: 'NKK', url: 'https://logo.clearbit.com/classnk.or.jp' },
    { name: 'CCS', url: 'https://logo.clearbit.com/ccs.org.cn' }
];

logos.forEach(logo => {
    const dest = path.join(dir, `${logo.name}.png`);
    const file = fs.createWriteStream(dest);
    https.get(logo.url, response => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${logo.name}`);
            });
        } else {
            console.log(`Failed for ${logo.name}: ${response.statusCode}`);
        }
    }).on('error', err => {
        fs.unlink(dest, () => { });
        console.error(`Error downloading ${logo.name}:`, err.message);
    });
});
