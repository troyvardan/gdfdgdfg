const Discord = require(`discord.js`)
const { Guild_ID } = require('../settings/configuration').BOT_SETTINGS
const { Server_Updates } = require("../settings/configuration").LOGGING;

module.exports = {
    execute: async(Client, channel) => {
        let guild = Client.guilds.cache.get(Guild_ID)
        if (!guild || guild && channel.guild !== guild) return

        const logChannel = Client.channels.cache.get(Server_Updates);
        const embed = new Discord.MessageEmbed()
            .setAuthor(`A Channel was created!`)
            .setDescription(`Channel name - ${channel.name}\nChannel ID - ${channel.id}`)
            .setColor(Client.color)
            .setFooter(`${channel.guild.name} |  `, channel.guild.iconURL({ dynamic: true }))

        if (logChannel) logChannel.send(embed);
    },
    name: "channelCreate",
};