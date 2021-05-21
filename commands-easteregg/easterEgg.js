const getDefaultEmbed = require("../utils/getDefaultEmbed")

module.exports = function (msg, args) {
    let hints = [
        {weight:30, text:"You almost got it! Keep trying for the keyword!"},
        {weight:30, text:"Choo choo! Keep trying!"},
        {weight:2, text:"Where are we again? Oh yea! Aboard the Coding Train!"},
        {weight:2, text:"🐇🐇🐇🐇🐇 EASTER BUNNYVASION 🐇🐇🐇🐇🐇"},
        {weight:2, text:"Close! Have a bunny instead:🐰🥕 "},
        {weight:2, text:"🥚  Hmmm... Not quite the right egg...  !"},
        {weight:2, text:"Welcome aboard the train! Keep trying!"},
        {weight:2, text:"You're on the right track! Get it?"},
        {weight:2, text:"Maybe if you ask nicely you'll get a hint?"},
        {weight:2, text:"You're getting there! The train is almost in the station!"},
        {weight:2, text:"Wait.. this isn't the Coding Train?! Wrong platform!"},
        ];
    
    let nameField = "Try again!"
    let valueField = getItemFromWeightedList(hints)
    let success = false

    //Check if user used the correct sentence
    if(args[0] && args.join(" ") == process.env.EASTEREGG){
        success = true
        nameField = 'Congratulations!'
        valueField=  "You have earned the Blue Easter Egg Role!"
        msg.member.roles.add(808684343219847168)
    }
    //Send result message to chat
    //TODO add random reaction hints
    let easterEggEmbed = getDefaultEmbed(success)
    .setTitle('Easter Egg Time!')
    .addFields({name:nameField, value: valueField})

    if(success){
        easterEggEmbed.setColor('#0b1892')
    }
    
    msg.channel.send(easterEggEmbed);

};

function getItemFromWeightedList(list){
    let options = []
    for(i=0;i<list.length;i++){
        j=0
        console.log(list[i]["weight"])
        while(j < list[i]["weight"]){
            options.push(list[i]["text"])
            j++
        }
    }
    let randomPosition = Math.floor(Math.random()*options.length)
    return options[randomPosition]

}