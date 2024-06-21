const express = require('express');
const app = express();
const port = 4100;

app.use(express.json());

app.post('/bid', (req, res) => {
    const bidRequest = req.body;

    if (bidRequest.placementId && bidRequest.sizes) {
        // MOCK answer
        const bidResponse = {
            requestId: bidRequest.requestId,
            cpm: 1.50, // cost (per 1000 impressions)
            width: bidRequest.sizes[0][0],
            height: bidRequest.sizes[0][1],
            ad: '<div>Sample Ad</div>', // Ad html template
            ttl: 300, // time to live
            creativeId: 'sample_creative',
            netRevenue: true,
            currency: 'USD'
        };
        res.json(bidResponse);
    } else {
        res.status(400).send('Invalid bid request');
    }
});

app.listen(port, () => {
    console.log(`PrebidJS server listening at http://localhost:${port}`);
});
