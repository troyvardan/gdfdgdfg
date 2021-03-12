const { MessageEmbed } = require('discord.js');
const parse = require('parse-duration');
const ms = require('humanize-duration')

module.exports = {
    config: {
        name: 'timer',
        description: 'Allows you to create a timer.',
        aliases: [`countdown`],
    },
    execute: async(Client, message, args) => {
        let embed3 = new MessageEmbed()
            .setDescription(`Please provide a valid time!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        if ([null, Infinity].includes(parse(args[0]))) return message.channel.send(embed3);

        const end = Date.now() + parse(args[0]);

        const embed = new MessageEmbed()
            .setAuthor(`ACTIVE TIMER`)
            .setDescription(`⏰ **Time**: ${ms(end - Date.now(), {round: true})}`)
            .setColor(Client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        const msg = await message.channel.send(embed);

        const timer = setInterval(() => {
            const embed2 = new MessageEmbed()
                .setAuthor(`ACTIVE TIMER`)
                .setDescription(`⏰ **Time**: ${ms(end - Date.now(), { round: true })}`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setColor(Client.color);

            if (Date.now() > end) {
                const done = new MessageEmbed()
                    .setDescription(`Timer has ended!`)
                    .setColor(Client.color);
                clearInterval(timer)
                return msg.edit(done)
            } else msg.edit(embed2)
        }, 5000);
    },
};