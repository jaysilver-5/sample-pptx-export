import express from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/export-lesson/:lessonId', async (req, res) => {
  const lessonId = req.params.lessonId;

  try {
    // Step 1: Generate Markdown
    await execCommand('node generateMarkdown', import.meta.url);

    // Step 2: Export PDF
    const pdfFileName = `${lessonId}-export.pdf`;
    const exportCommand = `npx slidev export Markdown/${lessonId}.md`;
    await execCommand(exportCommand, import.meta.url);

    // Step 3: Serve PDF for download
    const pdfFilePath = path.join(new URL('./', import.meta.url).pathname, pdfFileName);
    const pdfStream = fs.createReadStream(pdfFilePath);

    // Set Content-Disposition header to prompt download
    res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF stream to the response
    pdfStream.pipe(res);
  } catch (error) {
    console.error('Export failed:', error.message);
    res.status(500).json({ error: 'Export failed' });
  }
});

async function execCommand(command, currentModuleUrl) {
  return new Promise((resolve, reject) => {
    const directoryName = path.dirname(new URL(currentModuleUrl).pathname);

    exec(command, { cwd: directoryName }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      } else {
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
