const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: 'remove',
        description: 'Remove a user from the current ticket.',
        aliases: [],
    },
    execute: async(client, message, args, config, prefix, base) => {
        let remove = new MessageEmbed()
            .setDescription(message.mentions.users.first().username + ' was removed from this ticket!')
            .setColor(client.color)
            .setFooter(`${message.guild.name} |  `)
        message.channel.send(remove)
        let rewritePerms = message.mentions.members.first()

        message.channel.updateOverwrite(rewritePerms, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
            READ_MESSAGE_HISTORY: false
        })
    }
};