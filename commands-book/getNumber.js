const getNumbers = require("../utils/getNumbers")
const getIndexes = require("../utils/getIndexes")
const getDefaultEmbed = require("../utils/getDefaultEmbed")

// Loading sequence of random numbers
const randoms = getNumbers();

module.exports = {
    name:"getnumber",
    description:"Get the number on a position in the book %prefix%getnumber <position> or %prefix%getnumber <row> <column>",
    execute(msg, args) {
    let responseText = '';
    let success = false;

    //Check if user input exists
    if (args.length == 0) {
        responseText = "BEEP BOOP, ERROR ERROR!\n Please provide a valid position, between 1 and 200000!"
    }


    if(args.length == 1){

        let position = args[0]

        //Validate input when single value is given
        if(parseInt(position) < 1 || parseInt(position) > 200000  || position!=parseInt(position)){
            responseText = "BEEP BOOP, ERROR ERROR!\n please provide a valid position, between 1 and 200000!"
        }
        else{
            success = true;
            responseText = `The number in the book at position ${position} is ${randoms[position-1]}!`
        }

    }
    if(args.length == 2){

        let row = args[0];
        let column = args[1];

        //Validate input when two values are given
        if(parseInt(row) < 1 || parseInt(row) > 20000 || row!=parseInt(row)){
            responseText = "BEEP BOOP, ERROR ERROR!\n Please provide a valid row, between 1 and 20000!"
        }        
        else if(parseInt(column) < 1 || parseInt(column) > 10 || column!=parseInt(column)){
            responseText = "BEEP BOOP, ERROR ERROR!\n Please provide a valid column, between 1 and 10!"
        }
        else{
            success = true;
            responseText = `The number at row ${row} and column ${column} in the book is ${randoms[(row-1)*10+(column-1)]}!`
        }
    }

    //Send result message to chat
    const reactionEmbed = getDefaultEmbed(success)
    .addFields(
		{ name: 'I went through the book for you!', value: responseText }
	)

    msg.channel.send(reactionEmbed)
    

  }};

