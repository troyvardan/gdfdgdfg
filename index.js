const { Collection, Client } = require("discord.js");
const { readdirSync } = require("fs");
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const { BOT_TOKEN, EMBED_COLOR, MUTE_ROLE, YT_API_KEY, COMMAND_PREFIX } = require("./settings/configuration").BOT_SETTINGS;
const db = require('quick.db')
const path = require("path");
const logSymbols = require('log-symbols');
const Enmap = require('enmap');
const Tickets = new Enmap({ name: 'tickets' });
const i18n = require('i18n');
client.tickets = Tickets;
if (!COMMAND_PREFIX) throw new Error('Please provide a prefix in the configuration')
if (!BOT_TOKEN) throw new Error('Please provide a valid bot token to start the bot\nObtain one from here https://discord.com/developers/applications')
if (!YT_API_KEY) throw new Error('Please provide a Youtube API key in the configuration.\nGet one here https://developers.google.com/youtube/v3/getting-started')
if (!EMBED_COLOR) throw new Error('Please provide an embed hex color in the configuration. E.g. RED or #fl92jd')

console.log(logSymbols.success, 'Finished successfully!');

client.StickyMessages = new db.table(`sticky`)
const StickyMessages = new db.table(`sticky`)

client.db = require('quick.db')


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`What Ever you want here!`, {
        type: "WATCHING"
    });

});
i18n.configure({
  locales: ["en", "ko", "fr", "pt_br", "zh_cn", "zh_tw"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  objectNotation: true,
  register: global,
  logErrorFn: function (msg) {
    console.log("error", msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});
client.snipes = new Collection()
client.commands = new Collection();
client.color = EMBED_COLOR;
client.muteRole = MUTE_ROLE;
client.afk = new Collection()
client.spam = new Collection()
client.handle = require("./functions/handle");
client.play = require("./functions/play");
client.queue = new Collection()
client.categories = new Collection()

client.db = {
    ...require('quick.db'),
    ensure: (key, def) => {
        if (db.get(key)) return db.get(key)
        db.set(key, def)
        return db.get(key, def)
    }
}

const eventFiles = readdirSync("./events").filter(f => f.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.name) {
        client.on(event.name, (...args) => event.execute(client, ...args));
        console.log(`[√] Event ${file} has been successfully loaded!`);
    }
}

const categories = ['fun', 'info', 'moderation', 'system', 'tickets', 'owner', `basic`, `music`, `products`];
categories.forEach(async category => {
    const commandFiles = readdirSync(`./commands/${category}`).filter(f => f.endsWith(".js"));
    if (category !== 'owner') client.categories.set(category, commandFiles.map(s => s.split('.')[0]))
    for (const file of commandFiles) {
        try {
            const command = require(`./commands/${category}/${file}`);
            if (command.config && command.config.aliases) {
                client.commands.set(command.config.name, command);
                console.log(`[√] Command ${command.config.name} has been successfully loaded!`);
            } else throw new Error('Command missing config')
        } catch (e) {
            console.log(`[❌] Command ${file} failed to load: ${e.message}`)
        }
    }
});

client.login(BOT_TOKEN).catch(() =>
    console.log(
        `[❌] Error while trying bot to log in.
  [⚠️ POSSIBLE FIX] You provided an invalid token of the bot`
    )
);