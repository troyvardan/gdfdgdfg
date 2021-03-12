const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'set-status',
        description: 'Sets the bots status via discord.',
        aliases: ['setstatus'],
    },
    execute: async(Client, message, args) => {
        let embed3 = new MessageEmbed()
            .setDescription(`Sorry, you dont have permission to execute this command!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed4 = new MessageEmbed()
            .setDescription(`You failed to provide what I will be setting my status as!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(embed3);

        const status = args.join(' ');
        if (!status)
            return message.channel.send(embed4)

        const embed = new MessageEmbed()
            .setDescription(`I have changed my status!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        message.channel.send(embed);

        Client.user.setActivity(status);
    },
};