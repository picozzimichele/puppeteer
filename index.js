const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: "new" });
    // Open a new page
    const page = await browser.newPage();
    // go to the specified url
    await page.goto(
        "https://jobs.careers.microsoft.com/global/en/search?lc=Milano%2C%20Italy&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true&ulcs=false&ref=cms"
    );

    //await page.screenshot({ path: "screenshot.png", fullPage: true });
    //await page.pdf({ path: "page.pdf", format: "A4" });
    //const html = await page.content();

    // fs.writeFile("page.html", await page.content(), function (err) {
    //     if (err) throw err;
    //     console.log("Saved!");
    // });

    // close the browser at the end
    await browser.close();
}

run();
