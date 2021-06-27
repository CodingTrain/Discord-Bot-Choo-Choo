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

    let usernames = ""
    let positions = ""
    let numbers = ""

    //Check user permissions
    if(!msg.member.permissions.has("ADMINISTRATOR") && !msg.member.roles.cache.has("660550479700557855")){
        return msg.channel.send(getDefaultEmbed(false).addField("What I found in my dusty storage:","You don't have permission to use this command!"))
    }
    else{
        //Connect to database, no filter
        cursor2 = collectionUsers.find();
        allUsers = await cursor2.toArray();

        //Create string with all supporter entries

        if(allUsers.length){
            success = true;
            responseText=""
            for(supporter of allUsers){
                if(supporter.discordID != "bookPosition"){
                    let username;
                    try{
                        let user = await msg.client.users.fetch(supporter.discordID)
                        username = user.username
                    }
                    catch{
                        username = "deleted user"
                    }

                    if(2+usernames.length + username.length<1023){
                        usernames += username + "\n"
                        positions += supporter.position + "\n"
                        numbers += supporter.randomNumber.padStart(5, "0") + "\n"
                    }
                }
            }
        }
    }

    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    .setTitle("What I found in my dusty storage:")
    .addFields(
        {name:"Username", value: usernames, inline:true},
        {name:"Position", value: positions, inline:true},
        {name:"Number", value: numbers, inline:true},
    )

    msg.channel.send(reactionEmbed)
}};