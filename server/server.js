import * as express from 'express'
import { v4 as uuidv4} from 'uuid'
const app = express();
const port = 4100;

app.use(express.json());

app.post('/bid', (req, res) => {
    const {width, height} = req.body;

    if (bidRequest.placementId && bidRequest.sizes) {
        // MOCK answer
        const bidResponse = {
            requestId: uuidv4(),
            cpm: 1.50, // The bid price (cost per 1000 impressions).
            width: width,
            height: height,
            ad: `
                <div style="width: ${bidRequest.width}px; height: ${bidRequest.height}px; background-color: antiquewhite; display: flex; align-items: center; justify-content: center;">
                    <div>
                        <h4>AdvertiseX AD header</h4>
                        <p>AdvertiseX AD body</p>
                    </div>
                </div>
            `, // Ad html template
            ttl: 300, // time to live (in sec)
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
