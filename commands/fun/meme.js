const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    config: {
        name: 'meme',
        description: 'Get a random meme.',
        usage: `meme`,
        aliases: [`pic`],
    },
    execute: async(Client, message, args) => {
        const subReddits = ["meme", "me_irl", "dankmeme"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
            .setTitle(`Generated Meme!`)
            .setURL(`http://reddit.com/${random}`)
            .setImage(img)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color)

        message.channel.send(embed);

    }
}