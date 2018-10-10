var request = require('request')
var requestBaseUrl = 'https://graph.facebook.com/v2.6/me/messages'

module.exports = {
  sendTyping: function (bot, message) {
    let options = {
      url: requestBaseUrl,
      method: 'POST',
      headers: {
  			'Content-Type': 'application/json'
      },
      form: {
        recipient: {
        	id: message.user
        },
        sender_action: 'typing_on'
      },
      qs: {
      	access_token: process.env.FACEBOOK_PAGE_TOKEN
      }
    }
    request(options, function (err, res, body) {})
  }
}
