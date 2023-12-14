const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
    // Launch the browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
    });

    // Open a new page
    const page = await browser.newPage();
    // go to the specified url
    await page.goto("https://www.amazon.it/deals?ref_=nav_cs_gb");

    const mainDiv = await page.$$(
        ".Grid-module__gridDisplayGrid_2X7cDTY7pjoTwwvSRQbt9Y > .DealGridItem-module__dealItemDisplayGrid_e7RQVFWSOrwXBX4i24Tqg DealGridItem-module__withBorders_2jNNLI6U1oDls7Ten3Dttl DealGridItem-module__withoutActionButton_2OI8DAanWNRCagYDL2iIqN"
    );

    for (product of mainDiv) {
        try {
            const title = await product.$eval(
                (el) =>
                    el.querySelector(".DealContent-module__truncate_sWbxETx42ZPStTc9jwySW")
                        .textContent
            );

            console.log(title);
        } catch {}
    }
}

run();
