const { Controller, listen } = require('./rouy')
const ParseQuery = require('./modules/ParseQuery')
const Validator = require('./packages/validator')
const JSX = require('./packages/jsx')

require('node-jsx').install({ extension: '.jsx' })

const html = require('./html')

// class UserInfo extends Controller {
//   // async handler() {
//   //   await new Promise(resolve => {
//   //     setTimeout(resolve, 1e3)
//   //   })
//   //   return { ahihi: true }
//   // }
//   render() {
//     return html
//   }
//   validate() {
//     return {
//       q: { type: String, required: true }
//     }
//   }
//   match() {
//     return this.test('/users/:user')
//   }
// }

// function UserInfo() {
//   if (!this.test('/test/hello')) return this.next()
//   return this.query
// }

// UserInfo.match = function() {
//   return this.test('/users/:user')
// }

class Otherwise extends Controller {
  handler(req, res) {
    return '404'
  }
}

listen([ParseQuery(), JSX(html), Otherwise], 3000)
