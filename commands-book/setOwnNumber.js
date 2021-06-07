const getNumbers = require("../utils/getNumbers")
const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getIndexes = require("../utils/getIndexes")
const getDatabase = require("../utils/getDatabase")
const getRandomNumber = require("../utils/getRandomNumber")
const randoms = getNumbers();


module.exports = async function (msg, args) {
    let number = args[0]
    let success = false;
    let responseText = "";
    let supporter = false;
    collectionUsers = getDatabase()
    let cursor = collectionUsers.find();
    let allUsers = await cursor.toArray();

    //Check if user is a supporter
    if(msg.member.roles.cache.has("664644927300435988")||msg.member.roles.cache.has("664825696912146453")||msg.member.roles.cache.has("660550479700557855")||msg.member.roles.cache.has("660550479700557855")){
        supporter = true;
    }

    //Assign random value if user is no supporter or entered no value
    if(!(supporter && number)  ){
        number = await getRandomNumber(supporter)
    }
    
    //Validate user input
    if(!number || number!=parseInt(number)){
        responseText = "BRRRRR... ERROR! Please provide a number for me to assign!"
    }
    else{

        const paddedNumber = number.toString().padStart(5, "0")
        let indexes = getIndexes(randoms, parseInt(paddedNumber))

        //Filter available positions for supporters
        if(supporter){
            for(entry of allUsers){
            indexes = indexes.filter(item => (0+item) != (0+entry["position"]))
            }
        }

        if(indexes.length == 0){
            responseText = "All positions for this number have been assigned! Please choose another."
        }
        else{
            //Assign next available position
            let position = indexes.shift();
            
            //Check for existing database entry
            cursor2 = collectionUsers.find();
            userData = await cursor2.filter({"discordID":msg.author.id}).toArray();

            //Create new database entry
            let newEntry = {
                "discordID":`${msg.author.id}`,
                "randomNumber": `${number}`,
                "position": `${position}`,
                "supporter": `${supporter}`
            }
            success = true;
        

            if(userData.length){
                await collectionUsers.replaceOne({"discordID":msg.author.id}, newEntry);
            }
            else{
                await collectionUsers.insertOne(newEntry);
            }

            responseText += `I have successfully saved the number ${number} to my memory for you ${msg.member.displayName}!`
        }
    }
    
    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    if(!supporter){
        reactionEmbed.addFields(
            {name:"Reminder:", value:'I have generated you a random number!\n Supporters can choose and assign their own number!'}
        )
    }

    reactionEmbed.addFields(
        {name:"My quantum memory says:", value:responseText}
    )
    
    msg.channel.send(reactionEmbed)
}