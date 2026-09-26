const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DRAWIO_DIR = path.resolve('diagrams/drawio');
const OUTPUT_DIR = path.resolve('diagrams/images');
const VIEWER_JS_PATH = path.resolve('viewer-static.min.js');

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const viewerJs = fs.readFileSync(VIEWER_JS_PATH, 'utf-8');
  const files = fs.readdirSync(DRAWIO_DIR)
    .filter(f => f.endsWith('.drawio') && !f.includes('Master'))
    .sort();

  console.log(`=== RENDERING ${files.length} DRAW.IO DIAGRAMS TO PNG ===\n`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 2800, height: 2000, deviceScaleFactor: 2 });

  let successCount = 0;
  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const basename = path.basename(file, '.drawio');
    const drawioPath = path.join(DRAWIO_DIR, file);
    const outPngPath = path.join(OUTPUT_DIR, `${basename}.png`);

    process.stdout.write(`[${i + 1}/${files.length}] ${file} ... `);
    const xml = fs.readFileSync(drawioPath, 'utf-8');

    await page.setContent(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 24px; background: #ffffff; }
  </style>
  <script>${viewerJs}</script>
</head>
<body>
  <div id="container"></div>
</body>
</html>`);

    try {
      await page.evaluate((xmlData) => {
        return new Promise((resolve) => {
          const container = document.getElementById('container');
          container.setAttribute('data-mxgraph', JSON.stringify({
            highlight: '#0000ff',
            nav: false,
            resize: true,
            toolbar: '',
            xml: xmlData
          }));
          container.className = 'mxgraph';
          try {
            GraphViewer.createViewerForElement(container, function(viewer) {
              resolve({ ok: true });
            });
          } catch (e) {
            resolve({ ok: false, err: e.message });
          }
        });
      }, xml);

      await new Promise(r => setTimeout(r, 1200));

      const svgEl = await page.$('svg');
      if (svgEl) {
        await svgEl.screenshot({
          path: outPngPath,
          omitBackground: false
        });
        const size = fs.statSync(outPngPath).size;
        console.log(`OK (${(size / 1024).toFixed(1)} KB)`);
        successCount++;
        results.push({ file: basename, status: 'OK', size: size });
      } else {
        console.log('FAIL (No SVG)');
        results.push({ file: basename, status: 'FAIL', reason: 'No SVG' });
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results.push({ file: basename, status: 'ERROR', error: err.message });
    }
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`DONE: ${successCount}/${files.length} diagrams rendered successfully!`);
  console.log(`Images location: ${OUTPUT_DIR}`);
  console.log(`========================================`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
