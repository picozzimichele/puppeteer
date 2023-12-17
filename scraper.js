import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import { writeFile } from "fs";

const keywork = "Mobile";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 800,
        isMobile: false,
        isLandscape: true,
        hasTouch: false,
        deviceScaleFactor: 1,
    });

    await page.goto("https://www.algonquincollege.com/");
    await page.screenshot({ path: "./screens/algonquin.png" });
    const btn = await page.waitForSelector("button.programSearchButton");

    await page.type("input#programSearch", keywork, { delay: 100 });
    await btn.click();

    await browser.close();
})();
