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
        await page.waitForXPath(
            "/html/body/div[1]/main/div[4]/div[2]/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div[1]/div/div/div[2]/div[1]/h2"
        );
        await page.screenshot({ path: "./screens/microsoft.png" });

        const jobTitleH2 = await page.$x(
            '//*[@id="job-search-app"]/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div[1]/div/div/div[2]/div[1]/h2'
        );
        let h2_value = await page.evaluate((el) => el.textContent, jobTitleH2[0]);
        console.log({ h2_value });
        const titles = await page.evaluate((...jobTitleH2) => {
            return jobTitleH2.map((e) => e.textContent);
        }, ...jobTitleH2);

        console.log({ titles });

        const grabTitles = await page.evaluate(() => {
            let titlesArray = [];
            const jobsDiv = document.querySelectorAll("div.ms-List-cell");

            jobsDiv.forEach((job) => {
                const jobTitle = job.querySelector("h2");
                const jobTitleText = jobTitle.innerText;
                titlesArray.push({ jobTitle: jobTitleText });
            });

            return titlesArray;
        });

        console.log({ grabTitles });
        await browser.close();
    } catch (e) {
        console.log({ e });
    }
})();
