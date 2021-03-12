const { MessageEmbed } = require(`discord.js`)

module.exports = {
    config: {
        name: 'listing',
        description: 'Create a listing for your buisness.',
        aliases: [],
    },
    execute: async(client, message, args, base, year, date) => {
        let embed3 = new MessageEmbed()
            .setDescription(`What is the name of the product you are wishing to list?`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        let embed4 = new MessageEmbed()
            .setDescription(`Whats is the description for this product?\nDon\'t use this for variations we got a section for that later!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        let embed5 = new MessageEmbed()
            .setDescription(`Whats is the price going to be?`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        let embed6 = new MessageEmbed()
            .setDescription(`Please provide an image link for the embed if you have one!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        let embed7 = new MessageEmbed()
            .setDescription(`Extra information, this is where you can include variations of products extras etc.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(client.color);
        await message.delete();
        if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply(base.no).then(w => { setTimeout(() => { w.delete() }, 5000) });
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(embed3).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(collected => {
                var productname = collected.first().content;
                message.channel.send(embed4).then(() => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(collected => {
                        var productdescription = collected.first().content;
                        message.channel.send(embed5).then(() => {
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(collected => {
                                var price = collected.first().content;
                                message.channel.send(embed6).then(() => {
                                    message.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 60000,
                                        errors: ['time']
                                    }).then(collected => {
                                        var image = collected.first().content;
                                        message.channel.send(embed7).then(() => {
                                            message.channel.awaitMessages(filter, {
                                                max: 1,
                                                time: 60000,
                                                errors: ['time']
                                            }).then(collected => {
                                                var extrainfo = collected.first().content;
                                                let embed = new MessageEmbed()
                                                    .setColor(client.color)
                                                    .setTitle(`**__${productname}__**`)
                                                    .setDescription(productdescription)
                                                    .addField('**__Price:__**', price, true)
                                                    .addField('**__Extra Info__**:', extrainfo, false)
                                                    .setAuthor(`New Listing From ${message.author.tag}`, message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
                                                    .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                                                    .setTimestamp()
                                                if (image) embed.setImage(image)
                                                message.channel.send(embed);
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}