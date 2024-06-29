const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

app.post('/bid', (req, res) => {
    const bidRequest = {
        placementId: 12345,
        sizes: [[200, 150]]
    }

    if (bidRequest.placementId && bidRequest.sizes) {
        const width = bidRequest.sizes[0][0]
        const height = bidRequest.sizes[0][1]

        // MOCK answer
        const bidResponse = {
            cpm: 1.50, // The bid price (cost per 1000 impressions).
            width: width,
            height: height,
            ad: `
                <div style="width: ${width}px; height: ${height}px; background-color: antiquewhite; display: flex; align-items: center; justify-content: center;">
                    <div>
                        <h4>AdvertiseX AD header</h4>
                        <p>AdvertiseX AD body</p>
                    </div>
                </div>
            `, // Ad html template
            ttl: 300, // time to live (in sec)
            creativeId: 'sample_creative',
            netRevenue: true,
            currency: 'USD',
            adId: 'unique-ad-id-12345'
        };
        res.json(bidResponse);
    } else {
        res.status(400).send('Invalid bid request');
    }
});

const mockServer = app.listen(port, () => {
    console.log(`PrebidJS server listening at http://localhost:${port}`);
});

module.exports = mockServer;
