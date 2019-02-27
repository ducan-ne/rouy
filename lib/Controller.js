const matchPath = require('./modules/matchPath')

class Controller {
  constructor(req, res) {
    this.params = {}
    this.req = req
    this.res = res
    this.method = req.method
    // this.body = req.body || {}
    // this.query = req.query || {}
    this._pre = []
    this._post = []
    this.url = req.url
    this._next = false
  }

  // helper
  test(path, opts = {}) {
    const match = matchPath(this.req.url, { path, ...opts })
    if (!match) {
      return false
    }

    const { isExact, params } = match

    this.params = params
    return isExact
  }

  async pre() {}
  next() {
    this._next = true
  }
  async match() {
    return true
  }
  async post() {}

  handler() {}
}

module.exports = Controller
