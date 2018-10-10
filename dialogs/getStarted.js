var newsApi = require('../services/newsApi.js')
var buttonMessage = require('../services/sendButtonMessage.js')
var userProfile = require('../services/userProfile.js')
var data = require('../data.json')

module.exports = function (bot, message, controller) {
  userProfile.getUserProfile(message.user, function (profileResponse) {
    var userName = ''
    if (profileResponse !== null) {
      userName = profileResponse.first_name
    }

    controller.storage.users.save({id: message.user, subscriptions: data.subscriptions})

    var messageText1 = 'Hi ' + userName + '👋👋\n\nWelcome to Restaurant Chatbot.'
    var messageText2 = '\n\nLet\'s get started now 🙂\n\n Take a look at these.'
    var buttons = [{
      'type': 'postback',
      'title': 'Main Menu',
      "payload": 'ShowCategories'
    }]
    buttonMessage.send(bot, message, messageText1 + messageText2, buttons)
  })
}
