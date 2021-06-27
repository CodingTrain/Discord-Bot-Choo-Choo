
const getNumbers = require("../utils/getNumbers")
const getIndexes = require("../utils/getIndexes")
const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")
const randoms = getNumbers();

module.exports = {
name:"assign",
description:"Admin command, assign a number to a user. %prefix%assign <userID> <position>",
async execute(msg, args) {

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
      responseText = "Please enter a valid userID when assigning a position."
    }
    else{
      let position = args[1]

      //Check user input
      if(!position || position != parseInt(position)){
        responseText = "Please enter a valid position when assigning a position."
      }
      else{

        //Remove all used positions
        let usedIndexes = []

        //Filter available positions for supporters

        for(entry of allUsers){
          usedIndexes.push(+entry["position"])
        }
        

        if(usedIndexes.includes(+position)){
            responseText = `The position ${position} is already chosen by a supporter! \n Please choose another one!`
        }
        else{


          //Create database entry
          let newEntry = {
            "discordID":`${discordID}`,
            "randomNumber": `${randoms[position]}`,
            "position": `${position}`,
            "supporter": `true`
          }

          let cursor2 = collectionUsers.find();
          let userData = await cursor2.filter({"discordID":discordID}).toArray();

          //Add or change the entry depending on previous entry
          if(userData.length){
            await collectionUsers.replaceOne({"discordID":discordID}, newEntry);
            responseText =  `I have changed ${discordID} to the number ${randoms[position]} on position ${position} in my storage!`
          }
          else{
              await collectionUsers.insertOne(newEntry);
              responseText =  `I have added ${discordID} with the number ${randoms[position]} on position ${position} to my storage!`
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
}};