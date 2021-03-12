const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: 'darkjoke',
        description: 'Recieve a dark but humerous joke.',
        aliases: [],
    },
    execute: async(Client, message) => {
        let responses = [
            "Give a man a match, and he'll be warm for a few hours. Set a man on fire, and he will be warm for the rest of his life.",
            "My wife and I have reached the difficult decision that we do not want children. If anybody does, please just send me your contact details and we can drop them off tomorrow.",
            "What do you give an armless child for Christmas?\nNothing, he wouldn’t be able to open it anyways.",
            "I took away my ex-girlfriend’s wheelchair.\nGuess who came crawling back to me?",
            "When does a joke become a dad joke?\nWhen it leaves and never comes back.",
            "Can orphans eat at a family restaurant?",
            "A man went into a library and asked for a book on how to commit suicide. The librarian said: “Fuck off, you won’t bring it back.”",
            "My grandma with alzheimer's used to tell us a joke.\nShe’d say “Knock knock”, we’d say “Who’s there?”\nThen she’d say “I can’t remember”… and start to cry.",
            "Why can’t orphans play baseball?\nThey don’t know where home is.",
        ];
        let response =
            responses[Math.floor(Math.random() * responses.length - 1)];
        let Embed = new MessageEmbed()
            .setTitle(`Joke System | Dark Jokes Category`)
            .setImage(`https://cdn.discordapp.com/attachments/735248366291648523/742124449545060382/dddddddddddddddddddddddddd.gif`)
            .setDescription(`${response}`)
            .setColor(Client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
        message.channel.send(Embed);
    }
}