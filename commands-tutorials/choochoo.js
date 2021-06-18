// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ
const getDefaultEmbed = require("../utils/getDefaultEmbed")

const replies = ["🚂🌈💖", "Choo choo!", "Ding! 🛎", "Never forget this dot!"];

module.exports = {
  name: "choochoo",
  description:"Like ping, but more fun.",
  execute(msg, args) {
  const index = Math.floor(Math.random() * replies.length);
  let choochooEmbed = getDefaultEmbed(true).setDescription(replies[index])
  msg.channel.send(choochooEmbed);
}
};