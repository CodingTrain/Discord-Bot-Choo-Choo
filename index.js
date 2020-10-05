const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.TOKEN);
client.on('message', gotMessage);

function gotMessage(msg) {
  console.log(msg);
  // Only for this server and this channel
  if (msg.guild.id === serverID && msg.channel.id === channelID) {
    if (msg.content === 'ping') {
      msg.channel.send('pong');
    }
  }
}