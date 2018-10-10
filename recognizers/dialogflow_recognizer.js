var welcome = require('../dialogs/getStarted.js')

module.exports = {
  recognize: function (bot, message, dialogflowResponse, controller) {
    var dialogflowIntent = dialogflowResponse.metadata.intentName
    var intents = {
      'GetStarted': welcome
    }
    if (intents.hasOwnProperty(dialogflowIntent)) {
      message.dialogflowResponse = dialogflowResponse
      intents[dialogflowIntent](bot, message, controller)
    }
  }
}
