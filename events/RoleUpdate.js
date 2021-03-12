const { Server_Updates } = require("../settings/configuration").LOGGING;
const Discord = require(`discord.js`)
module.exports = {
    execute: async(Client, oldRole, newRole) => {
        const logChannel = Client.channels.cache.get(Server_Updates);
        if (oldRole.name === newRole.name) return
        const embed = new Discord.MessageEmbed()
            .setAuthor(`A role was updated!`)
            .setDescription(`Old Role name - ${oldRole.name}\nNew Role Name - ${newRole.name}\nID - ${newRole.id}`)
            .setColor(Client.color)
            .setFooter(`${newRole.guild.name} |  `, newRole.guild.iconURL({ dynamic: true }))
        if (logChannel) logChannel.send(embed)
    },
    name: "roleUpdate",
};