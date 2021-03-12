const { Voice_Updates } = require("../settings/configuration").LOGGING;
const { MessageEmbed } = require(`discord.js`)

module.exports = {
    execute: async(Client, oldState, newState) => {
        const logChannel = Client.channels.cache.get(Voice_Updates);
        if (!logChannel) return
        const embed = new MessageEmbed({ color: Client.color })
            .setAuthor(`Voice Status Update!`)
            .setFooter(`${oldState.guild.name} |  `, newState.guild.iconURL({ dynamic: true }))

        if (oldState.serverDeaf !== newState.serverDeaf && newState.serverDeaf) logChannel.send(embed.setDescription(`${newState.member.user.tag} Was Server Deafened!`))
        if (oldState.serverDeaf !== newState.serverDeaf && !newState.serverDeaf) logChannel.send(embed.setDescription(`${newState.member.user.tag} Was Undeafened!`))

        else if (oldState.serverMute !== newState.serverMute && newState.serverMute) logChannel.send(embed.setDescription(`${newState.member.user.tag} Was Server Muted!`))
        else if (oldState.serverMute !== newState.serverMute && !newState.serverMute) logChannel.send(embed.setDescription(`${newState.member.user.tag} Was Unmuted!`))

        else if (oldState.selfDeaf !== newState.selfDeaf && newState.selfDeaf) logChannel.send(embed.setDescription(`${newState.member.user.tag} Self Deafend!`))
        else if (oldState.selfDeaf !== newState.selfDeaf && !newState.selfDeaf) logChannel.send(embed.setDescription(`${newState.member.user.tag} Undeafend themself!`))

        else if (oldState.selfMute !== newState.selfMute && newState.selfMute) logChannel.send(embed.setDescription(`${newState.member.user.tag} Self Muted`))
        else if (oldState.selfMute !== newState.selfMute && !newState.selfMute) logChannel.send(embed.setDescription(`${newState.member.user.tag} Unmuted themself!`))

        else if (oldState.channelID !== newState.channelID && newState.channelID && !oldState.channelID) logChannel.send(embed.setDescription(`${newState.member.user.tag} joined a voice channel!`))
        else if (oldState.channelID !== newState.channelID && oldState.channelID && !newState.channelID) logChannel.send(embed.setDescription(`${newState.member.user.tag} left a voice channel!`))
        else if (oldState.channelID !== newState.channelID && oldState.channelID && newState.channelID) logChannel.send(embed.setDescription(`${newState.member.user.tag} moved voice channels!`))

        else if (oldState.streaming !== newState.streaming && newState.streaming) logChannel.send(embed.setDescription(`${newState.member.user.tag} starting streaming!`))
        else if (oldState.streaming !== newState.streaming && !newState.streaming) logChannel.send(embed.setDescription(`${newState.member.user.tag} stopped streaming!`))

    },
    name: "voiceStateUpdate",
};