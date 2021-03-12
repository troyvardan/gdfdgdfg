const { MessageEmbed } = require('discord.js');
const { COMMAND_PREFIX } = require('../../settings/configuration').BOT_SETTINGS;
module.exports = {
    config: {
        name: 'poll',
        description: 'Create a poll to get user opinions on a topic or idea.',
        aliases: [],
    },
    execute: async(Client, message, args) => {

        let options = args.join(' ').split('|').map(s => s.trim().replace(/\s\s+/g, ' '))
        let question = options.shift(),
            emoji = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯']


        if (!options[1]) return message.channel.send(`To create a poll, do \`${COMMAND_PREFIX}poll Question | op1 | op2 | etc\`\nMinimum of 2 options are required`)

        await message.delete

        const embed = new MessageEmbed()
            .setTitle(`This poll was created by ${message.author.username}`)
            .addField(question, `${emoji[0]} ${options[0]}`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        for (let i = 1; i < options.length && i < 10; i++) embed.addField('\u200b', `${emoji[i]} ${options[i]}`)

        let msg = await message.channel.send(embed)

        for (let i in options) await msg.react(emoji[i])
    },
};