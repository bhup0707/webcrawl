const cheerio = require("cheerio");
const needle = require('needle');

function parseAmazonBarndReview(html) {
  try {
    const items = [];
    const $ = cheerio.load(html);
    const feedbackTable = $(".a-fixed-left-grid-inner");
    feedbackTable.each((i, el) => {
      const rating = $(el).find(".a-icon-alt").text();
      const comment = $(el).find(".a-text-quote").text();
      const customerNameAndDate = $(el).find(".a-size-small.a-color-secondary.feedback-rater").text();
      let customerName = "";
      let ratingDate = "";
      if (customerNameAndDate != undefined && customerNameAndDate.toLocaleLowerCase().indexOf("on")) {
        customerName = customerNameAndDate.split("on")[0];
        ratingDate = customerNameAndDate.split("on")[1];
        customerName = customerName != undefined ? customerName.replace("By", "").trim() : "";
        ratingDate = ratingDate != undefined ? ratingDate.replace(".", "").trim() : "";
      }
      items.push({
        rating: rating,
        comment: comment,
        name: customerName,
        date: ratingDate,
      });
    });
    return items;
  } catch (e) {
    console.log(e);
  }
}

async function fetchHTML(url) {
  try {
    const response = await needle('get', url);
    return response.body;
  } catch (error) {
    console.error("Error fetching HTML content:", error);
    return null;
  }
}

async function displayParsedReviews(url) {
  const htmlContent = await fetchHTML(url);
  if (htmlContent) {
    const reviews = parseAmazonBarndReview(htmlContent);
    console.log(reviews);
  } else {
    console.log("Failed to fetch or parse reviews.");
  }
}

const reviewPageUrl = "https://www.amazon.in/Dell-KB216-Wired-Multimedia-Keyboard/dp/B00ZYLMQH0";
displayParsedReviews(reviewPageUrl);



module.exports = {
  parseAmazonBarndReview
};