const getNumbers = require("../utils/getNumbers")
const getIndexes = require("../utils/getIndexes")
const getDefaultEmbed = require("../utils/getDefaultEmbed")

// Loading sequence of random numbers
const randoms = getNumbers();

module.exports = {
  name:"find",
  description:"Get the position of a number in the book %prefix%find <number>",
  execute (msg, args) {
    let responseText;
    let success = false;
    
    //Check for valid input
    if (args.length == 0 || parseInt(args[0]) < 0 || parseInt(args[0]) > 100000 ) {
      responseText = "Please provide a valid number, between 0 and 99999!"
    }
    else{
      const paddedInput = args[0].padStart(5, "0")
      let indexes = getIndexes(randoms, parseInt(paddedInput))

      //Check if positions exist in the book for the input
      if(indexes.length!=0){

        //Format the data depending on input parameter
        //TODO add table instead of list
        if(!args[1] || !(args[1] == "raw" ||args[1] == "r")){
          indexes = indexes.map(a=>"row " + (Math.floor(a/10) + 1) + " position " + ((a%10)+1));
        }
        else{
          indexes = indexes.map(a=>"position " + (a+1));
        }
        success = true;
        responseText = `The number ${args[0]} can be found in the book at ${indexes.join(" and ")}!`
      }
      else{
        responseText = `The number ${args[0]} can't be found in the book, try again with a different value!`
      }
    }

    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    .addFields(
		{ name: 'I looked through the entire book for you!', value: responseText }
    )

    msg.channel.send(reactionEmbed)

  }};

