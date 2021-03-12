const { MessageEmbed } = require('discord.js')

const {
    BANNED_WORDS,
    BYPASS_ROLES,
} = require("../settings/configuration").BOT_SETTINGS;

module.exports = {
    execute: async(Client, message) => {
        if (!message.guild) return;
        let embed3 = new MessageEmbed()
            .setDescription(`${message.author} Please watch your mouth!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        if (message.author.bot) return;
        if (message.deleted) return;

        if (message.member.roles.cache.some((r) => BYPASS_ROLES.includes(r.id)))
            return;

        if (BANNED_WORDS.some(e => message.content.toLowerCase().includes(e))) {
            message.delete();
            message.channel.send(embed3);
            return;
        }
    },
    name: "message",
};