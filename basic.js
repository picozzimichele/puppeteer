import puppeteer from "puppeteer";

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
    await page.setGeolocation({ latitude: 52.52, longitude: 13.39 });
    await page.goto("https://www.google.com");

    const url = page.url();
    console.log({ url });

    const content = await page.content();
    console.log({ content });

    const screenshot = await page.screenshot({ path: "./screens/screenshot.png" });
    const screenshot2 = await page.screenshot(
        { path: "./screens/screenshot2.png" },
        { fullPage: true }
    );

    await page.type(".cssselector", "text");
    // this is useful for waiting for page to load
    await page.waitForSelector(".cssselector");

    await browser.close();
})();
