// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

console.log("Beep beep! 🤖");

require("dotenv").config();
const fs = require('fs')

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);
client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();



// rewrite commands to use Discord.Collection

const folders = ["./commands-book", "./commands-easteregg", "./commands-tutorials"]
for(const folder of folders){
  let commandFiles = fs.readdirSync(folder).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
const helpCommand = require(`./utils/help.js`);

client.commands.set(helpCommand.name, helpCommand);



client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("💖");
}

const commandHandler = require("./commands");

client.on("message", commandHandler.execute);
