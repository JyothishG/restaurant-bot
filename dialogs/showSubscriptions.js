var buttonMessage = require('../services/sendButtonMessage.js')

module.exports = function (bot, message, controller) {

  controller.storage.users.get(message.user, function(err, result){
    var subscriptions = result.subscriptions
    var cards = []

    subscriptions.forEach(function(subscription){

      var postBackAction1 = JSON.stringify({
        'action': 'SubscribeCategory',
        'entity': subscription.name
      })
      var postBackAction2 = JSON.stringify({
        'action': 'UnsubscribeCategory',
        'entity': subscription.name
      })

      var card = {
        'title': subscription.name,
        'subtitle': 'subscription status: ' + subscription.status,
        'image_url': subscription.image,
        'buttons': [
          {
            'type': 'postback',
            'title': 'Subscribe',
            'payload': postBackAction1
          },
          {
            'type': 'postback',
            'title': 'Unsubscribe',
            'payload': postBackAction2
          }
        ]
      }
      cards.push(card)
    })

    var replyText = '👇 This is your subscription dashboard. You can add and edit your subscription from here.\n\n'
    bot.replyWithTyping(message, replyText)

    setTimeout(function(){
      buttonMessage.sendCard(bot, message, cards, 'horizontal')
    }, 2000)
  })
}
