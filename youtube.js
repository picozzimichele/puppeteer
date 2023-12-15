import puppeteer from "puppeteer";
const log = console.log;
// node youtube.js "Konichi Value"
const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : "Konichi Value";
// export SEARCHT_TERM="Konichi Value"
const searchTermENV = process.env.SEARCH_TERM || "Konichi Value";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.youtube.com");
    await page.waitForSelector("#search-input #search");
    await page.type("#search-input #search", searchTermCLI, { delay: 100 });
    await page.emulateVisionDeficiency("blurredVision");
    await page.screenshot({ path: "./screens/youtubeblurr.png" });
    await page.emulateVisionDeficiency("none");
    await page.screenshot({ path: "./screens/youtube.png" });

    await Promise.all([page.waitForNavigation(), page.click("#search-icon-legacy")]);

    await browser.close();
})();
