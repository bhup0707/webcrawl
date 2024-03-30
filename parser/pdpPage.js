const cheerio = require("cheerio");
const needle = require('needle');

function parseAmazonProductDetails(html) {
  const $ = cheerio.load(html);
  const title = $("#productTitle").text().trim();
  const price = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay>span.a-offscreen").text().trim();
  const mrp = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span:nth-child(2)").text().trim();
  const result = { title, price, mrp };
  return result;
}
module.exports = {
  parseAmazonProductDetails
};

//const { parseAmazonProductDetails } = require('./parseAmazonProductDetails'); // Correctly importing the function

async function fetchHtmlContent(url) {
  try {
    const response = await needle('get', url);
    return response.body;
  } catch (error) {
    console.error("Error fetching HTML content:", error);
    return null;
  }
}

async function fetchAndParseProductDetails(url) {
  const htmlContent = await fetchHtmlContent(url);
  //console.log(htmlContent)
  if (htmlContent) {
    const $ = cheerio.load(htmlContent); 
    const productDetails = parseAmazonProductDetails($); 
    console.log(productDetails);
  } else {
    console.log("Failed to fetch or parse HTML content.");
  }
}

const productUrl = 'https://www.amazon.in/Dell-KB216-Wired-Multimedia-Keyboard/dp/B00ZYLMQH0'; // Example product URL
fetchAndParseProductDetails(productUrl);
