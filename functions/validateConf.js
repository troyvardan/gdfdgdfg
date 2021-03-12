const settings = require('../settings/configuration')

module.exports = () => {
    if (!BOT_SETTINGS.COMMAND_PREFIX) throw new Error('Please provide a prefix in the configuration')
    if (!BOT_SETTINGS.BOT_TOKEN) throw new Error('Please provide a valid bot token to start the bot\nObtain one from here https://discord.com/developers/applications')
    if (!BOT_SETTINGS.YT_API_KEY) throw new Error('Please provide a Youtube API key in the configuration.\nGet one here https://developers.google.com/youtube/v3/getting-started')
    if (!BOT_SETTINGS.EMBED_COLOR) throw new Error('Please provide an embed hex color in the configuration. E.g. RED or #fl92jd')
}