var request = require('request') // make http call

module.exports = {
  getUserProfile (userId, callback) {
    var usersPublicProfile = 'https://graph.facebook.com/v2.6/' + userId + '?fields=first_name,last_name,locale,timezone,gender&access_token=' + process.env.FACEBOOK_PAGE_TOKEN
    request({
      url: usersPublicProfile,
      json: true // parse
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(body)
      } else {
        callback(null)
      }
    })
  }
}
