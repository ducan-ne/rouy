const Rouy = require('../../rouy')
const request = require('../common/request')
const createServer = require('../common/create-server')
const ParseQuery = require('../../modules/ParseQuery')
const html = require('../common/html')
const JSX = require('../../packages/jsx')

test('basic jsx', async function() {
  let server = await createServer([ParseQuery(), JSX(html)])

  let { body } = await request(server, { json: false, query: {} })
  expect(body).toBe(
    '<html data-reactroot=""><body><h1>hello world</h1><p></p></body></html>'
  )
  server.close()
})

test('read query inside jsx', async function() {
  let server = await createServer([ParseQuery(), JSX(html)])

  let { body } = await request(server, { json: false, query: { q: 'xinchao' } })
  expect(body).toBe(
    '<html data-reactroot=""><body><h1>hello world</h1><p>xinchao</p></body></html>'
  )
  server.close()
})
