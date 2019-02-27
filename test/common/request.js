const got = require('got')

module.exports = (server, opts) => {
  return got('http://localhost:' + server.address().port, {
    json: true,
    ...(typeof opts === 'string' ? {} : opts),
    path: typeof opts === 'string' ? opts : '/'
  })
}
