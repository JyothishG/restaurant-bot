var buttonMessage = require('../services/sendButtonMessage.js')
var data = require('../data.json')

module.exports = function (bot, message, controller) {

  if (message.payload) {
    var messagePayload = JSON.parse(message.payload)
    var itemName = messagePayload.entity
  }
  var items = data.items
  
  items.forEach(function (item) {
    
    if (item.name === itemName) {
      controller.storage.users.get(message.user, function(err, result) {
        
        if (result) {
          var cart = result.cart
          var itemAdded

          cart.forEach(function (element) {
            if (element.name === itemName) {
              element.quantity = element.quantity + 1
              itemAdded = true
            }
          })
          if (itemAdded === undefined) {
            cart.push(item)
            controller.storage.users.save({id: message.user, cart: cart})
          }
          else {
            controller.storage.users.save({id: message.user, cart: cart})
          }
        }
        else {
          var cart = []
          cart.push(item)
          controller.storage.users.save({id: message.user, cart: cart})
        }
      })
    }
  })
}
