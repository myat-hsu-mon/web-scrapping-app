const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

scrapeWebData = async (keyword) => {
  const url = `https://google.com/search?q=${keyword}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract the HTML content after the page is loaded
    const updatedHtml = await page.content();
    const $ = cheerio.load(updatedHtml);

    // Extract data using Cheerio selectors
    const resultStats = $("#result-stats").text();
    const totalNumberOfLinks = $("cite.tjvcx.GvPZzd.cHaqb").length;
    const totalNumberOfAdsWords = $(".uEierd").length;

    return {
      resultStats,
      totalNumberOfAdsWords,
      totalNumberOfLinks,
    //   htmlCode: updatedHtml,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  } finally {
    // Close the browser
    await browser.close();
  }
};
module.exports = { scrapeWebData };
