module.exports = function (controller) {

    controller.hears(["lock"], "direct_message,direct_mention", function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.ask("Which env do you want to lock?", [
                {
                    pattern: "^dev[0-9]{2}$",
                    callback: function (response, convo) {
                        var currentdate = new Date();
                        var environment = convo.extractResponse('answer');
                        convo.setVar("env", environment);
                        var state = controller.storage.channels.get(environment, function (err, user_data) {
                            if (err) {
                                controller.storage.channels.save({ id: environment, timestamp: currentdate, user: message.user }, function (err) { null });
                                convo.gotoThread("success");
                            }
                            else {
                                convo.setVar("user", user_data.user);
                                convo.setVar("timestamp", user_data.timestamp);
                                convo.gotoThread("unlock");
                            }
                        })
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.gotoThread("bad_response");
                    }
                }
            ], { key: "answer" });

            // Bad response
            convo.addMessage({
                text: "Sorry, I don't know this env!<br/>_Tip: try 'dev01', 'dev10', 'dev12',etc._'",
                action: 'default', // goes back to the thread's current state, where the question is not answered
            }, 'bad_response');



            // Success thread
            convo.addMessage(
                "Cool, I locked '{{vars.env}}' for you, have fun!",
                "success");
            //unlock thread
            convo.addMessage(
                "Sorry '{{vars.env}}' already locked by {{vars.user}} at {{vars.timestamp}}",
                "unlock");
            convo.addQuestion("do you want to unlock {{vars.env}}?", function (response, convo) {
                if (response.text === "yes") {
                    console.log("delete lock")
                    controller.storage.channels.delete(this.vars.env, function (err) {
                        
                        if (!err) {
                            convo.say("Yeah! Successfully removed {{vars.env}}-lock! Type lock if you want to lock an environment. ") 
                            convo.next()
                            }
                        else { 
                            convo.say("Damnit! Error deleting the lock : "+err.name+" - "+err.message) 
                            convo.next()
                        }

                    });
                }
                else {
                    convo.say("Ok, as you wish...") 
                    convo.next()
                    console.log("do nothing.")
                }
            }, {}, 'unlock'

            );

        });
    });
};