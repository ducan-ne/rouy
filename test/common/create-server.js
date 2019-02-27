const { Controller, listen } = require('../../rouy')

function arrayify(val) {
  return Array.isArray(val) ? val : [val]
}

module.exports = function createServer(ctrl) {
  class Otherwise extends Controller {
    handler() {
      return '404'
    }
  }

  return new Promise(resolve => {
    let server = listen([...arrayify(ctrl), Otherwise])
    server.listen(() => resolve(server))
  })
}
