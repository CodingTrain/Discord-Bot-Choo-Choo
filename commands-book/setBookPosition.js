const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")


module.exports = {
    name:"setreading",
    description:"Admin commmand, Set where Shiffman last stopped reading the book of random numbers!",
    async execute(msg, args) {
    let success = false;
    let responseText;

    //Check user permissions
    if(!msg.member.permissions.has("ADMINISTRATOR")&& !msg.member.roles.cache.has("660550479700557855")){
        responseText = "You don't have permission to use this command!"
    }
    else{
        //Validate user input
        let [page, row, column] = args;
        if(!page || !row || !column || page != parseInt(page) || row != parseInt(row) || column != parseInt(column)){
            responseText = "Please provide a valid page, row and column!"
        }
        else{
            //Connect to database
            collectionUsers = await getDatabase()

            success = true;

            //Update the database entry
            let newEntry = {
                "discordID":"bookPosition",
                "page": `${page}`,
                "row": `${row}`,
                "column": `${column}`
            }
            await collectionUsers.replaceOne({"discordID":"bookPosition"}, newEntry);

            responseText = `You have updated the book position to: page ${page}, row ${row} and column ${column}.`

        }
    }
    
    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    .addFields(
		{ name: 'I stared at the book for a while!', value: responseText }
	)
    msg.channel.send(reactionEmbed)
}};