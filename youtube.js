import puppeteer from "puppeteer";
const log = console.log;
// node youtube.js "Konichi Value"
const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : "Green Day";
// export SEARCHT_TERM="Konichi Value"
const searchTermENV = process.env.SEARCH_TERM || "Konichi Value";

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

    await page.goto("https://www.youtube.com");
    await page.waitForSelector("#search-input #search");
    await page.type("#search-input #search", searchTermCLI, { delay: 100 });

    await Promise.all([page.waitForNavigation(), page.click("#search-icon-legacy")]);

    //wait for next page to load
    await page.waitForSelector("ytd-video-renderer h3 a#video-title");

    //take screenshot of the page
    //one $ gets the first element two $$ gets all elements
    const firstMatch = await page.$eval(
        "ytd-video-renderer h3 a#video-title",
        (el) => el.innerText
    );

    log({ firstMatch });

    await Promise.all([
        page.waitForNavigation(), //waitForNetwoirkIdle()
        page.click("ytd-video-renderer h3 a#video-title"),
        // allows us to have a timeout
        // new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);

    await page.waitForSelector("ytd-comments-header-renderer");
    const totalComments = await page.$eval(
        "ytd-comments-header-renderer h2 yt-formatted-string span",
        (span) => span.innerText
    );

    log({ totalComments });

    await browser.close();
})();
