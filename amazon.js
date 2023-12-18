import puppeteer from "puppeteer";
import { writeFile } from "fs";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
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
        "https://www.amazon.it/gp/most-wished-for/pc?ref_=Oct_d_omwf_S&pd_rd_w=EONjs&content-id=amzn1.sym.b6de0d45-c6c5-4a6a-ad76-45a889eccd18&pf_rd_p=b6de0d45-c6c5-4a6a-ad76-45a889eccd18&pf_rd_r=NKREM4ZGND0S2KCZG9DX&pd_rd_wg=vpQLJ&pd_rd_r=ce3ada24-fd7e-45a1-9a29-3ee530bda355"
    );
    await page.waitForNavigation({ waitUntil: "load" });
    await page.waitForSelector("div.p13n-gridRow ._cDEzb_grid-row_3Cywl");

    const titleH1 = await page.$$("div._cDEzb_card-title_2sYgw > h1");
    const title = await page.evaluate((titleDiv) => titleDiv.textContent, titleDiv);
    console.log({ title });

    await browser.close();
})();
