const getDefaultEmbed = require("../utils/getDefaultEmbed")
const fs = require('fs')
const getDatabase = require("../utils/getDatabase")
const paginationHandler = require("../utils/paginationHandler")

module.exports = {
    name:"inventory",
    description:"Showcase all the Coding Train characters you have caught.",
    async execute(msg) {
        
        const discordID = msg.author.id;
        const collectionsData = getDatabase("Collections");
        const cursor = collectionsData.find();
        const rawData = await cursor.filter({"discordID":discordID}).toArray()
        if(rawData.length == 0) return msg.channel.send(getDefaultEmbed(false).addFields({name:"Characters", value:"You haven't collected any characters yet."}))
        
        const characterNames = formatNames(Object.keys(rawData[0].collected));
        const characterCounts = Object.values(rawData[0].collected);

        let pages = []
        let i = 0;
        let pageSize = 5;
        while(i  < characterNames.length){
            let ids = []
            for(j=i;j < Math.min(i+pageSize, characterNames.length);j++){
                ids.push(j+1)
            }
            pages.push(
                getDefaultEmbed()
                .setTitle(`Your inventory.`)
                .addFields({name:"Id", value:ids, inline:true},{name:"Characters", value:`${characterNames.slice(i, Math.min(i+pageSize, characterNames.length)).join("\n")}`, inline:true}, {name:"Amount", value:`${characterCounts.slice(i, Math.min(i+pageSize, characterNames.length)).join("\n")}`, inline:true})
            )
            i += pageSize;
            
        }
        paginationHandler.paginate(msg, pages)
 
    }
}

function formatNames(names){
    capitalizedNames = []
    for(let name of names){
        parts = []
        nameParts = name.toLowerCase().split(" ");
        for(part of nameParts){
            part = part.charAt(0).toUpperCase() + part.slice(1);
            parts.push(part)
        }
        capitalizedNames.push(parts.join(" "));
    }
    return capitalizedNames;
}