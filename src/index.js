'use strict';

import Alexa from 'alexa-sdk'
import TriMetAPI from 'trimet-api-client'
import SpeechHelper from './utils/SpeechHelper'

const INVOCATION_NAME = process.env.INVOCATION_NAME || "next train";
const APP_ID = process.env.APP_ID;
const triMetAPIInstance = new TriMetAPI(process.env.TRIMET_API_KEY);

// Note: these functions can't be ES6 arrow functions; "this" ends up undefined if you do that.
const handlers = {
    'LaunchRequest': function(){
        const rosaParks = 11502;

        triMetAPIInstance.getSortedFilteredArrivals(rosaParks)
            .then(arrivals => {
                let nextArrivals = arrivals.splice(0,2);
                const minutesPronunciation = nextArrivals.map((arrival) =>
                    SpeechHelper.getMinutePronunciation(arrival.getMinutesUntilArrival())
                ).join(' and ');
                
                let responseText = `The next train${nextArrivals.length == 1 ? ' is' : 's are'} in ${minutesPronunciation}.`;
                this.emit(':tell', responseText);
                return;
            })
            .catch(err => {
                console.error(err);
                this.emit(':tell', `Sorry, an error occurred retrieving arrival times`);
                return;
            });
    }
};

exports.handler = (event, context, callback) => {
    let alexa = Alexa.handler(event, context);
    // Only set appId if not debugging
    if ('undefined' === typeof process.env.DEBUG) {
        alexa.appId = APP_ID;
    }
    alexa.registerHandlers(handlers);
    alexa.execute();
};