const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");

const app = express();
app.use(cors());
app.use(express.json());

let browser;
let page;

/* START BROWSER */
async function startBrowser() {
  browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext();
  page = await context.newPage();

  console.log("🔥 Browser started");
}

startBrowser();

/* LOAD URL */
app.post("/load", async (req, res) => {
  const { url } = req.body;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const html = await page.content();

    res.json({ html });
  } catch (err) {
    res.json({ error: "Failed to load page" });
  }
});

/* START SERVER */
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
