module.exports = function (controller) {
    var masterId = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS80MzY5MWExNi0xMjQ2LTQ0MWItODAzMi02NGNkNTE1MGIwZjE' // user ID of Thomas Falkenberg

    controller.hears(["feedback"], "direct_message,direct_mention", function (bot, message) {
        bot.reply(message, "Thanks for the feedback. I will forward it to my master.");

        bot.say(
            {
              text: 'Feeback received',
              channel: 'thomas.falkenberg@payback.net' 
            }
          );
    });
}
