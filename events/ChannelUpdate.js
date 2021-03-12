const Discord = require(`discord.js`)
const { Server_Updates } = require("../settings/configuration").LOGGING;

module.exports = {
    execute: async(Client, oldChannel, newChannel) => {
        const logChannel = Client.channels.cache.get(Server_Updates);
        if (oldChannel.name === newChannel.name) return
        const embed = new Discord.MessageEmbed()
            .setAuthor(`A Channel was Updated!`)
            .setDescription(`**Channel: **${newChannel.name}\n**Old Name**: ${oldChannel.name}\n**New Name**: ${newChannel.name}`)
            .setColor(Client.color)
            .setFooter(`${oldChannel.guild.name} |  `, oldChannel.guild.iconURL({ dynamic: true }))

        if (logChannel) logChannel.send(embed);
    },
    name: "channelUpdate",
};