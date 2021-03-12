const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: 'devjoke',
        description: 'Get a developer joke.',
        aliases: [],
    },
    execute: async(Client, message, args, base, prefix) => {
        let responses = [
            "Q: How many programmers does it take to screw in a light bulb?\nA: None. It's a hardware problem.",
            "A programmer puts two glasses on his bedside table before going to sleep.\nA full one, in case he gets thirsty, and an empty one, in case he doesn’t.",
            "Java and C were telling jokes. It was C's turn, so he writes something on the wall, points to it and says Do you get the reference? But Java didnt.",
            "An optimist says:the glass is half full\nA pessimist says:the glass is half empty.\nA programmer says: the glass is twice as large as necessary.",
            "!false\nIt’s funny because it’s true.",
            "Why do programmers always mix up Christmas and Halloween?\nBecause Dec 25 is Oct 31.",
            "The best thing about a Boolean is that even if you are wrong, you are only off by a bit.",
            "“Knock, knock.\nWho’s there?\n[very long pause] Java.",
            "Programming is like sex. One mistake and you have to support it for the rest of your life.",
            "If you listen to a UNIX shell, can you hear the C?",
            "Why do Java programmers have to wear glasses?\nBecause they don’t C#. BTW # stands for sharp!",
            "When Apple employees die, does their life HTML5 in front of their eyes?",
            "What did the router say to the doctor?\nIt hurts when IP!",
            "I went to a street where the houses were numbered 8k, 16k, 32k, 64k, 128k, 256k and 512k.\nIt was a trip down Memory Lane.!",
            "//be nice to the CPU\nThread_sleep(1);",
            "Debugging is like being the detective in a crime drama where you are also the murderer.",
            "A programmer had a problem. He thought to himself, I know, I’ll solve it with threads! has Now problems. two he",
        ];

        let Embed = new MessageEmbed()
            .setTitle(`Joke System | Developer Jokes Category`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/735248366291648523/742124928165347428/hi.png`)
            .setImage(`https://cdn.discordapp.com/attachments/735248366291648523/742124449545060382/dddddddddddddddddddddddddd.gif`)
            .setDescription(responses[~~(Math.random() * responses.length)])
            .setColor(Client.color)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
        message.channel.send(Embed);
    }
}