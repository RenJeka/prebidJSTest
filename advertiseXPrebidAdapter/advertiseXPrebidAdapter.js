import { registerBidder } from '../src/adapters/bidderFactory.js';

const ENDPOINT_URL = 'http://localhost:3000/bid'

const AdvertiseXAdapter = {
    code: 'AdvertiseX',
    supportedMediaTypes: ['banner'],

    /**
     * Determines whether or not the given bid request is valid.
     *
     * @param {BidRequest} bid The bid params to validate.
     * @return boolean True if this is a valid bid, and false otherwise.
     */
    isBidRequestValid: function(bid) {
        // return !!(bid.params);
        return true;
    },

    /**
     * Make a server request from the list of BidRequests.
     *
     * @param {validBidRequests[]} - an array of bids
     * @return ServerRequest Info describing the request to the server.
     */
    buildRequests: function(validBidRequests) {
        const requests = validBidRequests.map(bid => {
            return {
                method: 'POST',
                url: ENDPOINT_URL,
                data: JSON.stringify({
                    adUnitCode: bid.params.adUnitCode,
                    sizes: bid.sizes,
                    bidId: bid.bidId,
                }),
                options: {
                    contentType: 'application/json'
                }
            };
        });

        return requests;
    },

    /**
     * Unpack the response from the server into a list of bids.
     *
     * @param {ServerResponse} serverResponse A successful response from the server.
     * @return {Bid[]} An array of bids which were nested inside the server.
     */
    interpretResponse: function(serverResponse, bidRequest) {

        const bidResponses = [];
        let requestData = bidRequest.data;

        // Parse request data if it's needed
        if (typeof requestData === 'string') {
            requestData = JSON.parse(requestData);
        }

        const {
            cpm,
            requestId,
            creativeId,
            width,
            height,
            currency,
            netRevenue,
            ttl,
            ad,
            adId,
        } = serverResponse.body

        const bidResponse = {
            requestId: requestData.bidId,
            creativeId: creativeId,
            cpm: cpm,
            width: width,
            height: height,
            dealId: 'test-deal-id-1',
            currency: currency,
            netRevenue: netRevenue,
            ttl: ttl,
            referrer: 'test-referrer',
            ad: ad,
            adId: adId
        };
        bidResponses.push(bidResponse);

        return bidResponses;
    },


    /**
     * Register bidder specific code, which will execute if bidder timed out after an auction
     * @param {data} Containing timeout specific data
     */
    onTimeout: function(data) {
        console.warn('timeout: ', data)
        // onTimeout handler
    },

    /**
     * Register bidder specific code, which will execute if a bid from this bidder won the auction
     * @param {Bid} The bid that won the auction
     */
    onBidWon: function(bid) {
        console.log(`bid won: `, bid)
    },

    /**
     * Register bidder specific code, which will execute if the bidder responded with an error
     * @param {error, bidderRequest} An object with the XMLHttpRequest error and the bid request object
     */
    onBidderError: function({ error, bidderRequest }) {
        console.error(`Error: `, error)
    }
}

registerBidder(AdvertiseXAdapter);
