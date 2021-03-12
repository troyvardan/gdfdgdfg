const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: 'announce',
        description: 'Make an announcement on the server.',
        aliases: [`sayem`],
    },
    execute: async(Client, message, args, base, prefix) => {
        let embed3 = new MessageEmbed({ color: Client.color })
            .setDescription(`What would you like the description to be?`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (!message.member.hasPermission("ADMINISTRATOR")) return (await message.channel.send(embed.setDescription('**You dont have permission!**'))).delete({ timeout: 5000 })

        message.delete()

        const filter = response => response.author.id === message.author.id

        message.channel.send(embed3).then(() => {
            message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 80000,
                    errors: ['time']
                })
                .then((de => {
                    let desc = de.first().content;
                    message.channel.bulkDelete(1)
                    let embed = new MessageEmbed()
                        .setAuthor(`Notification From ${message.author.username}`, message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
                        .setDescription(desc)
                        .setColor(Client.color)
                        .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                        .setTimestamp()
                    message.channel.send(embed)
                    message.channel.bulkDelete(3)
                }))
        })
    }
}