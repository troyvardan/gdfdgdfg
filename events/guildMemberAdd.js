let lockdownSettings = require('../settings/configuration').LOCKDOWN_KICK
const greeting = require("../settings/configuration").GREETING_SYSTEM
const settings = require('../settings/configuration').BOT_SETTINGS
const { MessageEmbed, MessageAttachment } = require('discord.js')
const Canvas = require('canvas');
const ord = require('ordinal')

module.exports = {
    execute: async(client, member) => {

        let serverSettings = client.db.get(member.guild.id)
        if (serverSettings.underLockdown && lockdownSettings.Enabled) {
            const embed1 = new MessageEmbed({ color: client.color })
                .setTitle("Administration System | Server Lockdown")
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(`RED`)
                .setFooter(`Server Is Currently In Lockdown |  `)
                .setDescription(lockdownSettings.Kick_Message.replace('{server}', member.guild.name).replace('{member}', member.user.toString()) || 'The server is under lockdown, please join back later!')
                .setTimestamp();

            await member.send(embed1).catch(() => {})
            member.kick()
        }

        let rolesOnJoin = settings.Roles_On_Join
        if (rolesOnJoin.length && rolesOnJoin.length <= 5) {
            for (var i of rolesOnJoin)
                if (!member.guild.roles.cache.has(i)) return console.log(`I couldnt find a role with the id ${i} on the server`)
            member.roles.set(rolesOnJoin).catch(() => {})
        } else if (rolesOnJoin.length && rolesOnJoin.length >= 5) console.log('You cant have more than 5 roles to add to new members')



        if (!greeting.Enabled) return;
        if (greeting.Enabled && !['embed', 'message', 'card'].includes(greeting.Welcome_Type))
            return console.log('Please choose either embed / message / card for the welcome type')

        let welcomeChannel = member.guild.channels.cache.get(greeting.Welcome_Channel)
        if (!welcomeChannel) return console.log('Invalid welcome channel id, make sure you entered the ')

        const username = member.user.username
        const discrim = member.user.discriminator
        const avatarURL = member.user.displayAvatarURL({ format: 'png' })
        const backgroundURL = greeting.Welcome_Cards_Image_Link;

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage(backgroundURL);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const font = "Sans";

        ctx.font = `35px ${font}`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
        ctx.fillText("Welcome", 260, 100);

        ctx.font = `35px ${font}`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
        ctx.fillText("Enjoy your stay", 260, 300);

        const welcometextPosition = { width: 260, height: 150 };

        let fontSize = 55;
        ctx.font = `bold ${fontSize}px ${font}`;

        do {
            fontSize -= 1;
            ctx.font = `bold ${fontSize}px ${font}`;
        } while (ctx.measureText(`${username}#${discrim}!`).width > 430);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.fillText(`${username}`, welcometextPosition.width, welcometextPosition.height, 455);

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.textAlign = "start";
        ctx.fillText(
            `#${discrim}!`,
            ctx.measureText(`${username}`).width + welcometextPosition.width,
            welcometextPosition.height
        );

        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(avatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const card = new MessageAttachment(canvas.toBuffer(), 'welcome.png'),
            embed = new MessageEmbed()
            .setTitle(greeting.Welcome_Embed.title.replace('{member.username}', member.user.username).replace('{joinPosition}', ord(member.guild.memberCount)))
            .setDescription(greeting.Welcome_Embed.description.replace('{member}', member.toString()).replace('{joinPosition}', ord(member.guild.memberCount)))
            .setColor(greeting.Welcome_Embed.color)
            .setTimestamp()

        if (greeting.Welcome_Type === 'card') welcomeType = card
        else if (greeting.Welcome_Type === 'embed') welcomeType = embed
        else welcomeType = greeting.Welcome_Message.replace('{member}', member.toString()).replace('{joinPosition}', ord(member.guild.memberCount))

        welcomeChannel.send(card).catch(() => {})
    },
    name: "guildMemberAdd",
};

let applyText = async(canvas, text) => {
    const ctx = canvas.getContext('2d');
    let fontSize = 70;

    do {
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
}