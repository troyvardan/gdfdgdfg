const { MessageEmbed } = require("discord.js");
const logs = require("../../settings/configuration").LOGGING.Lock_Channel_Logs;
const parse = require('parse-duration')
const ms = require('ms')
const prefix = require('../../settings/configuration').BOT_SETTINGS.COMMAND_PREFIX

module.exports = {
    config: {
        name: 'lock',
        description: 'Lock a channel, preventing members from typing.',
        aliases: ['lockdown'],
    },
    execute: async(Client, message, args) => {
        let log = message.guild.channels.cache.get(logs)
        let channel = message.mentions.channels.first() || message.channel
        let perms = channel.permissionOverwrites.get(message.guild.id)
        let embed = new MessageEmbed({ color: Client.color })
            .setDescription(`You can\`t use that!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed.setDescription('You are missing the permission `Manage Channels`'))

        if (!args[0]) {
            if (perms && perms.deny.has('SEND_MESSAGES')) return message.channel.send(embed.setDescription('This channel is already locked!'));
            message.channel.createOverwrite(message.guild.id, { SEND_MESSAGES: false })
            message.channel.send(embed.setDescription(`This channel has been locked.`))
        } else if (![null, Infinity].includes(parse(args[0]))) {
            let channel = message.channel
            if (perms && perms.deny.has('SEND_MESSAGES')) return channel.send(embed.setDescription(`this channel is already locked!`));
            channel.createOverwrite(message.guild.id, { SEND_MESSAGES: false })
            channel.send(embed.setDescription(`${channel} has been locked for ${args[0]}`))

            setTimeout(() => {
                channel.createOverwrite(message.guild.id, { SEND_MESSAGES: null })
                channel.send(embed.setDescription(`The channel lockdown has ended.`))
            }, parse(args[0]))
        } else if (!args[1] && message.mentions.channels.first()) {
            if (perms && perms.deny.has('SEND_MESSAGES')) return message.channel.send(embed.setDescription(`${message.mentions.channels.first()} channel is already locked!`));
            message.mentions.channels.first().createOverwrite(message.guild.id, { SEND_MESSAGES: false })
            message.channel.send(embed.setDescription(`${message.mentions.channels.first()} has been locked`))
            message.mentions.channels.first().send(embed.setDescription(`This channel has been locked.`))
        } else if (!isNaN(parseInt(args[1])) && message.mentions.channels.first()) {
            let channel = message.mentions.channels.first()
            if (perms && perms.deny.has('SEND_MESSAGES')) return message.channel.send(embed.setDescription(`${channel} channel is already locked!`));
            if (parse(args[1]) == null || parse(args[1]) == Infinity) return message.channel.send(embed.setDescription('Please use a valid duration, for example:\n\`1m\` = 1 minute or \`1h20m\` = 1 hour 20 mins'))

            channel.createOverwrite(message.guild.id, { SEND_MESSAGES: false })
            message.channel.send(embed.setDescription(`${channel} has been locked for ${args[1]}`))
            channel.send(embed.setDescription(`**This channel been locked for ${args[1]}**`))

            setTimeout(() => {
                channel.createOverwrite(message.guild.id, { SEND_MESSAGES: null })
                channel.send(embed.setDescription(`The channel lockdown has ended.`))
            }, parse(args[1]))
        } else
            message.channel.send(`To initiate a channel lockdown, please use \`${prefix}lock [time | channel] [time]\``)

        const embed2 = new MessageEmbed({ color: Client.color })
            .setTitle("Administration System | Lock Category")
            .setThumbnail(message.author.displayAvatarURL())
            .setColor(`GREEN`)
            .setDescription(`${channel} has been locked!\n**Staff Member**: ${message.author}`)
            .setTimestamp();

        if (log) log.send(embed2)
    }
}