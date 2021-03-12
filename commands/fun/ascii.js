const figlet = require('figlet');
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'ascii',
        description: 'Turn normal text into ascii art.',
        aliases: [],
    },
    execute: async(Client, message, args, base, prefix) => {
        let embed3 = new MessageEmbed()
            .setDescription(`Please provide some text!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed4 = new MessageEmbed()
            .setDescription(`Sorry, please provide text shorter than 2000 characters.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        if (!args[0]) return message.channel.send(embed3);

        msg = args.join(" ");

        figlet.text(msg, function(err, data) {
            if (err) {
                console.log('Something went wrong');
                console.dir(err);
            }
            if (data.length > 2000) return message.channel.send(embed4)

            message.channel.send('```' + data + '```')
        })
    }
}