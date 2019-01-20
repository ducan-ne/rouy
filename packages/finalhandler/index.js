const finalhandler = require('finalhandler')
const Rouy = require('rouy')

module.exports = createCtrl

function createCtrl() {
  class FinalHandler extends Rouy.Controller {
    handler(req, res, next) {
      finalhandler(req, res, next)
    }
  }

  return FinalHandler
}
