const { MessageAttachment, Collection, MessageEmbed } = require("discord.js");
const TicketID = require('../../settings/configuration').LOGGING.Ticket_Channel_Logs
const SupportTeam = require('../../settings/configuration').TICKET_SYSTEM.SUPPORT_TEAM_ROLES
const fs = require("fs").promises;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

module.exports = {
    config: {
        name: 'close',
        description: 'Close the current ticket channel.',
        aliases: [],
    },
    execute: async(Client, message, args, config, prefix, base) => {
        if (!message.member.roles.cache.some((role) => SupportTeam.includes(role.id)))
            return message.channel.send(`\`❌\` You don't have permission to do this!`);

        message.channel.send(`\`✅\` Successfully closed this ticket`);

        let loggy = message.guild.channels.cache.get(TicketID);

        const channelMessages = await message.channel.messages
            .fetch({ limit: 100, before: message.id })
            .catch((err) => console.log(err));

        let messageCollection = new Collection();
        messageCollection = messageCollection.concat(channelMessages);

        let msgs = messageCollection.array().reverse();

        let data = await fs.readFile("./template.html", "utf8")

        msgs.forEach(async(msg) => {
            let parentContainer = document.createElement("div");
            parentContainer.className = "parent-container";

            let avatarDiv = document.createElement("div");
            avatarDiv.className = "avatar-container";
            let img = document.createElement("img");
            img.setAttribute("src", msg.author.displayAvatarURL());
            img.className = "avatar";
            avatarDiv.appendChild(img);

            parentContainer.appendChild(avatarDiv);

            let messageContainer = document.createElement("div");
            messageContainer.className = "message-container";

            let nameElement = document.createElement("span");
            let name = document.createTextNode(
                msg.author.tag +
                " " +
                msg.createdAt.toDateString() +
                " " +
                msg.createdAt.toLocaleTimeString() +
                " EST"
            );
            nameElement.appendChild(name);
            messageContainer.append(nameElement);

            if (msg.content.startsWith("```")) {
                let m = msg.content.replace(/```/g, "");
                let codeNode = document.createElement("code");
                let textNode = document.createTextNode(m);
                codeNode.appendChild(textNode);
                messageContainer.appendChild(codeNode);
            } else {
                let msgNode = document.createElement("span");
                let textNode = document.createTextNode(msg.content);
                msgNode.append(textNode);
                messageContainer.appendChild(msgNode);
            }
            parentContainer.appendChild(messageContainer);
            data += parentContainer.outerHTML
        });

        const attachment = new MessageAttachment(Buffer.from(data), 'ticket.html');

        message.channel.send(
            `**Ticket Closed by ${message.author}**`,
            attachment
        );
        let embed = new MessageEmbed()
            .setAuthor(`Ticket Logging System`)
            .setColor(`BLUE`)
            .addField(`Ticket Name`, message.channel.name)
            .addField(`Channel`, message.channel)
            .attachFiles(attachment)
            .setThumbnail(Client.user.displayAvatarURL());
        await new Promise(r => setTimeout(r, 15000))
        message.channel.delete();
        await loggy.send(embed);
    }
}