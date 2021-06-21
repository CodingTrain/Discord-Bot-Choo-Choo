const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGOURL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collectionList = ["Users", "Collections"];
let collections = {}

client.connect(async err => {
  for(collectionName of collectionList){
    collections[collectionName] = client.db("RandomWalk").collection(collectionName);
  }

});

module.exports = function (target = "Users") {

  if(collectionList.includes(target)){
    resultCollection = collections[target];
  }

  else{
    throw new Error("YOU FOOL!");
  }

  return(resultCollection)
}