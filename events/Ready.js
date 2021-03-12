const { BOT_ACTIVITY } = require("../settings/configuration").BOT_SETTINGS;
const settings = require("../settings/configuration").BOT_SETTINGS;

module.exports = {
    execute: async(Client) => {

        process.on("unhandledRejection", (error) => {
            console.log(`[Error] An error happened in process: \n${error.stack}`);
        });

        process.on("uncaughtException", (exception) => {
            console.log(
                `[Error] An exception happened in process: \n${exception.stack}`
            );
        });

        console.log(
            `[Info] ${Client.user.username} has been successfully logged in!`
        );

        setInterval(() => {
            const guild = Client.guilds.cache.get(settings.Guild_ID);
            if (!guild) return;
            const MemberCountChannel = guild.channels.cache.get(settings.Member_Count_Channel);
            if (!MemberCountChannel) return

            MemberCountChannel.setName(`Members: ${guild.memberCount}`);
        }, 31000);

        Client.guilds.cache.each(g => {
            if (!Client.db.get(g.id)) Client.db.set(g.id, { underLockdown: false })
        })
    },
    name: "ready",
};