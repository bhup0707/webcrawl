const { main } = require('./index');



const express = require('express');
const { main } = require('./index'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

app.post('/getProductDetails', async (req, res) => {
    const { asin } = req.body;

    if (!asin) {
        return res.status(400).send({ error: 'ASIN is required' });
    }

    const args = {
        ACTION_TYPE: 'pdSearch', 
        asin: asin 
    };

    try {
        // Call the main function and wait for the result
        const response = await main(args);
        res.json(response); // Send the result back to the client
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch product details' });
    }
});

app.listen(port, () => {
    console.log(`API server running on port ${port}`);
});
