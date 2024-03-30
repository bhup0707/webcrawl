const { getRequest } = require('./httpRequest');
const { AMAZON_PDP_END_POINT, AMAZON_BRAND_REVIEW_END_POINT, AMAZON_PRODUCT_SEARCH_END_POINT } = require('./constants');

async function main(args) {
    // console.log(process.argv[2]);
    // args = { "ACTION_TYPE": "pdreview", "asin": "B08KT6H1W7", mp_id: "A21TJRUUN4KGV", seller_id: "A2NDGXRB4XLOJ9" };

    const ACTION_TYPE = args.ACTION_TYPE;
    try {
        if (ACTION_TYPE === 'pdSearch') {
            const asin = args.asin;
            const amazonPdpUrl = `${AMAZON_PDP_END_POINT}${asin}`;
            const result = await getRequest(amazonPdpUrl, ACTION_TYPE);
            return { body: result };
        }
        else if (ACTION_TYPE === 'pdreview') {
            const mp_id = args.mp_id;
            const seller_id = args.seller_id;
            const amazonReviewUrl = `${AMAZON_BRAND_REVIEW_END_POINT}marketplaceID=${mp_id}&seller=${seller_id}`;
            const result = await getRequest(amazonReviewUrl, ACTION_TYPE);
            return { body: result };
        }
        else {
            const asin = args.asin;
            const amazonDescUrl = `${AMAZON_PDP_END_POINT}${asin}`;
            const result = await getRequest(amazonDescUrl);
            return { body: result };
        }

    } catch (e) {
        console.log(e);
        return {
            "body": { "error": e.message },
            "statusCode": 400
        };
    }
    
};
module.exports.main = main;
// main(process.argv[2]);



// const args = { ACTION_TYPE: 'pdSearch', asin: 'B07WGPBNTC' };
// main(args).then(response => {
//     console.log(response); // This will print the result to the console
// });
