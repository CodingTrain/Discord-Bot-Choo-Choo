const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")


module.exports = async function (msg, args) {
  
    collectionUsers = await getDatabase()

    let responseText = "";
    let success = false;

    //Connect to database, filter to get users data
    cursor2 = collectionUsers.find();
    userData = await cursor2.filter({"discordID":msg.author.id}).toArray();

    //Validate if data exists
    if(userData.length){
        success = true;
        responseText = `${msg.member.displayName}, your saved random number is ${userData[0]["randomNumber"]}`
    }
    else{
        responseText = "You haven't set a number yet! Use !setmynumber <number> to set it!"
    }
    
    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    .addFields(
        {name:"What I found in my dusty storage:", value:responseText}
    )
    msg.channel.send(reactionEmbed)
}