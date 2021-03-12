const verify = require('../../settings/configuration').VERIFICATION

module.exports = {
    config: {
        name: 'verify',
        description: 'Verify yourself on the server, and get a role.',
        aliases: [],
    },
    execute: async(client, message, args) => {
        if (verify.Enabled && message.channel.id === verify.Verify_Channel) {
            if (!message.guild.roles.cache.has(verify.Verify_Role)) return console.log('I couldnt find the verification role')
            if (!message.guild.roles.cache.has(verify.Role_To_Remove)) return console.log('I couldnt find the verification role to remove')
            message.delete().catch(() => {})
            if (!message.member.roles.cache.has(verify.Verify_Role)) {
                message.member.roles.add(verify.Verify_Role)
                message.member.roles.remove(verify.Role_To_Remove)
            }
        }
    }
}