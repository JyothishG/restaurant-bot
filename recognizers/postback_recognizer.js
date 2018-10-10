var welcome = require('../dialogs/getStarted.js')
var showCategories = require('../dialogs/showCategories.js')
var showStories = require('../dialogs/showStories.js')
var subscribeCategory = require('../dialogs/subscribeCategory.js')
var unsubscribeCategory = require('../dialogs/unsubscribeCategory.js')
var showSubscriptions = require('../dialogs/showSubscriptions.js')

module.exports = {
  recognize: function (bot, message, controller) {
    var intents = {
      'GetStarted': welcome,
      'ShowCategories': showCategories,
      'ShowStories': showStories,
      'SubscribeCategory': subscribeCategory,
      'UnsubscribeCategory': unsubscribeCategory,
      'ShowSubscriptions': showSubscriptions
    }
    if (intents.hasOwnProperty(message.payload)) {
      intents[message.payload](bot, message, controller)
    } else {
      var messagePayload = JSON.parse(message.payload)
      if (intents.hasOwnProperty(messagePayload.action)) {
        intents[messagePayload.action](bot, message, controller)
      }
    }
  }
}
