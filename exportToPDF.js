import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function exportToPDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Read the generated markdown file
  const markdownContent = await fs.readFile('public/generated.md', 'utf8');

  // Set the HTML content to render
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://unpkg.com/slidev/dist/style.css');
        </style>
      </head>
      <body>
        <div id="app">${markdownContent}</div>
      </body>
    </html>
  `;

  // Set the content and wait for the page to load
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

  // Export to PDF with custom size (42rem x 30.4rem)
  await page.pdf({ path: 'presentation.pdf', width: '42', height: '30', printBackground: true });

  console.log('PDF exported successfully!');

  await browser.close();
}

exportToPDF();
