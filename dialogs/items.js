var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')
var typing = require('../services/typing.js')

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
      'subtitle': 'Price: ' + item.price,
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

  bot.reply(message, 'So, what do you think... 😎')
  typing.sendTyping(bot, message)
  
  setTimeout(function(){
    buttonMessage.sendCard(bot, message, cards, 'horizontal')
  }, 1000)
}
