const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: 'afk',
        description: 'Allows you to set your status to afk!',
        aliases: [],
    },
    execute: async(client, message, args) => {
        client.afk.set(message.author.id, { time: Date.now(), message: args.join(' ') || 'AFK' })
        message.member.setNickname(`[AFK] ${message.member.displayName.replace(/(\[AFK\])/g, '')}`).catch(() => {})
        message.channel.send(`I set your afk status to: ${args.join(' ') || 'AFK'}`)
    }
}