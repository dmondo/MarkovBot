# Markov Bot

Markov Bot trains an n-grams Markov model on a given Twitter user's timeline to generate tweets in their writing style!

Timelines are drawn from the Twitter REST api, which is rate-limited at 100,000 tweets/24hrs, so it is possible for models to fail to build if too many twitter handles are supplied in a short amount of time.

## Tech Stack

This project operates within a service oriented architecture: a RESTful Flask/Python3 API handles all modeling logic and surfaces Markov chains, and a MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack client consumes the API in order to display and persist generated tweets for the user. The companion API repo can be found [here](https://github.com/dmondo/MarkovAPI).

## The Nitty Gritty

MarkovBot is written in TypeScript (which compiles to JavaScript), which is then transpiled for web compatibility using Babel (phew...), and bundled with Webpack. It follows a (slightly) modified AirBnB style guide, enforced by the eslint file in the root directory. Data is persisted using the Mongoose ORM for MongoDB; external API calls are handled by node-fetch (see in particular the router.js file in the server directory). A .env-sample file is provided for you to base your own .env file off of. Testing is handled with the jest and enzyme libraries.

## Build Process

Ensure that you either have access to a MongoDB server, or are running a local instance. See the official [docs](https://docs.mongodb.com/manual/installation/) for installation instructions.

Install dependencies
<pre><code>> npm install </code></pre>

Set up your .env file. Following the .env-sample file: generate Twitter API keys through the Twitter Developer portal, find your MongoDB database url (if you're running locally this will look something like ```mongodb://localhost/db_name```), and find your API url (if you're running locally, this will be simply be the URL that the Flask API [repo](https://github.com/dmondo/MarkovAPI) is running on, which defaults to ```http://localhost:5000```).

Compile typescript
<pre><code>> tsc </code></pre>

Bundle client
<pre><code>> npm run client:build </code></pre>

Launch the server, which defaults locally to port 3000 unless your own .env file says otherwise
<pre><code>> npm run server:start</code></pre>

or, in nodemon with hot reloading for development
<pre><code>> npm run server:dev</code></pre>

...and now you should be ready to hack away.
