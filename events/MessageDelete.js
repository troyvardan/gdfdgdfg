const Discord = require(`discord.js`)
const { Server_Updates } = require("../settings/configuration").LOGGING;


module.exports = {
        execute: async(Client, message) => {
                const logChannel = Client.channels.cache.get(Server_Updates);

                Client.snipes.set(message.channel.id, message)

                setTimeout(() => {
                    if (Client.snipes.get(message.channel.id) === message)
                        Client.snipes.delete(message.channel.id)
                }, 300000);

                const embed = new Discord.MessageEmbed()
                    .setAuthor(`A message was deleted!`)
                    .setDescription(`**Channel:**  <#${message.channel.id}>${message.author ? `\n**User:** ${message.author}` : ''}${message.content ? `\n**Message Deleted:** ${message.content}` : ''}\n**Message ID:**  ${message.id}`)
            .setColor(Client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (logChannel) logChannel.send(embed)
    },
    name: "messageDelete",
};