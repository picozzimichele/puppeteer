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

    await page.waitForNavigation({ waitUntil: "load" });
    await page.waitForSelector("table.tableSortList");
    await page.screenshot({ path: "./screens/algonquin2.png" });
    const data = await page.$$eval("table.tableSortList tbody tr", (rows) => {
        return rows
            .map((row) => {
                if (row.classList.contains("odd") || row.classList.contains("even")) {
                    let tds = row.querySelectorAll("td");
                    return {
                        name: tds[1].innerText,
                        area: tds[2].innerText,
                        campus: tds[3].innerText,
                        credientials: tds[4].innerText,
                        length: tds[5].innerText,
                    };
                }
            })
            .filter((row) => row);
    });

    console.log({ data });
    await browser.close();
})();
