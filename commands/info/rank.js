const Canvacord = require("canvacord");
const db = require('quick.db')
let levelSettings = require('../../settings/configuration.js').LEVELING_SYSTEM
const { MessageAttachment } = require('discord.js')
const Discord = require(`discord.js`)

module.exports = {
    config: {
        name: 'rank',
        description: 'View your current level on the server.',
        aliases: [],
    },
    execute: async(client, message, args) => {

        let embed1 = new Discord.MessageEmbed()
            .setTitle(`Missing Level!`)
            .setDescription(`You need to be at least level 1 to view your rank!`)
            .setColor(client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (!levelSettings.Enabled) return message.channel.send(embed1.setDescription('Leveling is disabled on the server'))
        let data = db.get(`${message.guild.id}.${message.author.id}.xp`)
        if (!data || !data.level) return message.channel.send(embed1)
        let rank = Object.entries(db.get(`${message.guild.id}`)).filter(s => s[1].xp).sort((a, b) => b[1].xp.total - a[1].xp.total).map(s => s[0]).indexOf(message.author.id) + 1

        const canvas = new Canvacord()
        let image = await canvas.rank({
            username: message.author.username,
            discrim: message.author.discriminator,
            status: message.author.presence.status,
            currentXP: data.amount,
            neededXP: data.level * 500,
            rank,
            level: data.level,
            background: './background.jpg',
            avatarURL: message.author.displayAvatarURL({ format: "png" }),
            color: "cyan"
        })
        message.channel.send(new MessageAttachment(image, 'rank.png'))
    },
};