const bookPosition = require("../commands-book/bookPosition")
const setBookPosition = require("../commands-book/setBookPosition")
const getDefaultEmbed = require("../utils/getDefaultEmbed")

//TODO: add dynamic list depending on permissions, then move into objects within files

//choochoo, gif, randomwalk, find, assign, getnumber, userdb, mynumber, set, help, easteregg, supporterdb, random, reading, setreading 

const commands = [
    {name:"choochoo",
    description:"Like ping, but more fun."}, 

    {name:"gif",
    description:"Request a gif from tenor with ?gif <searchTerm>"}, 

    {name:"randomwalk",
    description:"Generate a random walk with ?randomwalk <numberFromBook>"}, 

    {name:"find",
    description:"Get the position of a number in the book !find <number>"}, 

    {name:"assign",
    description:"Admin command, assign a number to a user."}, 

    {name:"getnumber",
    description:"Get the number on a position in the book ?getnumber <position> or ?getnumber <row> <column>"}, 

    {name:"supporterdb",
    description:"Admin command, get the list of supporters with their number."}, 

    {name:"userdb",
    description:"Admin command, get the list of users with their number."}, 

    {name:"mynumber",
    description:"Check your own number! If you haven't set one, use ?set <number>"}, 

    {name:"set",
    description:"Set your number! ?set or ?set <number> if you're a supporter!"}, 

    {name:"help",
    description:"Get this list of commands!"}, 

    {name:"easteregg",
    description:"Try and hunt that mythical blue easter egg role!"}, 

    {name:"random",
    description:"Get a random number from the book!"}, 

    {name:"reading",
    description:"Check where Shiffman last stopped reading the book of random numbers!"}, 

    {name:"setreading",
    description:"Admin commmand, Set where Shiffman last stopped reading the book of random numbers!"}
]
module.exports = function (msg, args){
    let helpEmbed = getDefaultEmbed()
    if(!args[0]){
        helpEmbed.addFields([{
            name:"Need more details?", value:"Try using ?help <commandName>"
        },{
            name:"The current commandlist", value:"The available commands are: " + commands.map(a=>a["name"]).join(", ")
        }])
        msg.channel.send(helpEmbed)
    }
    else{
        let command = commands.find(a=>a["name"]==args[0])
        if(command){
            helpEmbed.addFields({
                name:`?${command["name"]}`, value:`${command["description"]}`
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
}