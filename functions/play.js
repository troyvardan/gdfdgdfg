const ytdl = require("ytdl-core");
const { MessageEmbed } = require(`discord.js`)

async function play(Client, guild, song, message) {
    const serverQueue = Client.queue.get(guild.id);

    if (!song) return Client.queue.delete(guild.id);

    const dispatcher = serverQueue.connection.play(ytdl(song.url));

    dispatcher.on("finish", async() => {
        if (serverQueue.loopSong === false && serverQueue.loopQueue === false) {
            await serverQueue.songs.shift();

            await play(Client, guild, serverQueue.songs[0], message);
        }

        if (serverQueue.loopSong === true) {
            await play(Client, guild, serverQueue.songs[0], message);
        }

        if (serverQueue.loopQueue === true) {
            await serverQueue.songs.push(serverQueue.songs[0], message);
            await serverQueue.songs.shift();

            await play(Client, guild, serverQueue.songs[0], message);
        }
    });

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    if (serverQueue.loop || serverQueue.loopQueue) return;
    const listen = new MessageEmbed()
        .setDescription(`Playing ${song.title} now!`)
        .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
        .setColor(Client.color)
    serverQueue.textChannel.send(listen);
}

module.exports = play;