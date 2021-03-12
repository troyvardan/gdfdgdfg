const { MessageEmbed } = require(`discord.js`)
const db = require(`quick.db`)
const ord = require('ordinal')

module.exports = {
    config: {
        name: 'unwarn',
        description: 'Remove the latest warning from a member.',
        aliases: [],
    },
    execute: async(Client, message, args, base) => {
        let embed = new MessageEmbed()
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (!message.member.hasPermission('')) return message.channel.send(embed.setDescription(`Sorry, you are missing permissions to execute this command!`))
        if (!message.mentions.members.first()) return message.channel.send(embed.setDescription(`No Mention? No WARN!`))
        if (message.mentions.members.first().id === message.author.id) return message.channel.send(embed.setDescription('You can\'t warn yourself, please dont be a idiot!'))
        if (message.mentions.members.first().user.bot) return message.channel.send(embed.setDescription('You can\'t warn a bot'))

        let mem = message.mentions.members.first()
        const userWarns = Client.db.ensure(`${message.guild.id}.${mem.id}.warnings`, [])
        if (!userWarns.length) return message.channel.send(embed.setDescription('That user doesnt have any warnings'))
        userWarns.pop()

        const warn = new MessageEmbed({ color: Client.color })
            .setTitle(`Moderation System | Warning Category`)
            .addField('User', mem.toString(), true)
            .addField('Moderator', message.author.toString(), true)
            .addField('Warning History', userWarns.length ? userWarns.map((s, i) => `${i + 1}: ${s.reason}`) : 'None')
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        db.set(`${message.guild.id}.${mem.id}.warnings`, userWarns)
        message.channel.send(warn)
    }
}