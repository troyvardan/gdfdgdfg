const Discord = require("discord.js");
module.exports = {
    config: {
        name: 'ping',
        description: 'View the bots ping.',
        aliases: [],
    },
    execute: async(client, message, args) => {
        message.channel.send(`Calculating`).then((ping) => {
            const _ = new Discord.MessageEmbed()
                .setTitle("Pong!")
                .setColor(client.color)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setDescription(
                    `Message round-trip took  ${Math.floor(
            ping.createdTimestamp - message.createdTimestamp
          )}ms\nHeartbeat ping is ${Math.round(client.ws.ping)}ms`
                )
            ping.edit(_);
            ping.edit("\u200B");
        });
    },
};