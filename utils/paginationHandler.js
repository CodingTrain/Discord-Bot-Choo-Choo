
module.exports = {
    async paginate(msg, pages){

        let currentPage = 0;
        const embedMessage = await msg.channel.send(pages[currentPage].setFooter(`Page: ${currentPage+1}/${pages.length}`))

        await embedMessage.react('⬅️');
        await embedMessage.react('➡️');

        const filter = (reaction,user)=>{
            return (["⬅️","➡️"].includes(reaction.emoji.name))
        }

        const collector = await embedMessage.createReactionCollector(filter, {time:25000});
        collector.on('collect', async r => {

            if(r.users.cache.has(msg.author.id)){
                if(r.emoji.name == "⬅️"){
                    currentPage = Math.max(0, currentPage-1)
                }
                if(r.emoji.name == "➡️"){
                    currentPage = Math.min(currentPage+1, pages.length-1)
                }
            }

            await embedMessage.edit(pages[currentPage].setFooter(`Page: ${currentPage+1}/${pages.length}`))

            const userReactions = embedMessage.reactions.cache;

            try {
                for (const reaction of userReactions.values()) {
                    for(user of reaction.users.cache.keys()){
                        if(user != msg.client.user.id){
                            await reaction.users.remove(user);
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
                console.error(error);
            }
            
        })
        collector.on('end', collected => {
            embedMessage.reactions.removeAll();
        })
        

    }
}

