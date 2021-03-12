const Discord = require(`discord.js`)
const { Server_Updates } = require("../settings/configuration").LOGGING;

module.exports = {
    execute: async(Client, channel) => {
        const logChannel = Client.channels.cache.get(Server_Updates);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`A Channel was deleted!`)
            .setDescription(`Channel Name - ${channel.name}\nChannel ID - ${channel.id}`)
            .setColor(Client.color)
            .setFooter(`${channel.guild.name} |  `, channel.guild.iconURL({ dynamic: true }))

        logChannel.send(embed);
    },
    name: "channelDelete",
};