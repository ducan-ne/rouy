const { Controller } = require('../rouy')
const url = require('url')

module.exports = createParser

function createParser() {
  class Parser extends Controller {
    handler(req) {
      req.query = Object.assign({}, url.parse(this.url, true).query)
      this.query = req.query
      this.next()
    }
  }

  return Parser
}
