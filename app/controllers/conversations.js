/* eslint-disable brace-style */
var apiai = require('apiai')
var app = apiai(process.env.DIALOGFLOW_TOKEN)
var postbackRecognizer = require('../../recognizers/postback_recognizer.js')
var dialogflowRecognizer = require('../../recognizers/dialogflow_recognizer.js')
var quickreplyRecognizer = require('../../recognizers/quickreplyRecognizer.js')
var welcomeDialog = require('../../dialogs/getStarted.js')

module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    welcomeDialog(bot, message, controller)
  })

  controller.on('facebook_postback', function (bot, message) {
    postbackRecognizer.recognize(bot, message, controller)
  })

  controller.hears('.*', 'message_received', function (bot, message) {
    if (message.postback === true) {
      return true
    } 
    else if (message.quickReply === true) {
      quickreplyRecognizer.recognize(bot, message, controller)
    }  
    else {
      var request = app.textRequest(message.text, {
        sessionId: 'test-session'
      })

      request.on('response', function (response) {
        // Handling smalltalk replies
        if (response.result.source === 'domains' && response.result.actionIncomplete === false) {
          bot.replyWithTyping(message, response.result.fulfillment.speech)
        }
        // default reply of dialogflow from agent intents
        else if (response.result.source === 'agent' && response.result.fulfillment.speech) {
          bot.replyWithTyping(message, response.result.fulfillment.speech)
        }
        // intent trigger through conversation text
        else {
          dialogflowRecognizer.recognize(bot, message, response.result, controller)
        }
      })

      request.on('error', function (error) {
        console.log(error)
      })
      request.end()
    }
  })
}
