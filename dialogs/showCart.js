var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')
var typing = require('../services/typing.js')

module.exports = function (bot, message, controller) {
  
  controller.storage.users.get(message.user, function(err, result) {
    if (result && result.cart.length >= 1) {
      var cartItems = result.cart
      var cards = []

      cartItems.forEach(function (item) {

        var card = {
          'title': item.name,
          'subtitle': 'Quantity: ' + item.quantity,
          'image_url': item.image
        }
        cards.push(card)
      })

      bot.reply(message, 'Here are your cart items... 😎')
      typing.sendTyping(bot, message)

      setTimeout(function() {
        buttonMessage.sendCard(bot, message, cards, 'horizontal')
        sendQuickReply (bot, message, 'What next?')
      }, 1000)
    }
    else {
      var reply = [
        {
          "content_type": "text",
          "title": 'Go to Items',
          "payload": 'ShowItems'
        }
      ]
      var quickReplyAttachment = {
        'text': 'Sorry, your cart is empty...',
        'quick_replies': reply
      }
      bot.reply(message, quickReplyAttachment)
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
      "title": 'Clear Cart',
      "payload": 'ClearCart'
    }
  ]
  var quickReplyAttachment = {
    'text': replyText,
    'quick_replies': reply
  }
  setTimeout(function() {
    bot.reply(message, quickReplyAttachment)
  }, 2000)
}