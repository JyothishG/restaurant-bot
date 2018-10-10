var welcome = require('../dialogs/getStarted.js')
var showSubscriptions = require('../dialogs/showSubscriptions.js')
var showCategories = require('../dialogs/showCategories.js')

module.exports = {
  recognize: function (bot, message, controller) {
    var intents = {
      'GetStarted': welcome,
      'ShowSubscriptions': showSubscriptions,
      'ShowCategories': showCategories
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
