const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DRAWIO_DIR = path.resolve('diagrams/drawio');
const OUTPUT_DIR = path.resolve('diagrams/images');
const VIEWER_JS_PATH = path.resolve('viewer-static.min.js');

async function exportAll() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const viewerJs = fs.readFileSync(VIEWER_JS_PATH, 'utf-8');
  const files = fs.readdirSync(DRAWIO_DIR)
    .filter(f => f.endsWith('.drawio') && !f.includes('Master'))
    .sort();

  console.log(`Starting export for ${files.length} Draw.io diagrams...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--window-size=2800,2000'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 2800, height: 2000, deviceScaleFactor: 2 });

  let successCount = 0;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const basename = path.basename(filename, '.drawio');
    const drawioPath = path.join(DRAWIO_DIR, filename);
    const outPngPath = path.join(OUTPUT_DIR, `${basename}.png`);

    console.log(`[${i + 1}/${files.length}] Rendering ${filename} -> ${basename}.png...`);
    const xmlContent = fs.readFileSync(drawioPath, 'utf-8');

    // Create container HTML
    await page.setContent(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 16px;
      background: #ffffff;
      display: inline-block;
    }
  </style>
  <script>${viewerJs}</script>
</head>
<body>
  <div id="graph-container"></div>
</body>
</html>`);

    try {
      // Execute viewer creation inside browser
      await page.evaluate((xml) => {
        return new Promise((resolve, reject) => {
          const container = document.getElementById('graph-container');
          container.setAttribute('data-mxgraph', JSON.stringify({
            highlight: '#0000ff',
            nav: false,
            resize: true,
            toolbar: '',
            xml: xml
          }));
          container.className = 'mxgraph';
          try {
            GraphViewer.createViewerForElement(container, function(viewer) {
              resolve(true);
            });
          } catch (e) {
            reject(e.message);
          }
        });
      }, xmlContent);

      // Wait a moment for SVG styles and layouts to stabilize
      await new Promise(r => setTimeout(r, 600));

      const svgEl = await page.$('svg');
      if (svgEl) {
        // Capture screenshot of the SVG
        await svgEl.screenshot({
          path: outPngPath,
          omitBackground: false
        });
        const stats = fs.statSync(outPngPath);
        console.log(`  ✓ SUCCESS: ${basename}.png (${(stats.size / 1024).toFixed(1)} KB)`);
        successCount++;
      } else {
        console.error(`  ✗ FAILED: No SVG element found for ${filename}`);
      }
    } catch (err) {
      console.error(`  ✗ ERROR rendering ${filename}:`, err.message);
    }
  }

  await browser.close();
  console.log(`\n========================================`);
  console.log(`Export completed: ${successCount}/${files.length} diagrams rendered directly from Draw.io!`);
  console.log(`All images saved to: ${OUTPUT_DIR}`);
  console.log(`========================================`);
}

exportAll().catch(err => {
  console.error('Fatal export error:', err);
  process.exit(1);
});
