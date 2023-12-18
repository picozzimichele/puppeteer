// import puppeteer from 'puppeteer';
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
async function run(pagesToScrape) {
    try {
        if (!pagesToScrape) {
            pagesToScrape = 1;
        }
        const browser = await puppeteer.launch({
            userDataDir: "./data/ycombinator",
        });
        const page = await browser.newPage();
        await page.goto("https://news.ycombinator.com/");
        let currentPage = 1;
        let urls = [];
        while (currentPage <= pagesToScrape) {
            let newUrls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll("span.titleline > a");
                items.forEach((item) => {
                    results.push({
                        url: item.getAttribute("href"),
                        text: item.innerText,
                    });
                });
                return results;
            });
            urls = urls.concat(newUrls);
            if (currentPage < pagesToScrape) {
                await Promise.all([
                    await page.waitForSelector("a.morelink"),
                    await page.click("a.morelink"),
                ]);
            }
            currentPage++;
        }
        browser.close();
        console.log({ urls });
    } catch (e) {
        console.log({ e });
    }
}

run(5);
