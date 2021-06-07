
const getNumbers = require("../utils/getNumbers")
const getIndexes = require("../utils/getIndexes")
const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")
const randoms = getNumbers();

module.exports = async function (msg, args) {

  collectionUsers = await getDatabase()

  let responseText;
  let success = false;

  //check permissions
  if(!msg.member.permissions.has("ADMINISTRATOR") && !msg.member.roles.cache.has("660550479700557855")){
    responseText = "You don't have permission to use this command!"
  }
  else{

    //Get database entries
    cursor = collectionUsers.find();
    allUsers = await cursor.toArray();

    let discordID = args[0]

    //Check user input
    if(!discordID || discordID != parseInt(discordID)){
      responseText = "Please enter a valid userID when assigning a random number"
    }
    else{
      let number = args[1]

      //Check user input
      if(!number || number != parseInt(number)){
        responseText = "Please enter a valid number when assigning a random number"
      }
      else{

        const paddedNumber = number.padStart(5, "0")
        let indexes = getIndexes(randoms, parseInt(paddedNumber))

        //Remove all used positions
        for(entry of allUsers){
          indexes = indexes.filter(item => (0+item) != (0+entry["position"]))
        }

        //Check if any positions are left
        if(indexes.length == 0){
          responseText = "All positions for this number have been assigned! Please choose another."
        }
        else{

          let position = indexes.shift();

          //Create database entry
          let newEntry = {
            "discordID":`${discordID}`,
            "randomNumber": `${number}`,
            "position": `${position}`,
            "supporter": `true`
          }

          let cursor2 = collectionUsers.find();
          let userData = await cursor2.filter({"discordID":discordID}).toArray();

          //Add or change the entry depending on previous entry
          if(userData.length){
            await collectionUsers.replaceOne({"discordID":discordID}, newEntry);
            responseText =  `I have changed ${discordID} to the number ${number} on position ${position} in my storage!`
          }
          else{
              await collectionUsers.insertOne(newEntry);
              responseText =  `I have added ${discordID} with the number ${number} on position ${position} to my storage!`
          }

          success = true
        }
      }
    }
  }
  
  //Send result message to chat
  const reactionEmbed = getDefaultEmbed(success)
  .addFields(
  { name: 'I have opened up my storage for you!', value: responseText }
  )
  msg.channel.send(reactionEmbed)
};