const { canModifyQueue, LOCALE } = require("../../util/EvobotUtil");
const i18n = require("i18n");


module.exports = {
config: {
  name: "loop",
  aliases: [],
  description: "Toggle music loop"
},
  execute(Client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(i18n.__("loop.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(i18n.__mf("loop.result", { loop: queue.loop ? i18n.__("common.on") : i18n.__("common.off") }))
      .catch(console.error);
  }
};
