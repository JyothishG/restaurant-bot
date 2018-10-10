var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')

module.exports = function (bot, message, controller) {

  var categories = data.sub_categories
  var cards = []

  categories.forEach(function (category) {
    
    var postBackAction1 = JSON.stringify({
      'action': 'ShowItems',
      'entity': category.buttonPayload
    })
 
    var card = {
      'title': category.name,
      'image_url': category.image,
      'buttons': [
        {
          'type': 'postback',
          'title': 'Show Items',
          'payload': postBackAction1
        }
      ]
    }
    cards.push(card)
  })

  bot.replyWithTyping(message, 'Here are the items we provides that you may like... 😎')
  
  setTimeout(function(){
    buttonMessage.sendCard(bot, message, cards, 'horizontal')
  }, 2000)
}
