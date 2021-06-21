// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

const fs = require('fs')
require("dotenv").config();
const commands = {}

const help = require("./utils/help.js")


const folders = ["./commands-book", "./commands-easteregg", "./commands-tutorials"]
for(const folder of folders){
  let commandFiles = fs.readdirSync(folder).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`${folder}/${file}`);
    commands[command.name] =  command;
  }
}
const helpCommand = require(`./utils/help.js`);
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
commands[helpCommand.name] =  helpCommand;


module.exports = {
  name:"commandHandler",
  commandList:commands,
  async execute(msg) {

    const client = msg.client;
    //if(msg.channel.id != 715786219770085396 && msg.channel.id != 847457657685934090 && msg.channel.id != 850094406470991942){return}
    const prefix = process.env.PREFIX;
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if(!prefixRegex.test(msg.content)) return;

    const [, matchedPrefix] = msg.content.match(prefixRegex);
    const tokens = msg.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = tokens.shift().toLowerCase() || "help";

    
    for(commandOption of Object.keys(commands)){
      if(commands[commandOption].name == command.toLowerCase()){
        commands[commandOption].execute(msg, tokens)
      }
    } 
}};
