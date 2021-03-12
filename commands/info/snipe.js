const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'snipe',
        description: 'See the last deleted message in a channel.',
        aliases: [],
    },
    execute: async(Client, message, args) => {
        let embed3 = new MessageEmbed()
            .setDescription(`Theres nothing to snipe :/`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        let snipe = Client.snipes.get(message.channel.id)
        if (!snipe || !snipe.content) return message.channel.send(embed3)

        const embed = new Discord.MessageEmbed({ color: Client.color })
            .setAuthor(snipe.author.username, snipe.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setTimestamp()
            .setTitle(`Sniped Message from ${snipe.author.tag}`)
            .setDescription(`Displaying the last deleted message!\n\nThis user said: \`\`\`${snipe.content}\`\`\``)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        message.channel.send(`I have sniped this users message!`)
        message.channel.send(embed);

        exports.help = {
            name: "snipe",
            description: "Shows the last deleted message.",
            usage: ".snipe"
        };
    }
}