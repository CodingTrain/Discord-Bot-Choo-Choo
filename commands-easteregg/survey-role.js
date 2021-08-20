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
        valueField=  "You have earned the Blue Easter Egg Role!"

        msg.channel.send(resultEmbed = getDefaultEmbed()
        .setTitle('Easter Egg Time!')
        .addFields({name:nameField, value: valueField})
        )

        //setTimeOut to remove embed
        setTimeout(()=>resultEmbed.delete(),3000); 
}
}