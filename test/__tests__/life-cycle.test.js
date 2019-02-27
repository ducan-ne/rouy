const Rouy = require('../../rouy')
const request = require('../common/request')
const createServer = require('../common/create-server')

it('should run life cycle pre() before handler()', async function() {
  expect.assertions(1)
  class Test extends Rouy.Controller {
    async handler() {
      return '"hello from rouy"'
    }

    pre() {
      expect(1).toBe(1)
    }

    match() {
      return this.test('/test/:string')
    }
  }
  let server = await createServer(Test)

  await request(server, '/test/hello-world')
  server.close()
})

it('should run life cycle post() after handler()', async function() {
  expect.assertions(1)
  class Test extends Rouy.Controller {
    async handler() {
      return '"hello from rouy"'
    }

    post() {
      expect(1).toBe(1)
    }

    match() {
      return this.test('/test/:string')
    }
  }
  let server = await createServer(Test)

  await request(server, '/test/hello-world')
  server.close()
})
