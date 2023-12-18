import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

async function run(pagesToScrape) {
    try {
        if (!pagesToScrape) {
            pagesToScrape = 1;
        }
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: "./data/quotestoscrape",
        });
        const page = await browser.newPage();
        await page.goto("https://quotes.toscrape.com/");

        const grabQuotes = await page.evaluate(() => {
            let quotesArray = [];
            //get all the quotes div tags
            const quotes = document.querySelectorAll("div.quote");

            //loop through the quotes div tags
            quotes.forEach((quoteTag) => {
                //get the spans in the quote div tag
                const quoteSpans = quoteTag.querySelectorAll("span");
                //get the first span text
                const quoteText = quoteSpans[0].innerText;
                //get the second span small div inside
                const spanAuthor = quoteSpans[1].querySelector("small");
                //get the small div text
                const authorText = spanAuthor.innerText;
                //push the quote and author text to the quotesArray
                quotesArray.push({ quoteText, authorText });
            });
            return quotesArray;
        });

        console.log({ grabQuotes });

        // await page.click("a[href='/login']");

        //browser.close();
    } catch (e) {
        console.log({ e });
    }
}

run(5);
