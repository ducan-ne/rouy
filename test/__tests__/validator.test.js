const Rouy = require('../../rouy')
const request = require('../common/request')
const createServer = require('../common/create-server')
const ParseQuery = require('../../modules/ParseQuery')
const Validator = require('../../packages/validator')

test('should return required', async function() {
  class Test extends Rouy.Controller {
    async handler() {
      await new Promise(resolve => {
        setTimeout(resolve, 1e3)
      })
      return { ahihi: true }
    }
    // render() {
    //   return html
    // }
    validateError(req, res, errors) {
      res.json(errors)
    }
    validate() {
      return {
        q: { type: String, required: true }
      }
    }
  }

  let server = await createServer([ParseQuery(), Validator(Test)])

  let { body } = await request(server, { query: {} })
  expect(body).toEqual([
    {
      param: 'q',
      validator: 'required',
      required: true,
      message: 'q is required'
    }
  ])
  server.close()
})

test('should return req.body', async function() {
  class Test extends Rouy.Controller {
    handler() {
      return this.query
    }
    // render() {
    //   return html
    // }
    validateError(req, res, errors) {
      res.json(errors)
    }
    validateBy(req) {
      return req.query
    }
    validate() {
      return {
        q: { type: String, required: true }
      }
    }
  }

  let server = await createServer([ParseQuery(), Validator(Test)])

  let { body } = await request(server, { query: { q: 'hello' } })
  expect(body).toEqual({ q: 'hello' })
  server.close()
})

test('validate array', async function() {
  class Test extends Rouy.Controller {
    handler() {
      return this.query
    }
    // render() {
    //   return html
    // }
    validateError(req, res, errors) {
      res.json(errors)
    }
    validateBy(req) {
      return req.query
    }
    validate() {
      return [{ type: String, required: true, name: 'q' }]
    }
  }

  let server = await createServer([ParseQuery(), Validator(Test)])

  let { body } = await request(server, { query: { q: 'hello' } })
  expect(body).toEqual({ q: 'hello' })
  server.close()
})
