const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const logs = require("../../settings/configuration").LOGGING.Ban_Channel_Logs;

module.exports = {
    config: {
        name: 'kick',
        description: 'Kick a user from the server.',
        aliases: [`cya`],
    },
    execute: async(Client, message, args, base, prefix) => {
        let channel = message.guild.channels.cache.get(logs)
        let embed3 = new MessageEmbed()
            .setDescription(`You can\`t use that!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed4 = new MessageEmbed()
            .setDescription(`Sorry, I am missing my required permissions perhaps try moving my role up!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed5 = new MessageEmbed()
            .setDescription(`Sorry, I can't seem to find this user!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed6 = new MessageEmbed()
            .setDescription(`Please specify a user to kick!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed7 = new MessageEmbed()
            .setDescription(`This user can't be kicked! PS: They hold a higher role than you!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed8 = new MessageEmbed()
            .setDescription(`Why are you trying to kick yourself?`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed9 = new MessageEmbed()
            .setDescription(`Sorry! Something went wrong, please try again.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embed3)
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(embed4)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send(embed6);

        if (!member) return message.channel.send(embed5);
        if (!member.kickable) return message.channel.send(embed7);
        if (member.id === message.author.id) return message.channel.send(embed8);

        let reason = args.slice(1).join(" ") || 'Unspecified';

        const embed = new Discord.MessageEmbed({ color: Client.color })
            .setTitle("Administration System | Kick Category")
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(`GREEN`)
            .setDescription(`**Action:** Kick\n**User Kicked:** ${member.user.tag} - (${member.id})\n**Reason:** ${reason}`)
            .setTimestamp();

        const embed2 = new Discord.MessageEmbed({ color: Client.color })
            .setTitle("Administration System | Kick Category")
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(`GREEN`)
            .setDescription(`You have been **KICKED** from ${message.guild.name}!\n\n**Staff Member**: ${message.author}\n**Reason:** ${reason}`)
            .setTimestamp();


        const sendEmbed = new Discord.MessageEmbed({ color: 'RED' })
            .setDescription(`Sorry, I can\'t dm ${member} their dms are locked!`)

        let send = await member.user.send(embed2).catch(() => {})

        member.kick(reason)
            .then(() => {
                message.channel.send(embed);
                channel.send(embed)
                if (!send) message.channel.send(sendEmbed)
            })
            .catch(() => message.channel.send(embed9))
    }
}