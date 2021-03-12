const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'dm',
        description: 'DM a user in the server.',
        aliases: [],
    },
    execute: async(Client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(`\`❌\` You don't have permissions`);

        const user = message.mentions.users.first() || message.guild.member(args[0]);

        if (!user)
            return message.channel.send(
                `\`❌\` Please provide valid user mention or ID`
            );

        const text = args.slice(1).join(' ');

        if (!text)
            return message.channel.send(`\`❌\` Please provide valid text to send`);

        user.send(text).catch(() => {
            return message.channel.send(`\`❌\` Cannot send message to this user`);
        });

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setDescription(`\`✅\` Successfully sent a DM message to **${user.username}**`);

        message.channel.send(embed);
    },
};