var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')
var typing = require('../services/typing.js')

module.exports = function (bot, message, controller) {
  
  controller.storage.users.get(message.user, function(err, result) {
    var cart = result.cart
    cart = []
    controller.storage.users.save({id: message.user, cart: cart})
    sendQuickReply (bot, message, 'Cart is cleared. Now what?')
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
      "title": 'Start Over',
      "payload": 'GetStarted'
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