const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  const viewerJs = fs.readFileSync('viewer-static.min.js', 'utf-8');
  const xml = fs.readFileSync('diagrams/drawio/sequence_uc01_auth.drawio', 'utf-8');

  await page.setContent('<!DOCTYPE html><html><head><script>' + viewerJs + '</script></head><body><div id="c"></div></body></html>');
  await page.evaluate((xmlData) => {
    const c = document.getElementById('c');
    c.setAttribute('data-mxgraph', JSON.stringify({ xml: xmlData }));
    c.className = 'mxgraph';
    GraphViewer.createViewerForElement(c);
  }, xml);

  await new Promise(r => setTimeout(r, 1200));
  const svgHtml = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    return svg ? svg.innerHTML : 'no svg';
  });
  
  fs.writeFileSync('debug_svg_out.html', svgHtml, 'utf-8');
  console.log('Saved debug_svg_out.html, length:', svgHtml.length);
  await browser.close();
})();
