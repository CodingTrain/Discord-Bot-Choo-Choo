const getDefaultEmbed = require("../utils/getDefaultEmbed")

module.exports = {
    name:"survey-role",
    description:"",
    async execute(msg, args) {
        //add role
        msg.member.roles.add("878170988959920190")

        await msg.delete();

        //send embed
        nameField = 'Congratulations!'
        valueField=  "Thank you for participating in the survey! You have earned the Red Easter Egg Role!"

        newMessage = await msg.channel.send(resultEmbed = getDefaultEmbed()
        .setTitle('Easter Egg Time!')
        .addFields({name:nameField, value: valueField})
        )

        //setTimeOut to remove embed
        setTimeout(()=>newMessage.delete(),3000); 
}
}