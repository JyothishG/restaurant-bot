var welcome = require('../dialogs/getStarted.js')

module.exports = {
  recognize: function (bot, message, controller) {
    var intents = {
      'GetStarted': welcome
    }
    if (intents.hasOwnProperty(message.quickreplyPayload)) {
      intents[message.quickreplyPayload](bot, message, controller)
    } else {
      var messagePayload = JSON.parse(message.quickreplyPayload)
      if (intents.hasOwnProperty(messagePayload.action)) {
        intents[messagePayload.action](bot, message, controller)
      }
    }
  }
}
