const getDefaultEmbed = require("../utils/getDefaultEmbed");
require("dotenv").config();

module.exports ={
    name:"help",
    description:"Get this list of commands!",
    cooldown: 5, 
    execute(msg, args){

    const commands = require("../commands.js");
    let helpEmbed = getDefaultEmbed()

    let commandNames = []
    let commandList = msg.client.commands

    for(let [,command] of commandList){
        commandNames[command.name] = command.description.replace(/%prefix%/gi, process.env.PREFIX)
        
    }

    if(!args[0]){

        helpEmbed.addFields([{
            name:"Need more details?", value:"Try using ?help <commandName>"
        },{
            name:"The current commandlist", value:"The available commands are: " + Object.keys(commandNames).join(", ")
        }])
        msg.channel.send(helpEmbed)
    }

    else{
        commandTest = args[0].toLowerCase()
        if(Object.keys(commandNames).includes(commandTest)){

            helpEmbed.addFields({
                name:`?${commandTest}`, value:`${commandNames[commandTest]}`
            })
            msg.channel.send(helpEmbed)
        }
        else{
            helpEmbed.addFields({
                name:`?${args[0]}`, value:`I searched through my entire memory and couldn't find this command!`
            })
            msg.channel.send(helpEmbed)

        }
    }
}}