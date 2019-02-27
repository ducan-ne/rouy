const Rouy = require('../../rouy')
const request = require('../common/request')
const createServer = require('../common/create-server')
const ParseQuery = require('../../modules/ParseQuery')

it('modules: ParseQuery', async function() {
  class Test extends Rouy.Controller {
    async handler() {
      return this.query
    }
  }
  let server = await createServer([ParseQuery(), Test])

  let { body } = await request(server, { query: { hello: 'from rouy' } })
  expect(body).toEqual({ hello: 'from rouy' })
  server.close()
})
