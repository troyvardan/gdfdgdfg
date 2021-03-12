const { MessageEmbed } = require('discord.js')

const {
    BANNED_LINKS,
    BYPASS_LINKS_ROLES,
} = require("../settings/configuration").BOT_SETTINGS;

module.exports = {
    execute: async(Client, message) => {
        if (!message.guild || !message.member) return;
        let embed3 = new MessageEmbed()
            .setDescription(`${message.author} Please don't post links here!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        if (message.author.bot) return;
        if (message.deleted) return;

        if (message.member.roles.cache.some((r) => BYPASS_LINKS_ROLES.includes(r.id)))
            return;

        if (BANNED_LINKS.some(e => message.content.toLowerCase().includes(e))) {
            message.delete();
            message.channel.send(embed3);
            return;
        }
    },
    name: "message",
};