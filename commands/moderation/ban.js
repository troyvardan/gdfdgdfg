const { MessageEmbed } = require("discord.js");
const logs = require("../../settings/configuration").LOGGING.Ban_Channel_Logs;

module.exports = {
    config: {
        name: 'ban',
        description: 'Ban a user, or disallow one from entering the server.',
        aliases: [`getrid`],
    },
    execute: async(Client, message, args) => {
        let embed = new MessageEmbed({ color: Client.color })
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        let channel = message.guild.channels.cache.get(logs)

        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.send(embed.setDescription(`You can\`t use that!`));
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
            return message.channel.send(embed.setDescription(`Sorry, I am missing my required permissions perhaps try moving my role up!`));

        const member = message.mentions.users.first() || await Client.users.fetch(args[0]).catch(() => {});

        if (!args[0]) return message.channel.send(embed.setDescription(`Please specify a user to ban!`));

        if (!member)
            return message.channel.send(embed.setDescription(`Sorry, I can't seem to find this user!`));

        if (member.id === message.author.id)
            return message.channel.send(embed.setDescription(`Why are you trying to ban yourself?`))

        if (message.guild.member(member) && !message.guild.member(member).bannable)
            return message.channel.send(embed.setDescription('I cant ban that user, my role must be higher in order to do that'))

        let reason = args.slice(1).join(" ") || 'Unspecified'

        const embed2 = embed
            .setTitle("Administration System | Ban Category")
            .setThumbnail(member.displayAvatarURL())
            .setDescription(`You have been **BANNED** from ${message.guild.name}!\n**Staff Member**: ${message.author}\n**Reason:** ${reason}`)
            .setColor(Client.color)
            .setTimestamp();

        const sendEmbed = new MessageEmbed({ color: 'RED' })
            .setDescription(`Sorry, I can\'t dm ${member} their dms are locked!`)

        const embed3 = new MessageEmbed({ color: Client.color })
            .setTitle("Administration System | Ban Category")
            .setThumbnail(member.displayAvatarURL())
            .setDescription(`**Action:** Ban\n**User Banned:** ${member.tag} - (${member.id})\n**Reason:** ${reason}`)
            .setColor(`GREEN`)
            .setTimestamp();

        await member.send(embed2).then(() => {
            message.channel.send(embed3).catch(() => {})
            channel.send(embed3);
        }).catch(() => {
            message.channel.send(embed3).catch(() => {})
            channel.send(embed3);
            message.channel.send(sendEmbed)
        })

        message.guild.members.ban(member.id, { days: 1, reason: reason }).catch(() =>
            message.channel.send(embed.setDescription(`I couldn't ban that user`))
        )


    },
};