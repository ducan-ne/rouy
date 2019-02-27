const { Controller } = require('../rouy')

module.exports = Create

function Create() {
  let middlewares = Array.from(arguments)
  class Ctrl extends Controller {
    async handler(req, res, next) {
      let promises = middlewares.map(
        mid =>
          new Promise(resolve => {
            mid(req, res, resolve)
          })
      )
      await Promise.all(promises)
      next()
    }
  }

  return Ctrl
}
