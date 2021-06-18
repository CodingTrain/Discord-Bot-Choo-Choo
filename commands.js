// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

const fs = require('fs')
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
commands[helpCommand.name] =  helpCommand;

module.exports = {
  name:"commandHandler",
  commandList:commands,
  async execute(msg) {
    if(msg.channel.id != 715786219770085396 && msg.channel.id != 847457657685934090 && msg.channel.id != 850094406470991942){return}
    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    if (command.charAt(0) === "?") {
      command = command.substring(1).toLowerCase();
      for(commandOption of Object.keys(commands)){
        if(commands[commandOption].name == command.toLowerCase()){
          commands[commandOption].execute(msg, tokens)
        }
      }
    }
}};
