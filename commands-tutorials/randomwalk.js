const { createCanvas } = require("canvas");
const Discord = require("discord.js");
// const p5 = require("p5");
const fs = require("fs");

const getNumbers = require("../utils/getNumbers")
const getDefaultEmbed = require("../utils/getDefaultEmbed")
const getDatabase = require("../utils/getDatabase")

// Loading sequence of random numbers
const randoms = getNumbers();

module.exports = {
  name: "randomwalk",
  description:"Generate a random walk with %prefix%randomwalk <position>",
  async execute(msg, args) {
  let success = false;

  const firstEmbed = getDefaultEmbed(true)
	.setTitle('Randomwalk')
	.addFields(
		{ name: 'I\'m working on it!', value: `Generating!` }
	)
  let message = await msg.channel.send(firstEmbed);
  
 
  let startingIndex = Math.floor(Math.random() * randoms.length);

  cursor = (await getDatabase()).find();
  userData = await cursor.filter({"discordID":msg.author.id}).toArray();


  if(userData.length){
      success = true;
      startingIndex = +userData[0]["position"]
  }


  if (args.length > 0 && parseInt(args[0])>= 0 && parseInt(args[0]) < 200000 ) {
    success = true;
    startingIndex = parseInt(args[0]);
  }





  const buffer = generateImage(startingIndex);
  const attachment = new Discord.MessageAttachment(buffer, "randomwalk.png");

  const finishedEmbed = getDefaultEmbed()
	.setTitle('Random walk')
	.addFields(
		{ name: 'Here is your random walk!', value: success?`Generating your random walk with number ${randoms[startingIndex]} from position ${startingIndex}.`:`Picking random number ${randoms[startingIndex]} from position ${startingIndex} and generating random walk.` }
	)
	.attachFiles([attachment])
	.setImage('attachment://randomwalk.png')

  message.delete();
  msg.channel.send(finishedEmbed)
}};


function generateImage(offset) {
  const width = 1455;
  const height = 375;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  let x = width / 2;
  let y = height / 2;
  const stepSize = 4;

  for (let i = 0; i < randoms.length; i++) {
    const index1 = (i + offset) % randoms.length;
    const index2 = (i + offset + 1) % randoms.length;
    const tenDigitString = randoms[index1].toString().padStart(5, "0") + "" + randoms[index2].toString().padStart(5, "0");
    
    for(let j = 0; j < tenDigitString.length; j+=2){
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, stepSize, stepSize);
      r = parseInt(tenDigitString.slice(j,j+2)) % 4;
      switch (r) {
        case 0:
          x = x + stepSize;
          break;
        case 1:
          x = x - stepSize;
          break;
        case 2:
          y = y + stepSize;
          break;
        case 3:
          y = y - stepSize;
          break;
      }
    }
  }
  const buffer = canvas.toBuffer("image/png");
  return buffer;
  // fs.writeFileSync("test.png", buffer);
}
