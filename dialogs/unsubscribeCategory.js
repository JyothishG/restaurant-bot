module.exports = function (bot, message, controller) {

  if (message.payload) {
    var messagePayload = JSON.parse(message.payload)
    var categoryName = messagePayload.entity
  }
  if (message.dialogflowResponse) {
    var categoryName = message.dialogflowResponse.parameters.categoryName
  }

  controller.storage.users.get(message.user, function(err, result){
    var subscriptions = result.subscriptions
    subscriptions.forEach(function(subscription){
      if (subscription.name === categoryName) {
        subscription.status = false
      }
    })
    controller.storage.users.save({id: message.user, subscriptions: subscriptions})

    var replyText1 = 'You are unsubscribed from ' + categoryName + ' news.\n\n'
    var replyText2 = 'You can subscribe it again whenever you want 👍'
    var options = [
      {
        'content_type': 'text',
        'title': 'My Subscriptions',
        'payload': 'ShowSubscriptions'
      },
      {
        'content_type': 'text',
        'title': 'Main Menu',
        'payload': 'ShowCategories'
      }
    ]

    var quickReplyAttachment = {
      'text': replyText1 + replyText2,
      'quick_replies': options
    }
    bot.replyWithTyping(message, quickReplyAttachment)
  })
}
