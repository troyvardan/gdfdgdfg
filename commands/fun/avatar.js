const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'avatar',
        description: 'Get the avatar of a user or yourself.',
        aliases: [`pfp`],
    },
    execute: async(Client, message, args) => {
        const Embed = new MessageEmbed()
        if (!message.mentions.users.first()) {
            Embed.setTitle(`Displaying Your Avatar!`)
            Embed.setImage(message.author.displayAvatarURL());
            Embed.setColor(Client.color);
            return message.channel.send(Embed);
        } else {
            let User = message.mentions.members.first();
            Embed.setTitle(`Currently Displaying ${Client.users.cache.get(User.id).tag}'s Avatar!`)
            Embed.setImage(Client.users.cache.get(User.id).displayAvatarURL());
            Embed.setColor(Client.color);
            return message.channel.send(Embed)
        }
    }
}