const { MessageEmbed } = require(`discord.js`)
const ms = require('parse-duration');
const db = require('quick.db')
const { utc } = require('moment')
const { shuffle } = require('lodash')

module.exports = {
    config: {
        name: 'giveaway',
        description: 'Start a giveaway in the current channel.',
        aliases: [],
    },
    execute: async(client, message, args, bot) => {
        const embed = new MessageEmbed({ color: client.color })
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        if (message.author.id !== '632289810035507211' && !message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send(embed.setDescription(`You can\`t use that!`));

        let data = { hostedBy: message.author.tag, users: [] }
        let filter = m => m.author.id === message.author.id;
        let collector = message.channel.createMessageCollector(filter, { time: 120000 })
        message.channel.send(embed.setDescription('What channel do you want your giveaway to start in?'))

        collector.on('collect', msg => {
            if (!data.channel) {
                if (!msg.mentions.channels.first()) return message.channel.send(embed.setDescription('That is not a valid channel, try again'))
                data.channel = msg.mentions.channels.first()
                message.channel.send(embed.setDescription(`The giveaway will be in ${data.channel.toString()}. How long do you want the giveaway to last?\n\nExample: 5d`))

            } else if (!data.time) {
                if (!ms(msg.content)) return message.channel.send(embed.setDescription('An invalid time was provided, try again'))
                if (ms(msg.content) > 2.628e+9) return message.channel.send(embed.setDescription('The time cant be longer than 1 month, please try again'))
                message.channel.send(embed.setDescription(`The giveaway will last ${msg.content}! How many winners do you want for your giveaway?`))
                data.time = ms(msg.content)

            } else if (!data.winners) {
                if (isNaN(msg.content) || parseInt(msg.content) <= 0) return message.channel.send(embed.setDescription('You must provide a valid amount of winners, try again'))
                if (msg.content > 100) return message.channel.send(embed.setDescription('You cant have more than 100 winners'))
                data.winners = msg.content
                message.channel.send(embed.setDescription(`The giveaway will have ${data.winners} winner(s). Would you like it to ping everyone? (yes/no)`))

            } else if (!data.ping) {
                if (!['yes', 'no'].some(e => e.includes(msg.content))) return message.channel.send(embed.setDescription('Please answer with either yes or no'))
                data.ping = msg.content
                message.channel.send(embed.setDescription(`The giveaway will ${data.ping === 'yes' ? '' : 'not'} ping everyone. What do you want the prize to be?`))

            } else if (!data.prize) {
                if (msg.content.length > 30) return message.channel.send(embed.setDescription('You must not provide a prize name of over 30 characters, try again but with a shorter name'))
                data.prize = msg.content
                msg.channel.send(embed.setDescription(`The giveaway has been created in ${data.channel.toString()}`))
                collector.stop()
            }
        })

        collector.on('end', async() => {
            if (!data.prize) return message.channel.send(embed.setDescription('Giveaway command time limit exceeded, command cancelled'))
            let giveawayEmbed = embed
                .setTitle('🎉🎉 **GIVEAWAY** 🎉🎉')
                .addField('Prize:', data.prize, true)
                .addField('Winner(s):', data.winners, true)
                .addField('Hosted By:', message.author, true)
                .addField('Started on:', utc(new Date(Date.now())).format('dddd, MMMM Do YYYY'), true)
                .addField('Ending on:', utc(new Date(Date.now() + data.time)).format('dddd, MMMM Do YYYY'), true)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setTimestamp()

            let msg = await data.channel.send(data.ping === 'yes' ? '@everyone' : '', giveawayEmbed).catch(() => message.channel.send(embed.setDescription('I don\'t have permissions to send messages in that channel')))
            if (!msg) return
            msg.react('🎉')
            db.set(`giveaways.${data.channel.id}`, {...data, startedAt: Date.now(), messageID: msg.id, embed: giveawayEmbed })

            setTimeout(async() => {
                let newData = db.get(`giveaways.${data.channel.id}`)
                let winners = shuffle(newData.users).slice(0, data.winners).map(s => `<@${s.id}>`).join(' ')

                let endEmbed = giveawayEmbed
                    .setTitle('🎉🎉 **GIVEAWAY ENDED** 🎉🎉')
                    .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                    .setDescription(`${newData.prize}\n\nWinner(s): ${winners || 'Looks like nobody reacted, I was excited to giveaway something!'}`)

                data.channel.messages.fetch(newData.messageID).then(toEdit => {
                    toEdit.edit(endEmbed)
                })

                setTimeout(() => {
                    db.delete(`giveaway.${newData.channel.id}`)
                }, 1.8e+6);
            }, data.time);
        })
    }
}