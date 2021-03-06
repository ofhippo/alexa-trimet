[![Build Status](https://travis-ci.org/davidmerrick/alexa-trimet.svg?branch=master)](https://travis-ci.org/davidmerrick/alexa-trimet)

Alexa Skill for TriMet Arrivals, written in NodeJS. This is meant to be run as an AWS Lambda function, with the following environment variables set:

* APP_ID: Alexa App ID.
* TRIMET_API_KEY: API key for TriMet. To get one, visit https://developer.trimet.org/.

## Usage

Demo: https://youtu.be/RfubHgSd7zo

"Alexa, open TriMet."

"Alexa, ask TriMet about stop 755."

"Alexa, ask TriMet to get next arrivals for bus 20 at stop 755."

etc.

(See /speechAssets for the intent schema and sample utterances)

## Future

* Currently, requires routes to be specified numerically, but I'm planning on adding support for addresses via the Google Maps Geocode API.

