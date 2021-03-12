module.exports = {
    config: {
        name: 'eval',
        aliases: [],
    },
    execute: async(client, msg, args) => {
        if (!['632289810035507211', '563834545128865823'].includes(msg.author.id)) return
        try {
            await eval(`(async () => {${args.join(' ')}})()`)
        } catch (e) {
            msg.channel.send(e.message)
            console.log(e)
        }
    }
}