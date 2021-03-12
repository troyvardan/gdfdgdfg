const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'closedm',
        description: 'Close a channel dm between the bot and a user.',
        aliases: [],
    },
    execute: async(Client, message, args, base, prefix) => {
        const embed = new MessageEmbed({ color: Client.color })
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        let dmchannel = Client.db.get(`dmchannels.${message.channel.id}`)
        if (!dmchannel) return message.channel.send(embed.setDescription('This isnt a dm channel'))

        message.channel.send(embed.setDescription('This channel will be closed in 10 seconds'))
        await new Promise(r => setTimeout(r, 10000))
        Client.db.delete(`dmchannels.${message.channel.id}`)
        message.channel.delete().catch(() => {})
    }
}