const { MessageEmbed } = require("discord.js");
const logs = require("../../settings/configuration").LOGGING.Unban_Channel_Logs;

module.exports = {
    config: {
        name: 'unban',
        description: 'Unbans a user that has been banned from the server.',
        aliases: [],
    },
    execute: async(Client, message, args) => {
        let channel = message.guild.channels.cache.get(logs)
        let embed = new MessageEmbed({ color: Client.color })
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(embed.setDescription('You don\'t have permissions to use this command'))

        let member, reason = args.slice(1).join(' ') || 'Unspecified'
        try {
            member = await Client.users.fetch(args[0])
        } catch (e) {
            return message.channel.send(embed.setDescription('Enter a valid user id for me to unban'))
        }

        try {
            await message.guild.fetchBan(args[0])
        } catch (e) {
            return message.channel.send(embed.setDescription('That user isn\'t banned'))
        }

        const logEmbed = embed
            .setTitle("Administration System | Unban Category")
            .setThumbnail(member.displayAvatarURL())
            .addField("User Unbanned:", member)
            .addField("Staff Member:", message.author)
            .setTimestamp();

        message.channel.send(logEmbed)
        message.guild.members.unban(args[0], reason).catch(() => {})
        if (channel) channel.send(logEmbed)
    },
};