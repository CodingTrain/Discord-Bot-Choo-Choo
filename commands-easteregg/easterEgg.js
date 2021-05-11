const getDefaultEmbed = require("../utils/getDefaultEmbed")

module.exports = function (msg, args) {
    let nameField = "Try again!"
    let valueField = "You almost got it! Keep trying for the keyword!"
    let success = false

    //Check if user used the correct sentence
    if(args[0] && args.join(" ") == `I, ${msg.author.tag} ` + process.env.EASTEREGG){
        success = true
        nameField = 'Congratulations!'
        valueField=  "You have earned the Blue Easter Egg Role!"
        msg.member.roles.add(808684343219847168)
    }
    console.log(process.env.EASTEREGG)
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