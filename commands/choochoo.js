// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

const replies = ["🚂🌈💖", "Choo choo!", "Ding! 🛎", "Never forget this dot!"];

module.exports = (client, msg, args) => {
  const index = Math.floor(Math.random() * replies.length);
  msg.channel.send(replies[index]);
};
