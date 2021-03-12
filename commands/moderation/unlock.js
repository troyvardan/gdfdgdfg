const { MessageEmbed } = require("discord.js");
const logs = require("../../settings/configuration").LOGGING.Lock_Channel_Logs;

module.exports = {
    config: {
        name: 'unlock',
        description: 'Unlocks a channel, allowing users to chat',
        aliases: [],
    },
    execute: async(Client, message, args) => {
        let log = message.guild.channels.cache.get(logs)
        let embed = new MessageEmbed({ color: Client.color })
            .setDescription(`You can\`t use that!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        let channel = message.mentions.channels.first() || message.channel
        let perms = channel.permissionOverwrites.get(message.guild.id)
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed.setDescription('You are missing the permission `Manage Channels`'))

        if (!args[0] || !message.mentions.channels.first()) {
            if (perms && !perms.deny.has('SEND_MESSAGES')) return message.channel.send(embed.setDescription('This channel is already unlocked!'));
            message.channel.createOverwrite(message.guild.id, { SEND_MESSAGES: null })
            return message.channel.send(embed.setDescription(`**channel has been unlocked!**\n${message.channel} has been successfully unlocked, for now.`))
        }

        if (perms && !perms.deny.has('SEND_MESSAGES')) return message.channel.send(embed.setDescription(`${message.mentions.channels.first()} is already unlocked!`));
        message.mentions.channels.first().createOverwrite(message.guild.id, { SEND_MESSAGES: null })
        message.channel.send(embed.setDescription(`**This channel has been unlocked!**\n${message.mentions.channels.first()} has been succesfully unlocked, for now.`))

        const embed2 = new MessageEmbed({ color: Client.color })
            .setTitle("Administration System | Unlock Category")
            .setThumbnail(message.author.displayAvatarURL())
            .setColor(`GREEN`)
            .setDescription(`${channel} has been unlocked!\n**Staff Member**: ${message.author}`)
            .setTimestamp();


        if (log) log.send(embed2)
    }
}