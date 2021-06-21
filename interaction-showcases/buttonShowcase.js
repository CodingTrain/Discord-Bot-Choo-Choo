const getDefaultEmbed = require("../utils/getDefaultEmbed")
const blackListChannels = [];
const fs = require('fs')
const getDatabase = require("../utils/getDatabase")
//TODO: add blackListChannels ids

module.exports = {
    name:"buttonShowcase",
    description:"Showcase buttons by earning points from random coding train characters.",
    async execute(msg) {
        
        const spawnChance = 0;

        const characterImages = fs.readdirSync("././img").filter(file => file.endsWith('.png'));
        const selected_file = characterImages[Math.floor(Math.random()*characterImages.length)];
        const character_name = selected_file.slice(0,-4);

        if(Math.random() < spawnChance){
            const reactionEmoji = '👍';
            reactionmessage =  await msg.channel.send(new getDefaultEmbed()
            .setTitle(`A wild ${character_name} has appeared`)
            .addFields({name:"Earn a point by catching it before it runs!", value:"Click the reaction to catch!"})
            .attachFiles(`././img/${selected_file}`)
            .setImage(`attachment://${selected_file}`)
            .setThumbnail())
            ;
            await reactionmessage.react('👍');
            await reactionmessage.awaitReactions(
                (reaction,user)=>{
                    return (reactionEmoji==reaction.emoji.name && user.id == msg.author.id)
                },
            {max:1, time:10000, errors: ['time']})
            .then(
                async collectedReactions =>{
                    //add points to user
                    const discordID = msg.author.id;
                    const collectionsData = getDatabase("Collections");
                    const cursor = collectionsData.find();
                    const userData = await cursor.filter({"discordID":discordID}).toArray();
                    let collected;
                    //Add or change the entry depending on previous entry
                    if(userData.length){
                        collected = userData[0]["collected"];
                        if(!Object.keys(collected).includes(character_name)){
                            collected[character_name]= 0
                        }
                    }
                    else{
                        collected = {}
                        collected[character_name] = 0; 
                    }

                    collected[character_name] += 1

                    const newEntry = {
                        "discordID": discordID,
                        "collected": collected
                    }

                    await collectionsData.replaceOne({"discordID":discordID}, newEntry, {"upsert":true});
                    console.log(collected)

                    successmessage = await msg.channel.send(new getDefaultEmbed()
                    .setTitle(`You caught ${character_name}.`)
                    .addFields({name:"Well done!!", value:`You have caught ${character_name} ${collected[character_name]} times!`})           
                    .setThumbnail(`attachment://${selected_file}`)
                    )
                    setTimeout(()=>successmessage.delete(),3000); 
                }
            ).catch(
                async collectedReactions =>{
                    failedmessage = await msg.channel.send(new getDefaultEmbed(false)
                    .setTitle(`You failed to catch the ${character_name}.`)
                    .addFields({name:"Better luck next time!", value:"Make sure to react within 10 seconds."})           
                    .setThumbnail(`attachment://${selected_file}`)
                    )
                    setTimeout(()=>failedmessage.delete(),3000); 
                }
            )
            reactionmessage.delete();
        }    
    }
}