const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = async(Client, video, message, voiceChannel, playlist = false) => {
    const serverQueue = Client.queue.get(message.guild.id);
    console.log(video)
    const song = {
        user: message.author.id,
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        info: await ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${video.id}`),
    }; 

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 25,
            playing: true,
            loopSong: false,
            loopQueue: false,
        };

        Client.queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            queueConstruct.connection = await voiceChannel.join();

            Client.play(Client, message.guild, queueConstruct.songs[0], message);
        } catch (error) {
            const embed3 = new MessageEmbed()
                .setDescription(`Sorry you can\'t play songs in this channel!`)
                .setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))
                .setColor(Client.color);
            message.channel.send(embed3);
            return Client.queue.delete(message.guild.id);
        }
    } else {
        serverQueue.songs.push(song);

        ytdl.getInfo(song.id, (err, info) => {
            const thumbnail = `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`;

            let time = info.length_seconds;

            time %= 3600;
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);

            const embed = new MessageEmbed()
                .setDescription(`Current Song: ${serverQueue.songs[0].title}\nChannel: ${info.author.name}\nDuration: ${minutes} minutes & ${seconds} seconds!`)
                .setFooter(`${message.guild.name} | Made by Fuel#2649`, message.guild.iconURL({ dynamic: true }))
                .setColor(Client.color);
            message.channel.send(embed);
        });
    }
    return;
}