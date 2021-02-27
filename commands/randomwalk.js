const { createCanvas } = require("canvas");
const Discord = require("discord.js");
// const p5 = require("p5");
const fs = require("fs");

// Loading sequence of random numbers
const rawDigits = fs.readFileSync("./digits.txt", "utf-8");
const digits = rawDigits.split(/[\s\n]+/g);
const randomS = digits.filter((elt, index) => index % 11 !== 0);
const randoms = randomS.map((elt) => parseInt(elt));

module.exports = function (msg, args) {
  console.log("generating...");
  let startingIndex = Math.floor(Math.random() * randoms.length);
  // TODO: check that argument is valid number between 0 and 199999
  if (args.length > 0) {
    startingIndex = parseInt(args[0]);
  }
  const buffer = generateImage(startingIndex);
  const attachment = new Discord.MessageAttachment(buffer, "randomwalk.png");
  msg.channel.send(
    `Here is your random walk starting at ${startingIndex}!`,
    attachment
  );
};

function generateImage(offset) {
  const width = 4880;
  const height = 1500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Make my own random walk design
  // anyhting can go here
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  let x = width / 2;
  let y = height / 2;
  const stepSize = 4;
  // randomSeed(parseInt(number.value()));
  for (let i = 0; i < randoms.length; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, stepSize, stepSize);
    const index = (i + offset) % randoms.length;
    const r = randoms[index] % 4;
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
  const buffer = canvas.toBuffer("image/png");
  return buffer;
  // fs.writeFileSync("test.png", buffer);
}
