import * as utils from '../src/utils.js';
// import {registerBidder} from '/bidderFactory.js';
import { registerBidder } from '../src/adapters/bidderFactory.js';

const ENDPOINT_URL = 'http://localhost:3000/bid'

const AdvertiseXAdapter = {
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

        console.log('AdvertiseXAdapter_validBidRequests: ', validBidRequests)

        const requests = validBidRequests.map(bid => {
            const requestObject = {
                method: 'POST',
                url: ENDPOINT_URL,
                data: JSON.stringify({
                    adUnitCode: bid.params.adUnitCode,
                    sizes: bid.sizes,
                    bidId: bid.bidId,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            console.log('requestObject ***************:', requestObject);


            return {
                method: 'POST', // Request method
                url: ENDPOINT_URL, // Endpoint URL
                data: JSON.stringify({ // Request data
                    adUnitCode: bid.params.adUnitCode, // Ad unit code
                    sizes: bid.sizes, // Ad sizes
                    bidId: bid.bidId, // Bid ID
                }),
                headers: {
                    'Content-Type': 'application/json'
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
        // const serverBody  = serverResponse.body;
        // const headerValue = serverResponse.headers.get('some-response-header');

        console.log('interpretResponse (serverResponse): ', serverResponse)
        console.log('interpretResponse (bidRequest): ', bidRequest)

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
        } = serverResponse.body


        const bidResponses = [];
        const bidResponse = {
            requestId: requestId,
            creativeId: creativeId,
            cpm: cpm,
            width: width,
            height: height,
            dealId: 'test-deal-id-1',
            currency: currency,
            netRevenue: netRevenue,
            ttl: ttl,
            referrer: 'test-referrer',
            ad: ad
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

// registerBidder(spec);

// pbjs.registerBidAdapter({
//     bidder: 'AdvertiseX',
//     adapter: AdvertiseXAdapter
// }, 'AdvertiseX');

registerBidder(AdvertiseXAdapter);
