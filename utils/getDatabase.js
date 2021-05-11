const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGOURL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collectionUsers;

client.connect(async err => {

  collectionUsers = client.db("RandomWalk").collection("Users");

});

module.exports = function () {
    return(collectionUsers)
}