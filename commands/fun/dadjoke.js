const giveMeAJoke = require('discord-jokes');
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'dadjoke',
        description: 'Get your daily dose of dad jokes.',
        aliases: [`dad`],
    },
    execute: async(Client, message, args) => {
        giveMeAJoke.getRandomDadJoke(function(joke) {
            let embed1 = new MessageEmbed()
                .setTitle(`Joke System | Dad Jokes Category`)
                .setDescription(joke)
                .setImage(`https://cdn.discordapp.com/attachments/735248366291648523/742124449545060382/dddddddddddddddddddddddddd.gif`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setColor(Client.color);
            message.channel.send(embed1);
        });
    }
}