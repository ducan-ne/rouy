const { Controller, listen } = require('../rouy')
const ParseQuery = require('../modules/ParseQuery')

class UserInfo extends Controller {
  async handler() {
    console.log(this.query)
    await new Promise(resolve => {
      setTimeout(resolve, 1e3)
    })
    return { ahihi: true }
  }
  match() {
    return this.test('/users/:user')
  }
}

class Otherwise extends Controller {
  handler(req, res) {
    return '404'
  }
}

listen([ParseQuery(), UserInfo, Otherwise], 3000)
