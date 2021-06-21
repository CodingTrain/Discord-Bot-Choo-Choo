// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

const fetch = require("node-fetch");
const getDefaultEmbed = require("../utils/getDefaultEmbed")

module.exports = {
  name: "gif",
  description:"Request a gif from tenor with %prefix%gif <searchTerm>",
  async execute(msg, args) {
  let result = await getGIF(args)
  
  const reactionEmbed = getDefaultEmbed(true)
	.setTitle('Gif!')

  if(result == ""){
    reactionEmbed.addFields({ name: `We couldn't find a gif with the query ${args}`, value: "Here's a coding train gif instead!" })

    reactionEmbed.setImage(await getGIF())
  }
  else{
    reactionEmbed.addFields({ name: 'Here is your gif!', value: "GIF from Tenor: " + args })
    .setImage(result)
  }

  msg.channel.send(reactionEmbed);
}};

async function getGIF(args = []){
  let keywords = "coding train";
  let result = ""
  if (args.length > 0) {
    keywords = args.join(" ");
  }
  const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
  let response = await fetch(url);
  let json = await response.json();
  if(json.results.length != 0){
    const index = Math.floor(Math.random() * json.results.length);
    result = json.results[index].media[0]["gif"]["url"]
  }
  return result
}
