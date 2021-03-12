const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: '8ball',
        description: 'Ask the magic 8ball a question, and recieve an answer.',
        aliases: [],
    },
    execute: async(Client, message, args, base, prefix) => {
        let Embed1 = new MessageEmbed()
            .setDescription(`You did not specify your question!`)
            .setColor(Client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
        let question = args.join(" ");
        if (!question)
            return message.channel.send(Embed1);
        else {
            let responses = [
                "Yes.",
                "No.",
                "Absolutely",
                "Fat NO",
                "You suck!",
                "Please leave me alone",
                "YUP",
                "Stop speaking",
                "Sure, I don't see why not?",
                "My sources are saying No",
                "Hmm, im not really sure?",
                "I guess..",
                "Thats a dumb question",
                "Im just trying to eat!",
                "NEVER!",
                "SURE!",
                "Stop using me sheesh!",
                "Don't care didn't ask",
                "I wont lie for you!",
                "Take a shower you smell!",
                "BRUH LEAVE ME ALONE HOLY SHIT!"
            ];
            let response =
                responses[Math.floor(Math.random() * responses.length - 1)];
            let Embed = new MessageEmbed()
                .setTitle(`My Response`)
                .setDescription(`${response}`)
                .setColor(Client.color)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            message.channel.send(Embed);
        }
    },
};