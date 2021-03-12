const { MessageEmbed } = require('discord.js');
const reportID = require('../../settings/configuration').LOGGING.Report_Channel
const moment = require('moment')
module.exports = {
    config: {
        name: 'report',
        description: 'Report a member on the server.',
        aliases: [],
    },
    execute: async(Client, message, args) => {
        const channel = message.guild.channels.cache.get(reportID),
            report = args.slice(1).join(' ')

        const embed = new MessageEmbed({ color: Client.color })
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (!message.mentions.users.first()) return message.channel.send(embed.setDescription('Please mention the user you are trying to report'));
        if (!args[1]) return message.channel.send(embed.setDescription(`Please provide valid text for your report!`))

        const embed2 = embed
            .setTitle('Reporting System')
            .addField('Report:', report)
            .addField(`User Reported:`, message.mentions.users.first())
            .addField('Reported By:', message.author)
            .setTimestamp()

        if (channel) channel.send(embed2)
        else console.log('[❌] I couldnt find the report channel, please enter a valid channel id in the configuration!')
    },
};