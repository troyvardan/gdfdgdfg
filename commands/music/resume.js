const { canModifyQueue, LOCALE } = require("../../util/EvobotUtil");
const i18n = require("i18n");


module.exports = {
	config: {
  name: "resume",
  aliases: [],
  description: "Resume currently playing music",
	},
  execute(Client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(i18n.__("resume.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel
        .send(i18n.__mf("resume.resultNotPlaying", { author: message.author }))
        .catch(console.error);
    }

    return message.reply(i18n.__("resume.errorPlaying")).catch(console.error);
  }
};
