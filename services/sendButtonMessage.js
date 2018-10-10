module.exports = {
  send: function (bot, message, text, buttonList) {
    var attachment = {
      'type': 'template',
      'payload': {
        'template_type': 'button',
        'text': text,
        'buttons': buttonList
      }
    }
    bot.replyWithTyping(message, {
      attachment: attachment
    })
  },

  sendCard: function (bot, message, cards, imageType) {
    var attachment = {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'image_aspect_ratio': imageType,
        'elements': cards
      }
    }
    bot.replyWithTyping(message, {
      attachment: attachment
    })
  },

  sendReceipt: function (bot, message, receiptInfo) {

    var attachment = {
      
      "type": 'template',
      "payload": {
        "template_type": 'receipt',
        "recipient_name": receiptInfo.recipient_name,
        "order_number": receiptInfo.order_number,
        "currency": receiptInfo.currency,
        "payment_method": receiptInfo.payment_method,
        "elements": receiptInfo.elements,
        "address": receiptInfo.address,
        "summary": receiptInfo.summary
      }
    }
    bot.replyWithTyping(message, {
      attachment: attachment
    })
  }
}
