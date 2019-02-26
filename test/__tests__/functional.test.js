const Rouy = require('../../rouy')
const request = require('../common/request')
const createServer = require('../common/create-server')
const ParseQuery = require('../../modules/ParseQuery')

test('basic functional', async function() {
  function Test() {
    return this.query
  }
  let server = await createServer([ParseQuery(), Test])

  let { body } = await request(server, { query: { hello: 'from rouy' } })
  expect(body).toEqual({ hello: 'from rouy' })
  server.close()
})

test('functional with match fn', async function() {
  function Test() {
    return '"hello"'
  }

  Test.match = function() {
    return this.test('/test/:hello')
  }

  let server = await createServer(Test)

  let { body } = await request(server, '/test/xin-chao')
  expect(body).toEqual('hello')
  server.close()
})

test('functional with match string', async function() {
  function Test() {
    return '"hello"'
  }

  Test.match = '/test/:hello'

  let server = await createServer(Test)

  let { body } = await request(server, '/test/xin-chao')
  expect(body).toEqual('hello')
  server.close()
})
