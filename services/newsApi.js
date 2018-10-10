var Client = require('node-rest-client').Client
const http = new Client()
const baseUrl = process.env.NEWS_API_BASE_URL

module.exports = {

  getCategoryStories (categoryName, callback) {
    var args = {
      data: {},
      parameters: {
        category: categoryName,
        apiKey: process.env.NEWS_API_KEY,
        country: 'us'
      }
    }
    http.get(baseUrl, args, function (data, response) {
      callback(data.articles)
    })
  }
}
