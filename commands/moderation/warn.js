const { MessageEmbed } = require(`discord.js`)
const { Kick_On_Warnings, Warnings_Until_Kick } = require('../../settings/configuration.js').BOT_SETTINGS
const { Kick_Channel_Logs } = require("../../settings/configuration").LOGGING;

module.exports = {
    config: {
        name: 'warn',
        description: 'Warn a member on the server.',
        aliases: [],
    },
    execute: async(Client, message, args, base) => {
        let embed = new MessageEmbed({ color: Client.color })
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        let channel = message.guild.channels.cache.get(Kick_Channel_Logs)
        let member = message.mentions.members.first() || message.guild.member(args[0])
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed.setDescription(`Sorry, you are missing permissions to execute this command!`))
        if (!member) return message.channel.send(embed.setDescription(`No Mention? No WARN!`))
        if (member.id === message.author.id) return message.channel.send(embed.setDescription('You can\'t warn yourself, please dont be a idiot!'))
        if (member.user.bot) return message.channel.send(embed.setDescription('You can\'t warn a bot'))
        if (!args[1]) return message.channel.send(embed.setDescription('You need to provide a warning to give to the member!'))

        const userWarns = Client.db.ensure(`${message.guild.id}.${member.id}.warnings`, [])

        let reason = args.slice(1).join(' ')
        userWarns.push({ user: member.id, mod: message.author.id, reason: reason })

        const warn = embed
            .setTitle(`Moderation System | Warning Category`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .addField('User', member.toString(), true)
            .addField('Moderator', message.author.toString(), true)
            .addField('Reason', reason)
            .addField('Warning History', userWarns.length ? userWarns.map((s, i) => `${i + 1}: ${s.reason}`) : 'None')

        message.channel.send(warn)
        Client.db.push(`${message.guild.id}.${member.id}.warnings`, { user: member.id, mod: message.author.id, reason: reason })

        if (Kick_On_Warnings && userWarns.length >= Warnings_Until_Kick && member.kickable) {
            Client.db.set(`${message.guild.id}.${member.id}.warnings`, [])
            const embed = new MessageEmbed({ color: Client.color })
                .setTitle("Administration System | Kick Category")
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(`GREEN`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setDescription(`**Action:** Kick\n**User Kicked:** ${member.user.tag} - (${member.id})\n**Reason:** - Reaching this guilds strike limit!`)
                .setTimestamp();

            const embed2 = new MessageEmbed({ color: Client.color })
                .setTitle("Administration System | Kick Category")
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(`GREEN`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setDescription(`You have been **KICKED** from ${message.guild.name}!\n\n**Staff Member**: ${message.author}\n**Reason:** Reaching this guilds strike limit!`)
                .setTimestamp();


            const sendEmbed = new MessageEmbed({ color: 'RED' })
                .setDescription(`Sorry, I can\'t dm ${member} their dms are locked!`)

            let send = await member.user.send(embed2).catch(() => {})

            member.kick(reason)
                .then(() => {
                    message.channel.send(embed);
                    if (channel) channel.send(embed)
                    if (!send) message.channel.send(sendEmbed)
                })
                .catch(() => {})
        }
    }
}