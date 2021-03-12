const { MessageEmbed } = require("discord.js");
const changed = new Map()

module.exports = {
    config: {
        name: 'rename',
        description: 'Change a tickets channel name.',
        aliases: [],
    },
    execute: async(Client, message, args, config, prefix, base) => {
        if (changed.has(message.channel.id)) return message.channel.send('Please wait 5 minutes before changing a channel name again')
        let rename = args.join(" ")
        if (!rename) return message.reply(`Please type want you want the ticket to be renamed to!`)
        const embed = new MessageEmbed()
            .setDescription(`I have renamed this ticket! ${message.author}`)
            .setColor(Client.color)

        message.channel.send(embed)
        message.channel.setName(`${rename}`)
        changed.set(message.channel.id, true)
        setTimeout(() => changed.delete(message.channel.id), 350000)
    }
}