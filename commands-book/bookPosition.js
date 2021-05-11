const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")


module.exports = async function (msg, args) {
    

    let collectionUsers = await getDatabase()

    let responseText = "";
    let success = true;

    //Connect to database, grab bookPosition
    let cursor2 = collectionUsers.find();
    let bookInfo = (await cursor2.filter({"discordID":"bookPosition"}).toArray())[0];

    responseText = `Shiffman last read the book at page ${bookInfo["page"]}, row ${bookInfo["row"]} and column ${bookInfo["column"]}`
    
    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    .addFields(
		{ name: 'I looked back in time for you!', value: responseText }
	)
    msg.channel.send(reactionEmbed)
}