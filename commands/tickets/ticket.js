const { MessageEmbed } = require(`discord.js`)
const { fetch, set } = require(`quick.db`)
const TicketID = require('../../settings/configuration').LOGGING.Ticket_Channel_Logs
const TicketCategory = require('../../settings/configuration').TICKET_SYSTEM.TICKET_CATEGORY
const SupportTeam = require('../../settings/configuration').TICKET_SYSTEM.SUPPORT_TEAM_ROLES
module.exports = {
    config: {
        name: 'ticket',
        description: 'allows you to create a ticket.',
        aliases: [],
    },
    execute: async(Client, message, args, config, prefix, base) => {
        const channel = message.guild.channels.cache.get(TicketID),
            reason = args.slice(0).join(' ') ||
            await message.delete()
        const filter = response => {
            return response.author.id === message.author.id
        };

        let tt = fetch(`Ticket.number.${message.guild.id}`)
        set(`Ticket.number.${message.guild.id}`, tt + 1)
        let cat = message.guild.channels.cache.find(c => c.id === TicketCategory)
        message.guild.channels.create(`Ticket-${message.author.username}'`, {
            type: `text`,
            parent: TicketCategory,
            permissionOverwrites: [{
                    allow: "VIEW_CHANNEL",
                    id: message.author.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: message.guild.id
                },
                {
                    allow: 'VIEW_CHANNEL',
                    id: SupportTeam
                },
                {
                    allow: 'VIEW_CHANNEL',
                    id: SupportTeam
                },
                {
                    allow: 'VIEW_CHANNEL',
                    id: SupportTeam
                },
            ]
        }).then(chan => {
            let embed = new MessageEmbed()
                .setAuthor(`Ticket System`)
                .setDescription(`${message.author},\n\nThank you for creating a ticket!\n\nPlease wait patiently for the next staff member!`)
                .addField('Reason:', reason)
                .setColor(Client.color)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            chan.send(embed)
            let name = chan.name
            let embed1 = new MessageEmbed()
            embed1.setAuthor(`Ticket System | Logging `)
            embed1.setDescription(`${message.author} created a new ticket.`)
            embed1.setColor(Client.color)
            embed1.setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            if (channel) channel.send(embed1)
        })
    }
}