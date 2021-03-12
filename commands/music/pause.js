const { canModifyQueue, LOCALE } = require("../../util/EvobotUtil");
const i18n = require("i18n");


module.exports = {
	config: {  name: "pause",
  description: "Pause the currently playing music",
  aliases: []
	},
  execute(Client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(i18n.__("pause.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel
        .send(i18n.__mf("pause.result", { author: message.author }))
        .catch(console.error);
    }
  }
};
