var welcome = require('../dialogs/getStarted.js')
var items = require('../dialogs/items.js')
var showCart = require('../dialogs/showCart.js')
var clearCart = require('../dialogs/clearCart.js')

module.exports = {
  recognize: function (bot, message, controller) {
    var intents = {
      'GetStarted': welcome,
      'ShowItems': items,
      'ShowCart': showCart,
      'ClearCart': clearCart
    }
    if (intents.hasOwnProperty(message.quickreplyPayload)) {
      intents[message.quickreplyPayload](bot, message, controller)
    } 
    else {
      var messagePayload = JSON.parse(message.quickreplyPayload)
      if (intents.hasOwnProperty(messagePayload.action)) {
        intents[messagePayload.action](bot, message, controller)
      }
    }
  }
}
