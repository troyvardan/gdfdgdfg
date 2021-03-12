const { MessageEmbed } = require('discord.js');
const Message = require('../../events/Message');
const { COMMAND_PREFIX } = require('../../settings/configuration').BOT_SETTINGS
module.exports = {
    config: {
        name: 'help',
        description: 'Get help on the bots commands.',
        aliases: [],
    },
    execute: async(Client, message, args) => {
        let index = 0
        const embeds = Client.categories.map((a, b, i) => new MessageEmbed({ color: Client.color }).setThumbnail(Client.user.displayAvatarURL({ dynamic: true })).setTitle(`${b.charAt(0).toUpperCase() + b.slice(1)} Commands - ${++index}/8`).setDescription(a.map(c => `'${COMMAND_PREFIX + c}': ${Client.commands.get(c).config.description}`)))

        message.channel.send(embeds[0]).then(async emb => {
            ['⏮️', '◀️', '▶️', '⏭️', '⏹️', '🔢'].forEach(async m => await emb.react(m))

            const filter = (_, u) => u.id === message.author.id
            const collector = emb.createReactionCollector(filter, { time: 300000 })
            let page = 1
            collector.on('collect', async(r, user) => {
                let current = page;
                emb.reactions.cache.get(r.emoji.name).users.remove(user.id)
                if (r.emoji.name === '◀️' && page !== 1) page--
                    else if (r.emoji.name === '▶️' && page !== embeds.length) page++
                        else if (r.emoji.name === '⏮️') page = 1
                        else if (r.emoji.name === '⏭️') page = embeds.length
                else if (r.emoji.name === '⏹️') return collector.stop()
                else if (r.emoji.name === '🔢') {
                    let msg = await message.channel.send('What page would you like to flip to?')
                    let collector = await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content > 0 && m.content <= embeds.length, { max: 1, time: 8000 })
                    msg.delete()
                    if (collector && collector.first().content > 0 && collector.first().content <= embeds.length) page = collector.first().content
                }


                if (current !== page) emb.edit(embeds[page - 1].setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true })))
            })
        })

    },
};