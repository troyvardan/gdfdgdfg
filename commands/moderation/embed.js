const { MessageEmbed } = require('discord.js')


module.exports = {
    config: {
        name: 'embed',
        description: 'Create a message embed.',
        aliases: [],
    },
    execute: async(client, message, args, base, prefix) => {
        let embed3 = new MessageEmbed()
            .setDescription(`What would you like the title to be?`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        let embed4 = new MessageEmbed()
            .setDescription(`What would you like the description to be?`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        message.delete()
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed3.setDescription('**You dont have permission!**')).then(w => w.delete({ timeout: 5000 }))
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(embed3).then((w) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 80000,
                errors: ['time']
            }).then(c => {
                let title = c.first().content;
                message.channel.send(embed4).then((w) => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 80000,
                        errors: ['time']
                    }).then((de => {
                        let desc = de.first().content;
                        message.channel.bulkDelete(1)
                        let embed = new MessageEmbed()
                            .setTitle(title)
                            .setDescription(desc)
                            .setColor(client.color)
                            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                            .setTimestamp()
                        message.channel.send(embed)
                        message.channel.bulkDelete(3)
                    }))
                })
            }).catch((e => {}))
        })
    }
}