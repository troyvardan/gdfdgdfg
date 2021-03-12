const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    config: {
        name: 'reroll',
        description: 'Choose a new winner in the current giveaway.',
        aliases: [],
    },
    execute: async(client, message, args) => {
        const embed = new MessageEmbed({ color: client.color })
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed.setDescription('You do not have permission to rerol giveaways'));

        let giveaway = client.db.get(`giveaways.${message.channel.id}`)
        if (!giveaway) return message.channel.send(embed.setDescription(`Couldn\'t find a giveaway in this channel!`));
        let users = giveaway.users.map(s => s.id)
        for (var i of users)
            if (!(await client.users.fetch(i).catch(() => {}))) users = users.filter(s => s !== i)

        if (!users.length) return message.channel.send(embed.setDescription('I couldnt find any users who entered the giveaway in this channel'))

        let winner = users[~~(Math.random() * giveaway.users.length)]

        const newWinner = embed
            .setTitle('Giveaway Rerolled!')
            .setDescription(`:tada::tada: The new winner of the giveaway is <@${winner}> :tada::tada:`)

        message.channel.send(newWinner)
    }
}