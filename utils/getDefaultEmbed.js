const Discord = require("discord.js");

module.exports = function (success = true) {
    const defaultEmbed = new Discord.MessageEmbed()
	.setColor(success?'#2DC5F4':'#9b0e11')
    .setTitle('Choo Choo!')
	.setTimestamp()
    .setAuthor('Choo Choo Bot', "https://cdn.discordapp.com/attachments/689169277781016629/839927850965794876/Robot_Emoji_Smile320x320_1.png")
    .setThumbnail(success?"https://cdn.discordapp.com/attachments/689169277781016629/839927850965794876/Robot_Emoji_Smile320x320_1.png":"https://cdn.discordapp.com/attachments/689169277781016629/839927849406431262/Robot_Emoji_Unsure320x320_1.png")
    return defaultEmbed;
}