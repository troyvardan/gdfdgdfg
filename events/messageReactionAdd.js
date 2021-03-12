const Discord = require(`discord.js`)
const db = require('quick.db')
module.exports = {
    execute: async(Client, reaction, user) => {
        if (!reaction.message.guild || user.bot) return
        if (reaction.partial) reaction = await reaction.fetch()
        if (reaction._emoji.name !== '🎉') return

        let giveaway = db.get(`giveaways.${reaction.message.channel.id}`)
        if (!giveaway) return
        db.push(`giveaways.${reaction.message.channel.id}.users`, user)
    },
    name: "messageReactionAdd",
};