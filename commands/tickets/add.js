const { MessageEmbed, Client } = require("discord.js");
module.exports = {
    config: {
        name: 'add',
        description: 'Add a member to the current ticket channel.',
        aliases: [],
    },
    execute: async(client, message, args, config, prefix, base) => {
        let overwritetime = message.mentions.members.first()

        message.channel.updateOverwrite(overwritetime, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true
        })

        let tick = new MessageEmbed()
            .setDescription(`${message.mentions.users.first().username} was added to this ticket!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setColor(client.color)
        message.channel.send(tick)

    }
}