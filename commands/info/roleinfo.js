const { MessageEmbed } = require('discord.js');
const { utc } = require('moment')

module.exports = {
        config: {
            name: 'roleinfo',
            description: 'See information for a role on the server.',
            aliases: [`rinfo`],
        },
        execute: async(Client, message, args) => {
                const embed = new MessageEmbed({ color: Client.color })
                    .setFooter(`${message.channel.guild.name} |  `, message.channel.guild.iconURL({ dynamic: true }))

                let role = message.mentions.roles.first()
                if (!role) return message.channel.send(embed.setDescription('Please mention a role to get its info'))

                let embed2 = new MessageEmbed({ color: Client.color })
                    .setTitle(`${role.name} Information`)
                    .addField("Created", `${utc(role.createdAt).format('dddd, MMMM Do YYYY')}`, true)
                    .addField("ID", role.id, true)
                    .addField("Position", role.rawPosition, true)
                    .addField("Color", role.hexColor, true)
                    .addField('Hoisted', role.hoist, true)
                    .addField("Members", `${role.members.first(20).map(s => s.toString()).join(' ')} ${role.members.size - 20 > 0 ? `and ${role.members.size - 20} more` : ''}`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        message.channel.send(embed2);
    }
}