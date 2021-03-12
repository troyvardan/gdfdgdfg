const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: 'say',
        description: 'Make the bot say whatever you want.',
        aliases: [`talk`],
    },
    execute: async(Client, message, args, config, prefix, base) => {
        let embed3 = new MessageEmbed()
            .setDescription(`I only talk for certain people!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        let embed4 = new MessageEmbed()
            .setDescription(`You failed to provide what I will be saying!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        await message.delete()
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed3).then(w => {
            setTimeout(() => {
                w.delete()
            }, 5000)
        })
        const filter = response => {
            return response.author.id === message.author.id
        };
        let say = args.slice(0).join(" ")
        if (!say) return message.channel.send(embed4)
        message.delete()
        message.channel.send(say)
    }
}