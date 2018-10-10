var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')

module.exports = function (bot, message, controller) {

  var items = data.items
  var cards = []

  items.forEach(function (item) {
    
    var postBackAction1 = JSON.stringify({
      'action': 'AddToCart',
      'entity': item.buttonPayload
    })
 
    var card = {
      'title': item.name,
      'image_url': item.image,
      'buttons': [
        {
          'type': 'postback',
          'title': 'Add to Cart',
          'payload': postBackAction1
        }
      ]
    }
    cards.push(card)
  })

  bot.replyWithTyping(message, 'So, what do you think... 😎')
  
  setTimeout(function(){
    buttonMessage.sendCard(bot, message, cards, 'horizontal')
  }, 2000)
}
