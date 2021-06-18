const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")

//TODO: Fix text overflow + add pagination
module.exports = {
    name:"userdb",
    description:"Admin command, get the list of users with their number.",
    async execute(msg, args) {
  
    collectionUsers = getDatabase()

    let responseText = "No users are found.";
    let success = false;

    //Check user permissions
    if(!msg.member.permissions.has("ADMINISTRATOR") && !msg.member.roles.cache.has("660550479700557855")){
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
                    let tag;
                    try{
                        let user = await msg.client.users.fetch(supporter.discordID)
                        tag = user.tag
                    }
                    catch{
                        tag = "deleted user"
                    }
                    next =  `${tag} with the number ${supporter.randomNumber} at position ${supporter.position}\n`
                    if(responseText.length + next.length<1023){
                        responseText += next
                    }
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
}};