var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')

module.exports = function (bot, message, controller) {

  var categories = data.categories
  var cards = []

  categories.forEach(function (category) {
    
    var postBackAction1 = JSON.stringify({
      'action': 'ShowStories',
      'entity': category.buttonPayload
    })
    var postBackAction2 = JSON.stringify({
      'action': 'SubscribeCategory',
      'entity': category.buttonPayload
    })
 
    var card = {
      'title': category.name,
      'image_url': category.image,
      'buttons': [
        {
          'type': 'postback',
          'title': 'Show Stories',
          'payload': postBackAction1
        },
        {
          'type': 'postback',
          'title': 'Subscribe',
          'payload': postBackAction2
        }
      ]
    }
    cards.push(card)
  })

  bot.replyWithTyping(message, 'Here are the types of stories we provides that you may like... 😎')
  
  setTimeout(function(){
    buttonMessage.sendCard(bot, message, cards, 'horizontal')
  }, 2000)
}
