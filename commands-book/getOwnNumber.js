const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")


module.exports = {
    name:"mynumber",
    description:"Check your own number! If you haven't set one, use %prefix%set <number>",
    async execute(msg, args) {
  
    collectionUsers = await getDatabase()


    //Connect to database, filter to get users data
    cursor2 = collectionUsers.find();
    userData = await cursor2.filter({"discordID":msg.author.id}).toArray();

    //Validate if data exists
    if(userData.length){
        const reactionEmbed = getDefaultEmbed(true)
        .setTitle("What I found in my dusty storage:")
        .addFields(
            {name:"Username", value: msg.member.displayName, inline:true},
            {name:"Position", value: userData[0]["position"], inline:true},
            {name:"Number", value: userData[0]["randomNumber"], inline:true},
           )
        msg.channel.send(reactionEmbed)
        
    }
    else{
        const reactionEmbed = getDefaultEmbed(false)
        .addFields(
            {name:"What I found in my dusty storage:", value:`You haven't set a number yet, use ?set <number> to set one!`}
        )
        msg.channel.send(reactionEmbed)
    }
    

}};