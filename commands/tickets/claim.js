const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'claim',
        description: 'Claim the current ticket channel.',
        aliases: [`handle`],
    },
    execute: async(Client, message, args) => {
        let embedClaim = new MessageEmbed()
            .setDescription(`${message.author.username} will be handling this ticket!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color)

        message.channel.send(embedClaim)
        message.channel.setName(`Claimed by ${message.author.username}`)
    }
}