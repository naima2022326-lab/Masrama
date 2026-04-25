const express = require("express");
const { chromium } = require("playwright");

const app = express();
let browser;
let page;

(async () => {
  console.log("🚀 Launching browser...");

  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();

  await page.goto("https://example.com");

  console.log("✅ Browser launched");
})();

app.get("/", async (req, res) => {
  if (!page) return res.send("Browser not ready");

  const content = await page.content();
  res.send(content);
});

app.listen(3000, () => {
  console.log("🌐 Server running at http://localhost:3000");
});
