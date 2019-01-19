const { Controller } = require('../rouy')
const url = require('url')

module.exports = createParser

function createParser() {
  class Parser extends Controller {
    handler() {
      this.query = url.parse(this.url, true).query
      this.next()
    }
  }

  return Parser
}
