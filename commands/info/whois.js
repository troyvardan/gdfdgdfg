const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    config: {
        name: 'whois',
        description: 'View info on a member or yourself.',
        aliases: ['userinfo'],
    },
    execute: async(Client, message, args) => {
        const member = message.mentions.members.first() || message.guild.member(args[0]) || message.member;

        let status = message.member.presence.status;

        switch (status) {
            case 'online':
                status = 'Online';
                break;

            case 'invisible':
                status = 'Invisible';
                break;

            case 'оffline':
                status = 'Offline';
                break;

            case 'idle':
                status = 'Idle';
                break;

            case 'dnd':
                status = 'Do Not Disturb';
                break;
        }

        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .addField(
                '**Creation Date:**',
                `${moment(member.user.createdAt).format('MMMM Do YYYY')}`,
                true
            )
            .addField(
                ' **Date Joined:**',
                `${moment(member.joinedAt).format('MMMM Do YYYY')}`,
                true
            )
            .setThumbnail(member.user.displayAvatarURL())
            .addField('**ID:**', `${member.id}`, true)
            .addField('**Discord:**', `${member.user}`, true)
            .addField('**Tag:**', `${member.user.tag}`, true)
            .addField('**Highest Role:**', `${member.roles.highest}`, true)
            .addField('**Nickname:**', `${member.nickname}`, true)
            .addField('**Current Status:**', `${status}`, true)
            .addField('**Game:**', `${member.presence.activities[0]}`, true)
            .setColor(Client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setTimestamp();
        message.channel.send(embed);
    },
};