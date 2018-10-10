var newsApi = require('../services/newsApi.js')
var buttonMessage = require('../services/sendButtonMessage.js')

module.exports = function (bot, message, controller) {

  if (message.payload) {
    var messagePayload = JSON.parse(message.payload)
    var categoryName = messagePayload.entity
  }
  if (message.dialogflowResponse) {
    var categoryName = message.dialogflowResponse.parameters.categoryName
  }

  newsApi.getCategoryStories(categoryName, function (stories) {

    var cards = []
    stories.forEach(function (story) {

      if (story.urlToImage === null) {
        var imageUrl = 'http://i64.tinypic.com/119b6zs.png'
      }
      else{
        var imageUrl = story.urlToImage
      }
      var card = {
        'title': story.title,
        'image_url': imageUrl,
        'buttons': 
        [
          {
            'type': 'web_url',
            'title': 'Read Story',
            'url': story.url,
            'webview_height_ratio': 'tall'
          },
          {
            'type': 'element_share'
          }
        ]
      }
      cards.push(card)
    })

    cards = cards.slice(0,10)
    bot.replyWithTyping(message, 'These are the latest stories that I found. Take a look...😎')
    
    setTimeout(function(){
      buttonMessage.sendCard(bot, message, cards, 'square')
    }, 2000)
  })
}
