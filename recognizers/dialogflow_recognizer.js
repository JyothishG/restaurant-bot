var welcome = require('../dialogs/getStarted.js')
var showCategories = require('../dialogs/showCategories.js')
var showSubscriptions = require('../dialogs/showSubscriptions.js')
var showStories = require('../dialogs/showStories.js')

module.exports = {
  recognize: function (bot, message, dialogflowResponse, controller) {
    var dialogflowIntent = dialogflowResponse.metadata.intentName
    var intents = {
      'GetStarted': welcome,
      'ShowCategories': showCategories,
      'ShowSubscriptions': showSubscriptions,
      'GeneralStories': showStories,
      'BusinessStories': showStories,
      'EntertainmentStories': showStories,
      'HealthStories': showStories,
      'ScienceStories': showStories,
      'SportsStories': showStories,
      'TechnologyStories': showStories
    }
    if (intents.hasOwnProperty(dialogflowIntent)) {
      message.dialogflowResponse = dialogflowResponse
      intents[dialogflowIntent](bot, message, controller)
    }
  }
}
