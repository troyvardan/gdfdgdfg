const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'rps',
        description: 'Play a match of rock paper scissors against me.',
        aliases: [`rock-paper-scissors`],
    },
    execute: async(Client, message, args) => {
        let embed1 = new MessageEmbed()
            .setDescription(`Please include your choice, you can pick from rock,paper or scissors.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed2 = new MessageEmbed()
            .setDescription(`I won, I had paper.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed3 = new MessageEmbed()
            .setDescription(`I won, I had scissors.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed4 = new MessageEmbed()
            .setDescription(`I won I had rock.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed5 = new MessageEmbed()
            .setDescription(`You won, I had scissors.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed6 = new MessageEmbed()
            .setDescription(`You won, I had rock.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed7 = new MessageEmbed()
            .setDescription(`You won, I had paper.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed8 = new MessageEmbed()
            .setDescription(`Please include either: Rock, Paper, or Scissors.`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);
        let embed9 = new MessageEmbed()
            .setDescription(`It was a tie, we both had ${args[0]}`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor(Client.color);

        if (!args[0]) {
            return message.channel.send(embed1)
        }

        let choices = ['rock', 'paper', 'scissors'];
        if (choices.includes((args[0]).toLowerCase())) {
            let number = Math.floor(Math.random() * 3);
            if (number == 1) {
                return message.channel.send(embed9)
            }
            if (number == 2) {
                if ((args[0]).toLowerCase() == "rock") {
                    return message.channel.send(embed2)
                }
                if ((args[0]).toLowerCase() == "paper") {
                    return message.channel.send(embed3)
                }
                if ((args[0]).toLowerCase() == "scissors") {
                    return message.channel.send(embed4)
                }
            }
            if (number == 0) {
                if ((args[0]).toLowerCase() == "rock") {
                    return message.channel.send(embed5)
                }
                if ((args[0]).toLowerCase() == "paper") {
                    return message.channel.send(embed6)
                }
                if ((args[0]).toLowerCase() == "scissors") {
                    return message.channel.send(embed7)
                }
            }
        } else {
            return message.channel.send(embed8)
        }
    }
}