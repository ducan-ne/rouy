const React = require('react')
const { Controller, listen } = require('./rouy')

module.exports = class UserInfo extends Controller {
  render() {
    return (
      <html>
        <body>
          <h1>hello world</h1>
          <p>{this.query.q}</p>
        </body>
      </html>
    )
  }
  validate() {
    return {
      q: { type: String, required: true }
    }
  }
  validateBy(req) {
    return req.query
  }
  match() {
    return this.test('/users/:user')
  }
}
