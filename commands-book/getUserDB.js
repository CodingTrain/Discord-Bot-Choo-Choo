const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")


module.exports = async function (msg, args) {
  
    collectionUsers = getDatabase()

    let responseText = "No users are found.";
    let success = false;

    //Check user permissions
    if(!msg.member.permissions.has("ADMINISTRATOR")){
        responseText = "You don't have permission to use this command!"
    }else{
        //Connect to database, no filter
        cursor2 = collectionUsers.find();
        allUsers = await cursor2.toArray();

        //Create string with all supporter entries
        if(allUsers.length){
            success = true;
            responseText=""
            for(supporter of allUsers){
                if(supporter.discordID != "bookPosition"){
                    let tag = (await msg.client.users.fetch(supporter.discordID)).tag
                    responseText += `${tag} with the number ${supporter.randomNumber} at position ${supporter.position}\n`
                }
            }
        }
    }

    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    .addFields(
        {name:"The users:", value:responseText}
    )
    msg.channel.send(reactionEmbed)
}