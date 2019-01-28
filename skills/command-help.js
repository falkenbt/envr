//
// Command: help
//
module.exports = function (controller) {

    controller.hears(["help", "who"], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.enrichCommand(message, "help") + ": spreads the word about my skills";
        text += "\n- " + bot.enrichCommand(message, "lock") + ": lock an environment. This will just create a file in my working directory with some meta-info. ";
        text += "\n- " + bot.enrichCommand(message, "unlock") + ": TODO. Fow now use 'lock' command to unlock.";
        bot.reply(message, text);
    });
}
