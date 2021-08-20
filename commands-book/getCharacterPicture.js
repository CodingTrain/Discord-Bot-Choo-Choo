const getDefaultEmbed = require("../utils/getDefaultEmbed")
const fs = require('fs')
const getDatabase = require("../utils/getDatabase")

module.exports = {
    name:"character",
    description:"Get the picture of a character based on the id in your %prefix%inventory.",
    async execute(msg, args) {
        const numberRegex = new RegExp(/^\d$/)
        if(!args.length == 1 || !numberRegex.test(args[0]) || args[0] < 1)return msg.channel.send(getDefaultEmbed(false).addFields({name:"Characters", value:"That doesn't seem like a valid index."}))
        

        const discordID = msg.author.id;
        const collectionsData = getDatabase("Collections");
        const cursor = collectionsData.find();
        const rawData = await cursor.filter({"discordID":discordID}).toArray()

        if(args[0]>Object.keys(rawData[0].collected).length) return msg.channel.send(getDefaultEmbed(false).addFields({name:"Characters", value:"That doesn't seem like a valid index."}))
        
        if(rawData.length == 0  ) return msg.channel.send(getDefaultEmbed(false).addFields({name:"Characters", value:"You haven't collected any characters yet."}))
        
        const characterID = args[0]-1;
        const characters = Object.keys(rawData[0].collected)
        const character = formatNames([characters[characterID]])[0]
        const fileName = characters[characterID].split(" ").reverse().join("_") + ".png";;

        msg.channel.send(new getDefaultEmbed()
        .setTitle(`Here is a picture of one of your ${rawData[0].collected[characters[characterID]]} ${character}`)
        .attachFiles(`././img/${fileName}`)
        .setImage(`attachment://${fileName}`))
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