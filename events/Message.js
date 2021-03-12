const { COMMAND_PREFIX, MUTE_ROLE, Time_Muted, Guild_ID } = require("../settings/configuration").BOT_SETTINGS;
let dmlog = require('../settings/configuration').LOGGING.Bot_DMS_Channel
let dmsettings = require('../settings/configuration').USER_DMS
const levelSettings = require("../settings/configuration").LEVELING_SYSTEM;
const pingCOUNT = require("../settings/configuration").Ping_Prevention.Max_Pings
const pingSettings = require('../settings/configuration').Ping_Prevention
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const parse = require('parse-duration')

module.exports = {
    execute: async(Client, message) => {

        if (pingSettings.Enabled && !['message', 'ban', 'kick'].includes(pingSettings.Punishment))
            return console.log('Please choose either message / ban / kick for the ping punishment type.')

        if (pingSettings.Enabled && !['role', 'channel', 'user'].includes(pingSettings.Enabled_Types))
            return console.log('Please choose role / channel / user for the enabled ping types.')
        let pings = message.mentions.users.size + message.mentions.roles.size + message.mentions.channels.size

        if (message.mentions.users.size > pingSettings.Max_User_Pings) {
            if (pingSettings.Punishment === 'message') return message.channel.send(`${message.author}, please dont ping more than ${pingSettings.Max_User_Pings} user(s) in a single message.`)
            else message.member[pingSettings.Punishment]().catch(() => {})
        }

        if (message.mentions.roles.size > pingSettings.Max_Role_Pings) {
            if (pingSettings.Punishment === 'message') return message.channel.send(`${message.author}, please dont ping more than ${pingSettings.Max_Role_Pings} role(s) in a single message.`)
            else message.member[pingSettings.Punishment]().catch(() => {})
        }

        if (message.mentions.channels.size > pingSettings.Max_Channel_Pings) {
            if (pingSettings.Punishment === 'message') return message.channel.send(`${message.author}, please dont mention more than ${pingSettings.Max_Channel_Pings} channel(s) in a single message.`)
            else message.member[pingSettings.Punishment]().catch(() => {})
        }

        if (pings > pingSettings.Max_Pings) {
            if (pingSettings.Punishment === 'message') return message.channel.send(`${message.author}, please dont mention more than ${pingSettings.Max_Pings} time(s) in a single message.`)
            else message.member[pingSettings.Punishment]().catch(() => {})
        }

        let guild = Client.guilds.cache.get(Guild_ID)

        if (!message.author.bot && message.channel.type === 'dm') {
            if (!dmsettings.Enabled) return
            if (!db.get('dmchannels')) db.set('dmchannels', {})

            let dmroles = dmsettings.View_Dmchannels_Roles.filter(role => guild.roles.cache.has(role))
            let guildDM = Object.entries(db.get(`dmchannels`)).find(s => s[1].user.id === message.author.id)
            let dmchannel;

            if (guildDM) dmchannel = Client.channels.cache.get(guildDM[1].channel.id)

            const dmembed = new MessageEmbed({ color: Client.color })
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
                .setDescription(`**New Dm From:**\n${message.author.tag} (${message.author.id})\n\n**Message:**\n${message.content}`)
                .setThumbnail(message.author.displayAvatarURL({ dyanmic: true }))
                .setFooter(`${guild.name} |  `, guild.iconURL({ dynamic: true }))

            if (!dmchannel) {
                let channel = await guild.channels.create(dmsettings.Dm_Channel_Name.replace('{user}', message.author.username).slice(0, 100) || `new-dm-${message.author.username}`, {
                    parent: dmsettings.Dm_Category,
                    permissionOverwrites: [{
                            id: guild.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        ...dmroles.map(s => { return { id: s, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] } })
                    ]
                })

                db.set(`dmchannels.${channel.id}`, { user: message.author, channel: channel })
                channel.send(dmembed)
            } else {
                dmchannel.send(dmembed)
            }

        }

        if (!message.guild || message.author.bot) return
        if (levelSettings.Enabled) xp(message)

        let dmchannel = Client.db.get(`dmchannels.${message.channel.id}`)
        if (!message.content.startsWith(`${COMMAND_PREFIX}closedm`) && dmchannel) {
            let user = await Client.users.fetch(dmchannel.user.id).catch(() => {})
            if (!user) return message.channel.send(embed.setDescription('Failed to send dm, the user has dms off or the user isnt in this server'))

            const embed2 = new MessageEmbed({ color: Client.color })
                .setFooter(`${message.guild.name} |  `, guild.iconURL({ dynamic: true }))

            user.send(embed2.setThumbnail(message.author.displayAvatarURL({ dynamic: true })).setDescription(`**Message from Staff Member:**\n${message.author.tag}\n\n**Message:**\n${message.content}`)).then(() => {
                    message.channel.send(embed2.setThumbnail(null).setDescription(`Successfully sent the message to ${dmchannel.user.tag}`))
                })
                .catch(() => {
                    message.channel.send(embed.setThumbnail(null).setDescription('Failed to send dm, the user has dms off or the user isnt in this server'))
                })
            return
        }

        let spam = Client.spam.get(message.author.id) || 0
        if (spam > 3) {
            if (message.member.roles.cache.has(MUTE_ROLE)) return
            message.member.roles.add(MUTE_ROLE).then(() => {
                const embed = new MessageEmbed()
                    .setTitle('Punishment System!')
                    .setDescription(`${message.author} You have been muted for spamming!`)
                    .setColor(Client.color)
                    .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp()
                message.channel.send(embed)
            }).catch(() => {})

            setTimeout(() => {
                message.member.roles.remove(MUTE_ROLE).catch(() => {})
            }, parse(Time_Muted));
            return
        } else if (spam === 0) setTimeout(() => Client.spam.delete(message.author.id), 5000);
        Client.spam.set(message.author.id, spam + 1)

        if (Client.afk.has(message.author.id)) {
            message.channel.send(`Welcome back ${message.author}! I removed your afk.`)
            Client.afk.delete(message.author.id)
            message.member.setNickname(message.member.displayName.replace(/(\[AFK\])/g, '')).catch(() => {})
        }

        if (message.mentions.users.first() && Client.afk.has(message.mentions.users.first().id)) {
            let user = message.mentions.users.first()

            let embed5 = new MessageEmbed()
                .setDescription(`${user.username} is currently afk:\nReason: ${Client.afk.get(user.id).message}\nTime they went afk: ${ms(Date.now() - Client.afk.get(user.id).time, { long: true })} ago`)
                .setColor(Client.color)
                .setFooter(`${message.channel.guild.name} |  `, message.channel.guild.iconURL({ dynamic: true }))

            message.channel.send(embed5)
        }

        if (message.mentions.has(Client.user.id) && new RegExp(`^<@!?${Client.user.id}>$`).test(message.content)) {
            Client.commands.get('help').execute(Client, message)
        }

        if (!message.content.startsWith(COMMAND_PREFIX)) return
        const args = message.content.slice(COMMAND_PREFIX.length).split(/ +/);
        const name = args.shift().toLowerCase();

        const command =
            Client.commands.get(name) ||
            Client.commands.find(c => c.aliases && c.aliases.includes(name));

        if (command) {
            command.execute(Client, message, args);
            let embed3 = new MessageEmbed({ color: Client.color })
                .setTitle('Command Used!')
                .addField('User', message.author.toString(), true)
                .addField('Command used:', `${COMMAND_PREFIX}${name}`)

            Client.channels.cache
                .get(require("../settings/configuration").LOGGING.Server_Updates)
                .send(embed3).catch(e => { console.log(e) })
        }
    },
    name: "message",
};



let xp = (message) => {
    let gen = [10, 15],
        max = 15;

    if (message.attachments.first()) gen[1] += 10
    gen[1] += ~~(message.content.length / 100)

    message.client.db.ensure(`${message.guild.id}.${message.author.id}.xp`, { total: 0, amount: 0, level: 0 })
    const amount = ~~(Math.random() * (gen[1] - gen[0])) + gen[0]
    db.add(`${message.guild.id}.${message.author.id}.xp.total`, amount)
    db.add(`${message.guild.id}.${message.author.id}.xp.amount`, amount)
    const data = db.get(`${message.guild.id}.${message.author.id}.xp`)

    if ((data.level || 1) * 500 < data.amount) {
        db.set(`${message.guild.id}.${message.member.id}.xp`, { level: data.level + 1, amount: 0 })
        const xpChannel = message.guild.channels.cache.get(levelSettings.Level_Up_Channel_ID)
        let embed = new MessageEmbed()
            .setAuthor(`Level Up 🎉`)
            .setDescription(levelSettings.Level_Up_Message.replace('{user}', message.author.toString()).replace('{level}', data.level + 1))
            .setColor(message.client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setTimestamp()

        if (xpChannel) xpChannel.send(embed)
    }
}