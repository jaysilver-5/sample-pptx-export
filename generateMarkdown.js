// generateMarkdown.js

import fs from 'fs/promises';

async function generateMarkdown() {
  try {
    // Assume the main markdown file is slides.md in the root folder
    const mainMarkdownFile = 'public/slides.md';

    // Read the main markdown file
    const mainMarkdownContent = await fs.readFile(mainMarkdownFile, 'utf8');

    // Replace the placeholders with actual data and add styles
    const replacedTemplate = mainMarkdownContent.replace(/\{\{ textArray \}\}/g, generateFlexedTextDivs());

    // Create the public folder if it doesn't exist
    await fs.mkdir('public', { recursive: true });

    // Write the final markdown file
    await fs.writeFile('slides.md', replacedTemplate, 'utf8');

    
    console.log('Markdown generated successfully!');
  } catch (error) {
    console.error('Error generating markdown:', error);
  }
}

function generateFlexedTextDivs() {
  // Replace this array with your actual text data
  const textArray = ['Text 1', 'Text 2', 'Text 3'];

  // Generate the flexed horizontal text divs
  return `<div style="display: flex; justify-content: space-between;">${textArray
    .map(
      (text) =>
        `<div style="flex: 1; border: 2px solid blue; padding: 10px; margin: 10px;">${text}</div>`
    )
    .join('')}</div>`;
}

generateMarkdown();
