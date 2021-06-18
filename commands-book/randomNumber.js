const getRandomNumber = require("../utils/getRandomNumber")
const getIndexes = require("../utils/getIndexes");
const getNumbers = require("../utils/getNumbers")
const getDefaultEmbed = require("../utils/getDefaultEmbed")

module.exports = {
    name:"random",
    description:"Get a random number from the book!",
    async execute(msg, args) {

    //Pick randomNumber
    let number = await getRandomNumber();

    //Pick random position in book for the number
    let positions = getIndexes(getNumbers(), number);
    let position = positions[Math.floor(Math.random()*positions.length)]

    //Send result message to chat
    let randomNumberEmbed = getDefaultEmbed(true)
    .addFields(
        {name:"A random value from the book:", value:`${number} on position ${position}`}
    )
    
    msg.channel.send(randomNumberEmbed);
  }};