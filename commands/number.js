// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_URI);
let numbersDB;

connectDB().catch(console.error);

async function connectDB() {
  try {
    // Connect to the MongoDB cluster
    await mongoClient.connect();
    numbersDB = mongoClient.db("numbers").collection("people");
    // const all = await getRunners();
    // console.log(`There are ${all.length} database entries`);
  } catch (e) {
    console.error(`MongoDB connection error: ${e}`);
  } finally {
    // await mongoClient.close();
  }
}

module.exports = function (msg, args) {
  if (args.length > 0 && /^\d+$/.test(args[0])) {
    msg.channel.send(`Number set to ${args[0]}`);
  } else {
    msg.channel.send(`Please provide a valid whole number.`);
  }
};
