import * as utils from 'prebid.js/src/utils';
import {config} from 'prebid.js/src/config';
import {registerBidder} from 'prebid.js/src/adapters/bidderFactory';
import {BANNER} from 'prebid.js/src/mediaTypes.js';
const BIDDER_CODE = 'AdvertiseX';
export const spec = {
        code: BIDDER_CODE,
        supportedMediaTypes: [BANNER],
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
     * Register the user sync pixels which should be dropped after the auction.
     *
     * @param {SyncOptions} syncOptions Which user syncs are allowed?
     * @param {ServerResponse[]} serverResponses List of server's responses.
     * @return {UserSync[]} The user syncs which should be dropped.
     */
    getUserSyncs: function(syncOptions, serverResponses, gdprConsent, uspConsent) {

        console.log('getUserSyncs:', getUserSyncs);

        const syncs = []

        let gdpr_params;
        if (typeof gdprConsent.gdprApplies === 'boolean') {
            gdpr_params = `gdpr=${Number(gdprConsent.gdprApplies)}&gdpr_consent=${gdprConsent.consentString}`;
        } else {
            gdpr_params = `gdpr_consent=${gdprConsent.consentString}`;
        }

        if (syncOptions.iframeEnabled) {
            syncs.push({
                type: 'iframe',
                url: '//acdn.adnxs.com/ib/static/usersync/v3/async_usersync.html?' + gdpr_params
            });
        }
        if (syncOptions.pixelEnabled && serverResponses.length > 0) {
            syncs.push({
                type: 'image',
                url: serverResponses[0].body.userSync.url + gdpr_params
            });
        }
        return syncs;
    },

    /**
     * Register bidder specific code, which will execute if bidder timed out after an auction
     * @param {data} Containing timeout specific data
     */
    onTimeout: function(data) {
        // onTimeout handler
    },

    /**
     * Register bidder specific code, which will execute if a bid from this bidder won the auction
     * @param {Bid} The bid that won the auction
     */
    onBidWon: function(bid) {
        // onBidWon handler
    },

    /**
     * Register bidder specific code, which will execute when the adserver targeting has been set for a bid from this bidder
     * @param {Bid} The bid of which the targeting has been set
     */
    onSetTargeting: function(bid) {
        // onSetTargeting handler
    },

    /**
     * Register bidder specific code, which will execute if the bidder responded with an error
     * @param {error, bidderRequest} An object with the XMLHttpRequest error and the bid request object
     */
    onBidderError: function({ error, bidderRequest }) {
        // onBidderError handler
    }
}

registerBidder(spec);
