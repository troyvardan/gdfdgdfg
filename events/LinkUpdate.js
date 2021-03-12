const { MessageEmbed } = require('discord.js')

const { BANNED_LINKS, BYPASS_LINKS_ROLES } = require("../settings/configuration").BOT_SETTINGS;

module.exports = {
    execute: async(Client, message) => {
        if (!message.guild || message.author.bot || message.deleted) return
        let embed3 = new MessageEmbed()
            .setDescription(`${message.author} Please don't post links here!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (message.member.roles.cache.some((r) => BYPASS_LINKS_ROLES.includes(r.id))) return;


        if (BANNED_LINKS.includes(message.content.toLocaleLowerCase()))
            return message.reply(embed3).then(message.delete());

    },
    name: "messageUpdate",
};