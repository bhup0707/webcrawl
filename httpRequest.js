const needle = require("needle");
const { parseAmazonProductDetails } = require('./parser/pdpPage');
const { parseAmazonBarndReview } = require('./parser/brandReview');
const { parseAmazonProductSearch } = require('./parser/productSearch');

async function getRequest(url, ACTION_TYPE) {
    try {
        const urlText = await needle("get", url);
        switch (ACTION_TYPE) {
            case 'pdSearch': return parseAmazonProductDetails(urlText.body);
            case 'pdreview': return parseAmazonBarndReview(urlText.body);
            default: return parseAmazonProductSearch(urlText.body);
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getRequest
}

// const productUrl = 'https://www.amazon.in/Dell-KB216-Wired-Multimedia-Keyboard/dp/B00ZYLMQH0'; // Example URL, replace with the actual product URL
// const actionType = 'pdSearch'; // Since we want to fetch product details

// // Call the getRequest function and print the result
// getRequest(productUrl, actionType)
//     .then(result => {
//         console.log(result); // This will print the parsed product details to the console
//     })
//     .catch(error => {
//         console.error("Failed to fetch or parse product details:", error);
//     });
