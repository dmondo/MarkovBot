# Markov Bot

Markov Bot uses as n-grams markov model trained on a given twitter user's timeline to generate tweets in their writing style.

Timelines are drawn from the Twitter REST api, which is rate-limited at 100,000 tweets/24hrs, so it is possible for models to fail to build if too many twitter handles are supplied in a short amount of time. Previously generated models are stored on a mongoDB server, so tweets can always be created for users whose handles have already been entered.

## Tech Stack

This project uses the MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack. Modules are written in TypeScript, compiled to JavaScript, transpiled for web compatibility using Babel, and bundled with Webpack. MongoDB CRUD is provided by Mongoose.

## Build Process

To contribute/run locally:

 install dependencies
<pre><code>> npm install </code></pre>

compile typescript
<pre><code>> tsc </code></pre>

bundle client
<pre><code>> npm run client:build </code></pre>

ensure you have a local instance of MongoDB running

either set process.env.MONGODB to your desired database, or edit the database url in server/db/index.ts

<pre><code>const connectURL = process.env.MONGODB ||
 'mongodb://YOUR_PATH/YOUR_DB';</code></pre>

either set process.env.PORT to your desired port, or edit the port in server/index.ts

<pre><code>const port = process.env.PORT || 3000;</code></pre>

launch server

<pre><code>> npm run server:start</code></pre>

or, in nodemon for development

<pre><code>> npm run server:dev</code></pre>