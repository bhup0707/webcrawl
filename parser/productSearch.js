const cheerio = require("cheerio");

function parseAmazonProductSearch(data) {
  const items = [];
  try {
    const $ = cheerio.load(data);
    const list = $(".a-section a-spacing-small");
    // list.each((i, el) => {
      // const description = list.find(".a-section a-spacing-small").text();
      // console.log(list)
    //   const price = $(el).find(".a-price-whole").text().replace(".", "");
    //   const image = $(el).find(".s-image").attr("src");
    //   const link = $(el).find(".a-link-normal").attr("href");
    //   const rating = $(el).find(".aok-align-bottom .a-icon-alt").text();
    //   const review = $(el).find(".s-link-style .s-underline-text").text();
    //   const nid = $(el).find(".sg-col-inner > div").attr("data-csa-c-item-id");
    //   var descArray = description.replaceAll("|", ",").split(",");
    //   items.push({
    //     image: image,
    //     priceShow:
    //       price == ""
    //         ? null
    //         : `$ ${price} ~ Rs, ${Math.round(price.replaceAll(",", "") * 130)}`,
    //     name: descArray[0],
    //     id: nid,
    //     sellerName: "",
    //     description: descArray,
    //     productUrl: "https://www.amazon.com/" + link,
    //     price: price,
    //     ratingScore: rating.split(" ")[0],
    //     review: review,
    //   });
    // }
    // );
    // JSON.stringify
    // console.log("items", list);
  } catch (err) {
    console.log(err);
  }
  return items;
}

module.exports = {
  parseAmazonProductSearch
};