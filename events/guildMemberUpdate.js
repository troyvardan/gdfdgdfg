const { Server_Updates } = require("../settings/configuration").LOGGING;
const { MessageEmbed } = require(`discord.js`)
module.exports = {
    execute: async(Client, oldMember, newMember) => {
        const logChannel = Client.channels.cache.get(Server_Updates);

        if (newMember.roles.cache.map(s => s.id).join('') !== oldMember.roles.cache.map(s => s.id).join('')) {
            let roles = oldMember.roles.cache.difference(newMember.roles.cache)
            const embed = new MessageEmbed({ color: Client.color })
                .setAuthor(`${newMember.user.tag}'s roles were modified!`)
                .setDescription(`Added Roles - ${roles.filter(r => !oldMember.roles.cache.has(r.id)).map(s => s.toString()).join(' ') || 'None'}\nRemoved Roles - ${roles.filter(r => !newMember.roles.cache.has(r.id)).map(s => s.toString()).join(' ') || 'None'}`)
                .setFooter(`${newMember.guild.name} |  `, newMember.guild.iconURL({ dynamic: true }))

            if (logChannel) logChannel.send(embed)
        }

    },
    name: "guildMemberUpdate",
};