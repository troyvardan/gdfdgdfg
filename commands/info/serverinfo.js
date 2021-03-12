const Discord = require('discord.js');

function checkDays(date) {
    let now = new Date();
    let check = now.getTime() - date.getTime();
    let days = Math.floor(check / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

module.exports = {
    config: {
        name: 'serverinfo',
        description: 'View this servers information and statistics.',
        aliases: [`sinfo`],
    },
    execute: async(Client, message, args) => {
        let embed = new Discord.MessageEmbed();
        embed.setTitle("Servers Information")
            .addField("Created", `${message.guild.createdAt.toString().substr(0, 15)},\n${checkDays(message.guild.createdAt)}`, true)
            .addField("Guild ID", message.guild.id, true)
            .addField("Server Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
            .addField("Server Region", message.guild.region, true)
            .addField("Members", message.guild.memberCount, true)
            .addField("Roles", message.guild.roles.cache.size, true)
            .addField("Channels", message.guild.channels.cache.size, true)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        message.channel.send(embed);
    }
}