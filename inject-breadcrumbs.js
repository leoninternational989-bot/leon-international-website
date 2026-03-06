const fs = require('fs');
const path = require('path');

const pageData = [
    { path: 'src/app/about/page.tsx', title: 'About Us', slug: '/about/' },
    { path: 'src/app/contact/page.tsx', title: 'Contact', slug: '/contact/' },
    { path: 'src/app/quote/page.tsx', title: 'Request a Quote', slug: '/quote/' },
    { path: 'src/app/products/page.tsx', title: 'Products', slug: '/products/' }
];

pageData.forEach(item => {
    const fullPath = path.join(__dirname, item.path);
    if (!fs.existsSync(fullPath)) {
        console.log(`WARN: File not found: ${fullPath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // Add Imports at the top (after last import)
    const newImports = `import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n`;

    if (!content.includes('import BreadcrumbSchema')) {
        let lines = content.split('\n');
        let lastImportIndex = lines.findLastIndex(l => l.startsWith('import '));
        if (lastImportIndex !== -1) {
            lines.splice(lastImportIndex + 1, 0, newImports);
            content = lines.join('\n');
        } else {
            content = newImports + content;
        }
    }

    const injectedCode = `
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "${item.title}", url: "${item.slug}" }
            ]} />
        </main>
`;
    // Replace </main> or </div> before JSX end. Let's aim for </main>
    if (!content.includes('<BreadcrumbSchema') && content.includes('</main>')) {
        content = content.replace(/<\/main>/i, injectedCode);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${item.slug} main`);
    } else if (!content.includes('<BreadcrumbSchema') && content.includes('</>')) {
        // if wrapped in a fragment
        content = content.replace(/<\/>/i, `
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "${item.title}", url: "${item.slug}" }
            ]} />
        </>`);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${item.slug} fragment`);
    }
});
