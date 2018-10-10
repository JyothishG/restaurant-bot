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
        subscription.status = true
      }
    })
    controller.storage.users.save({id: message.user, subscriptions: subscriptions})

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
      'text': 'Congratzz! You are subscribed to ' + categoryName + ' news 😄',
      'quick_replies': options
    }
    bot.replyWithTyping(message, quickReplyAttachment)
  })
}
