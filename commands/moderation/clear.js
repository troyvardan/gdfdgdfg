const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        name: 'clear',
        description: 'Clear the chats messages.',
        aliases: [`purge`],
    },
    execute: async(client, message, args) => {
        let embed3 = new MessageEmbed()
            .setDescription(`Please provide the ammount of messages that you would like to delete!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        let embed4 = new MessageEmbed()
            .setDescription(`You cannot clear more than 100 messages at once!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        let embed5 = new MessageEmbed()
            .setDescription(`You need to delete at least one message!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);

        const amount = args.join(" ");

        if (!amount) return message.channel.send(embed3)

        if (amount > 100) return message.channel.send(embed4)

        if (amount < 1) return message.channel.send(embed5)

        message.channel.bulkDelete(amount, true).then(messages => {
            let embed = new MessageEmbed()
                .setTitle(`Cleaning System`)
                .setDescription(`**${messages.size}** messages were deleted by **${message.author.tag}**`)
                .setColor("BLUE")
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(embed)
        }).catch(() => {
            message.channel.send('Can\'t delete messages older than 14 days')
        })




    }
}