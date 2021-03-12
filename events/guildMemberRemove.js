const db = require('quick.db')
const settings = require("../settings/configuration").LEVELING_SYSTEM

module.exports = {
    execute: async(client, member) => {
        if (settings.Remove_XP_On_Leave) {
            db.set(`${member.guild.id}.${member.user.id}.xp`, { amount: 0, level: 0, total: 0 })
        }
    },
    name: "guildMemberRemove",
};