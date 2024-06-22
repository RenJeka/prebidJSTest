const ENDPOINT_URL = 'http://localhost:3000/bid'

import {registerBidder} from '/bidderFactory.js';

const AdvertiseXAdapter = () => {return {
        code: 'AdvertiseX',
        // supportedMediaTypes: ['Banner'],
        /**
         * Determines whether or not the given bid request is valid.
         *
         * @param {BidRequest} bid The bid params to validate.
         * @return boolean True if this is a valid bid, and false otherwise.
         */
        isBidRequestValid: function(bid) {

            console.log('isBidRequestValid: ', bid)
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

            console.log('buildRequests: ', validBidRequests)
            const payload = {
                test: 111
            };
            const payloadString = JSON.stringify(payload);

            console.log('ENDPOINT_URL:', ENDPOINT_URL);

            return {
                method: 'POST',
                url: ENDPOINT_URL,
                data: payloadString,
            };
        },
        /**
         * Unpack the response from the server into a list of bids.
         *
         * @param {ServerResponse} serverResponse A successful response from the server.
         * @return {Bid[]} An array of bids which were nested inside the server.
         */
        interpretResponse: function(serverResponse, bidRequest) {
            // const serverBody  = serverResponse.body;
            // const headerValue = serverResponse.headers.get('some-response-header');

            console.log('interpretResponse (serverResponse): ', serverResponse)
            console.log('interpretResponse (bidRequest): ', bidRequest)
            const bidResponses = [];
            const bidResponse = {
                requestId: bidRequest.bidId,
                cpm: CPM,
                width: WIDTH,
                height: HEIGHT,
                creativeId: CREATIVE_ID,
                dealId: DEAL_ID,
                currency: CURRENCY,
                netRevenue: true,
                ttl: TIME_TO_LIVE,
                referrer: REFERER,
                ad: CREATIVE_BODY
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
}

// registerBidder(spec);

// pbjs.registerBidAdapter({
//     bidder: 'AdvertiseX',
//     adapter: AdvertiseXAdapter
// }, 'AdvertiseX');

console.log('pbjs:', pbjs);


registerBidder(AdvertiseXAdapter);