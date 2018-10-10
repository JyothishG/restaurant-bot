var buttonMessage = require('../services/sendButtonMessage.js')
var userProfile = require('../services/userProfile.js')
var data = require('../data.json')
var typing = require('../services/typing.js')

module.exports = function (bot, message, controller) {
  userProfile.getUserProfile(message.user, function (profileResponse) {
    var userName = ''
    if (profileResponse !== null) {
      userName = profileResponse.first_name
    }

    //controller.storage.users.save({id: message.user, subscriptions: data.subscriptions})

    var messageText1 = 'Hi ' + userName + '👋👋\n\nWelcome to Restaurant Chatbot.'
    var messageText2 = '\n\nLet\'s get started now 🙂\n\n Take a look at these.'
    bot.reply(message, messageText1 + messageText2)
    typing.sendTyping(bot, message)

    var menus = data.menu
    var cards = []

    menus.forEach(function (menu) {
      
      var postBackAction1 = JSON.stringify({
        'action': 'ShowSubMenu',
        'entity': menu.buttonPayload
      })
   
      var card = {
        'title': menu.name,
        'image_url': menu.image,
        'buttons': [
          {
            'type': 'postback',
            'title': 'Show Category',
            'payload': postBackAction1
          }
        ]
      }
      cards.push(card)
    })
    
    setTimeout(function(){
      buttonMessage.sendCard(bot, message, cards, 'horizontal')
    }, 1000)

  })
}
