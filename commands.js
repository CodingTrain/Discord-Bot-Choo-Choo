// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ


require("dotenv").config();
const getDefaultEmbed = require("./utils/getDefaultEmbed");
const Discord = require("discord.js");
const characterSpawner = require("./interaction-showcases/buttonShowcase.js");


const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = {
  name:"commandHandler",
  async execute(msg) {


    const client = msg.client;
    const {cooldowns, commands} = client;
    if (msg.author.bot) return;


    for(let [,command] of commands){
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      }
    }

    const channelIDS = ["715786219770085396","847457657685934090","850094406470991942","834815546850803736"];
    if(!channelIDS.includes(msg.channel.id)){return}
    const prefix = process.env.PREFIX;
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if(!prefixRegex.test(msg.content)) return;


    const [, matchedPrefix] = msg.content.match(prefixRegex);
    const tokens = msg.content.slice(matchedPrefix.length).trim().split(/ +/);
    let command = (tokens.shift().toLowerCase() || "help").toLowerCase();
    
    command = command.toLowerCase()

    if(!commands.has(command)) return;
        
    command = client.commands.get(command);

    const now = Date.now();
    const timestampList = cooldowns.get(command.name);
    const cooldownTimer = (command.cooldown || 5) * 1000;
    const expire = timestampList.get(msg.author.id) + cooldownTimer;

    if(timestampList.has(msg.author.id) && now < expire){
        const timeLeft = ((expire - now) / 1000).toFixed(1);
        let cooldownMessage = await msg.channel.send(getDefaultEmbed(false).setTitle("This command is on cooldown!").addFields({name:"Time left", value: `You have to wait ${timeLeft} more seconds to use this command!`}))
        return setTimeout(()=>{cooldownMessage.delete(), msg.delete()}, 5000);
      }
    else{
      timestampList.set(msg.author.id, now);
    }
    
    msg.channel.startTyping();
    await command.execute(msg, tokens);
    msg.channel.stopTyping();

    
    await characterSpawner.execute(msg);

    }
    } 
;
