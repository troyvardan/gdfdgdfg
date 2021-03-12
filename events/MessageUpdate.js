const { Server_Updates } = require("../settings/configuration").LOGGING;
const { MessageEmbed } = require(`discord.js`)
    //better to grab that specific export instead of grabbing the whole library

module.exports = {
    execute: async(Client, oldMessEDIT, newMessEDIT) => {
        const logChannel = Client.channels.cache.get(Server_Updates)

        if (oldMessEDIT.author && oldMessEDIT.author.bot) return undefined
        if (oldMessEDIT.content.length > 1020) return
        if (newMessEDIT.content.length > 1020) return // 
        if (!oldMessEDIT.guild) return

        let logEmbed = new MessageEmbed()
            .setAuthor("A message was edited!")
            .setColor(Client.color)
            .setTimestamp()
            .setFooter(`${newMessEDIT.guild.name} |  `, newMessEDIT.guild.iconURL({ dynamic: true, format: 'png' }))
            .addField("Message Before Edit:", oldMessEDIT.content)
            .addField("Message After Edit:", newMessEDIT.content)
            .addField("User:", `${newMessEDIT.author}`)
            .addField("Channel Message Was Edited In:", oldMessEDIT.channel.toString())

        if (logChannel) logChannel.send(logEmbed)
    },
    name: "messageUpdate",
};