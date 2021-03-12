const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'unclaim',
        description: 'Unclaim the current ticket channel.',
        aliases: [`unhandle`],
    },
    execute: async(Client, message, args) => {
        let embedClaim = new MessageEmbed()
            .setDescription(`${message.author.username} unclaimed this ticket!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color)
        message.channel.send(embedClaim)
        message.channel.setName(`Unclaimed by ${message.author.username}`)
    }
}