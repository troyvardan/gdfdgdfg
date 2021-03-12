const { LOCALE } = require("../../util/EvobotUtil");
const i18n = require("i18n");
const fs = require("fs");


module.exports = {
  config: {
        name: "clips",
		description: "list all clips",
        aliases: [],
    },
  execute(message) {
    fs.readdir("./sounds", function(err, files) {
      if (err) return console.log("Unable to read directory: " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });

      message.reply(`${clips.join(" ")}`).catch(console.error);
    });
  }
};
