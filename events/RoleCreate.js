const { Server_Updates } = require("../settings/configuration").LOGGING;
const Discord = require(`discord.js`)
module.exports = {
    execute: async(Client, role) => {
        const logChannel = Client.channels.cache.get(Server_Updates);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`A role was created!`)
            .setDescription(`Role name - ${role.name}\nRole ID - ${role.id}`)
            .setColor(Client.color)
            .setFooter(`${role.guild.name} |  `, role.guild.iconURL({ dynamic: true }))
        if (logChannel) logChannel.send(embed)
    },
    name: "roleCreate",
};