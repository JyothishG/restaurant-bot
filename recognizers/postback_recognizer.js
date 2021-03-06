var welcome = require('../dialogs/getStarted.js')
var subMenu = require('../dialogs/subMenu.js')
var items = require('../dialogs/items.js')
var addToCart = require('../dialogs/addToCart.js')

module.exports = {
  recognize: function (bot, message, controller) {
    var intents = {
      'GetStarted': welcome,
      'ShowSubMenu': subMenu,
      'ShowItems': items,
      'AddToCart': addToCart
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
