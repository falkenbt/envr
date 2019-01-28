module.exports = function (controller) {
    var masterId = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS80MzY5MWExNi0xMjQ2LTQ0MWItODAzMi02NGNkNTE1MGIwZjE' // user ID of Thomas Falkenberg

    controller.hears(["feedback"], "direct_message,direct_mention", function (bot, message) {
       
        bot.startConversation(message,function(err,convo) {

            convo.ask('Feedback is always welcome. What is yours?', function(response, convo) {
                convo.say('Thanks for the feedback. I will forward it to my master.');
                convo.next();
                bot.say(
                    {
                      text: 'Feeback from '+ message.user +' received: '+response.text,
                      channel: 'Y2lzY29zcGFyazovL3VzL1JPT00vNDVmMGY1ZTAtMTUyYS0xMWU5LTg3MmUtZWJlMmZjODhiOTQ2' 
                    }
                  );
              })
            }
            
        )
        
    });
}
