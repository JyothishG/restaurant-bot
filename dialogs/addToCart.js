var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')
var typing = require('../services/typing.js')

module.exports = function (bot, message, controller) {

  if (message.payload) {
    var messagePayload = JSON.parse(message.payload)
    var itemName = messagePayload.entity
  }
  var items = data.items
  
  items.forEach(function (item) {
    
    if (item.name === itemName) {
      controller.storage.users.get(message.user, function(err, result) {
        
        if (result) {
          var cart = result.cart
          var itemAdded

          cart.forEach(function (element) {
            if (element.name === itemName) {
              element.quantity = element.quantity + 1
              itemAdded = true
            }
          })
          if (itemAdded === undefined) {
            cart.push(item)
            controller.storage.users.save({id: message.user, cart: cart})
            sendQuickReply (bot, message, itemName + ' added to cart.')
          }
          else {
            controller.storage.users.save({id: message.user, cart: cart})
            sendQuickReply (bot, message, itemName + ' added to cart.')
          }
        }
        else {
          var cart = []
          cart.push(item)
          controller.storage.users.save({id: message.user, cart: cart})
          sendQuickReply (bot, message, itemName + ' added to cart.')
        }
      })
    }
  })
}

function sendQuickReply (bot ,message, replyText) {
  var reply = [
    {
      "content_type": "text",
      "title": 'Back to Items',
      "payload": 'ShowItems'
    },
    {
      "content_type": "text",
      "title": 'My Cart',
      "payload": 'ShowCart'
    }
  ]
  var quickReplyAttachment = {
    'text': replyText,
    'quick_replies': reply
  }
  bot.reply(message, quickReplyAttachment)

}