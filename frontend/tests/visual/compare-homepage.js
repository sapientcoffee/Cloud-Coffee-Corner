const puppeteer = require('puppeteer');
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default;

async function runTest() {
  // 1. Define file paths
  const mockupPath = '/home/robedwards/workspace/cloud-coffee-corner/docs/mockups/homepage.png';
  const screenshotPath = 'screenshots/homepage-current.png';
  const diffPath = 'screenshots/homepage-diff.png';

  // Ensure screenshot directory exists
  fs.mkdirSync('screenshots', { recursive: true });

  // 2. Launch Puppeteer and take a screenshot
  console.log('Launching browser and taking screenshot...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // IMPORTANT: Set viewport to match the mockup dimensions
  await page.setViewport({ width: 2560, height: 1600 }); // Adjust to your mockup's size
  await page.goto('http://localhost:4200', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: screenshotPath });
  await browser.close();
  console.log('Screenshot saved to', screenshotPath);

  // 3. Compare the images
  console.log('Comparing images...');
  const mockupImage = PNG.sync.read(fs.readFileSync(mockupPath));
  const screenshotImage = PNG.sync.read(fs.readFileSync(screenshotPath));
  const { width, height } = mockupImage;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    mockupImage.data,
    screenshotImage.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 } // Allow for minor anti-aliasing differences
  );

  // 4. Report the result
  if (numDiffPixels === 0) {
    console.log('✅ Success! The screenshot matches the mockup.');
    // Clean up the successful screenshot
    fs.unlinkSync(screenshotPath);
  } else {
    console.log(`❌ Failure! Found ${numDiffPixels} different pixels.`);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.log('A diff image was created at', diffPath);
    process.exit(1); // Exit with an error code for CI/CD systems
  }
}

runTest().catch(console.error);
