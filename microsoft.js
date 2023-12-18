// import puppeteer from 'puppeteer';
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import { writeFile } from "fs";

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: "./data/microsoftjobs",
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1500,
            height: 1500,
            isMobile: false,
            isLandscape: true,
            hasTouch: false,
            deviceScaleFactor: 1,
        });
        await page.goto(
            "https://jobs.careers.microsoft.com/global/en/search?lc=Milano%2C%20Italy&lc=Milan%2C%20Milano%2C%20Italy&lc=Segrate-Milano%2C%20Milano%2C%20Italy&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true&ulcs=false&ref=cms"
        );
        await page.waitForNavigation({ waitUntil: "load" });
        await page.waitForSelector("div.M9jNOkq94Xdh7PlzI0v4");

        await page.waitForSelector("div.ms-List-page");
        await page.waitForSelector("div.ms-Stack .css-349");

        const jobs = await page.$$eval("h2.MZGzlrn8gfgSs8TZHhv2", (jobTitle) => {
            let results = [];
            return jobTitle.map((job) => results.push({ jobTitle: job.innerText }));
        });
        console.log({ jobs });
        browser.close();
    } catch (e) {
        console.log({ e });
    }
})();
