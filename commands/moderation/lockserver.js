const { MessageEmbed } = require("discord.js");
let { Enabled } = require('../../settings/configuration').LOCKDOWN_KICK

module.exports = {
    config: {
        name: 'lockserver',
        description: 'Lock the server, preventing anyone from joining.',
        aliases: [`lockdownserver`],
    },
    execute: async(Client, message, args) => {

        let isLocked = Client.db.get(message.guild.id).underLockdown

        if (!Enabled) return message.channel.send(new MessageEmbed({ color: Client.color }).setDescription('This command is disabled, enable it in the configuration.'))

        if (isLocked) {
            const embed1 = new MessageEmbed({ color: Client.color })
                .setTitle("Administration System | Lockdown Mode")
                .setThumbnail(message.author.displayAvatarURL())
                .setColor(`GREEN`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setDescription('The server-wide **LOCKDOWN** has ended, members may join now!')
                .setTimestamp();

            message.channel.send(embed1)
            Client.db.set(`${message.guild.id}.underLockdown`, false)
        } else {
            const embed2 = new MessageEmbed({ color: Client.color })
                .setTitle("Administration System | Lockdown Mode")
                .setThumbnail(message.author.displayAvatarURL())
                .setColor(`GREEN`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setDescription('The server has been **LOCKED** down, members are restricted from joining!')
                .setTimestamp();

            message.channel.send(embed2)
            Client.db.set(`${message.guild.id}.underLockdown`, true)
        }
    }
}