const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const distDir = path.resolve('vstep-app/dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url.split('?')[0]);
  if (filePath.endsWith('/') || !path.extname(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function captureRealScreens() {
  await new Promise(resolve => server.listen(5179, resolve));
  console.log('SPA server listening on http://localhost:5179');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Login Page
  console.log('Capturing 1. Login Page...');
  await page.goto('http://localhost:5179/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.goto('http://localhost:5179/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'real_ui_login_page.png' });

  // Login as User
  await page.evaluate(() => {
    const user = {
      username: 'student_vstep',
      displayName: 'Nguyễn Văn An (Học viên)',
      role: 'user',
      createdAt: '2026-09-01T08:00:00.000Z'
    };
    localStorage.setItem('vstep_current_user', JSON.stringify(user));
  });

  // 2. Dashboard / Home
  console.log('Capturing 2. Dashboard / Home...');
  await page.goto('http://localhost:5179/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'real_ui_dashboard.png' });

  // 3. Listening & Reading (Listening Practice with audio player & transcript)
  console.log('Capturing 3. Listening Practice...');
  await page.goto('http://localhost:5179/listening/l1', { waitUntil: 'networkidle0' });
  // Click Show Transcript
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const transcriptBtn = buttons.find(b => b.innerText.includes('Xem transcript') || b.innerText.includes('Transcript'));
    if (transcriptBtn) transcriptBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'real_ui_listening_reading.png' });

  // 4. Writing Practice with Essay & AI Evaluation
  console.log('Capturing 4. Writing Practice...');
  await page.goto('http://localhost:5179/writing/w1', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.value = `Dear Scholarship Committee,

I am writing this letter to formally express my deepest gratitude for awarding me the prestigious Global Excellence Scholarship for the upcoming academic year 2026-2027.

I am thrilled and honored to have been selected among many competent applicants. In order to make timely arrangements, could you please provide further details regarding university accommodation and the procedure for student visa sponsorship? I would appreciate knowing the key milestones so that I can prepare all supporting financial documents accordingly.

I would like to reaffirm my enthusiastic acceptance of this valuable scholarship offer and look forward to contributing actively to the university community.

Yours sincerely,
Nguyen Van An`;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'real_ui_writing_ai.png' });

  // 5. Mock Test (in active test state)
  console.log('Capturing 5. Mock Test...');
  await page.goto('http://localhost:5179/mock-test', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const startBtn = buttons.find(b => b.innerText.includes('Bắt đầu'));
    if (startBtn) startBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'real_ui_mock_test.png' });

  // 6. Custom Test (with sample parsed text)
  console.log('Capturing 6. Custom Test...');
  await page.goto('http://localhost:5179/custom-test', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const sampleBtn = buttons.find(b => b.innerText.includes('Đề mẫu'));
    if (sampleBtn) sampleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'real_ui_custom_test.png' });

  await browser.close();
  server.close();
  console.log('All real app screenshots captured successfully!');
}

captureRealScreens().catch(err => {
  console.error('Error:', err);
  server.close();
  process.exit(1);
});
