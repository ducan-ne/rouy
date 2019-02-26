const { Controller } = require('../../rouy')
const request = require('../common/request')
const createServer = require('../common/create-server')

test('should connect to Controller Test', async function() {
  class Test extends Controller {
    async handle() {
      return '"hello from rouy"'
    }

    match() {
      return this.test('/test/:string')
    }
  }
  let server = await createServer(Test)

  let { body } = await request(server, '/test/hello-world')
  expect(body).toBe('hello from rouy')
  server.close()
})

test("should can't connect to Controller Test", async function() {
  class Test extends Controller {
    async handle() {
      return '"hello from rouy"'
    }

    match() {
      return this.test('/test/:string')
    }
  }
  let server = await createServer(Test)

  let { body } = await request(server, '/test-a-string/hello-world')
  expect(body).not.toBe('hello from rouy')
  server.close()
})

test('should return valid params', async function() {
  class Test extends Controller {
    handle() {
      return this.params
    }

    match() {
      return this.test('/test/:string')
    }
  }
  let server = await createServer(Test)

  let { body } = await request(server, '/test/hello-world')
  expect(body).toEqual({ string: 'hello-world' })
  server.close()
})
