const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
    config: {
        name: 'coinflip',
        description: 'Test your luck and flip a coin.',
        aliases: [`cf`],
    },
    execute: async(Client, message, args) => {
        const rand = ['Heads', 'Tails'];
        const responses = Math.floor((Math.random() * rand.length) + 0);


        if (responses == 'Heads') {}

        if (responses == 'Tails') {}

        let userembed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} flipped a coin and it landed on ${rand[responses]}!`)
            .setColor(Client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        .setTimestamp()

        message.channel.send(userembed);
    }
}