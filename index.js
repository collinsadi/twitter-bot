require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient,twitterBearer } = require("./twitterClient.js")
const CronJob = require("cron").CronJob;
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const excitingTweets = require('./tweets.js');
const cron = require("node-cron");


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})



const tweet = async () => {
  try {
    // await twitterClient.v2.tweet("Testing Twitter Bot!!!");


    const randomIndex = Math.floor(Math.random() * excitingTweets.length);
    const tweetText = excitingTweets[randomIndex];
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweeted: ", tweetText)
  } catch (e) {
    console.log(e)
  }
}

// tweet()



const startServer = cron.schedule("*/5 * * * *", async () => {
   
    console.log("Cron job ran!");
});

startServer.start();

// You can stop the Cron Job if needed using: cronTweet.stop();




const cronTweet = new CronJob("0 */3 * * *", async () => {
  try {
    // Generate a random index to select a tweet from the array
    const randomIndex = Math.floor(Math.random() * excitingTweets.length);
    const tweetText = excitingTweets[randomIndex];
    await twitterClient.v2.tweet(tweetText);
  } catch (e) {
    console.log(e);
  }
});

// Start the cron job
cronTweet.start();
// cronTweet.start();