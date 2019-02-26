const got = require('got')

module.exports = (server, opts) => {
  return got('http://localhost:' + server.address().port, {
    ...(typeof opts === 'string' ? {} : opts),
    path: typeof opts === 'string' ? opts : '/',
    json: true
  })
}
