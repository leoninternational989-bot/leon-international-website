const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        console.log('Starting PDF generation...');
        const htmlPath = path.resolve(__dirname, 'COMPANY-PROFILE.html');
        const pdfPath = path.resolve(__dirname, 'Leon_International_Company_Profile.pdf');

        if (!fs.existsSync(htmlPath)) {
            throw new Error(`HTML file not found at ${htmlPath}`);
        }

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Load the HTML file
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

        // Generate PDF
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });

        await browser.close();
        console.log(`PDF successfully generated at: ${pdfPath}`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
