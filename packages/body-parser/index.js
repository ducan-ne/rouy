const { Controller } = require('rouy')

module.exports = createParser

function createParser(options = {}) {
  const parserJSON = require('body-parser').json(options)
  const parserFORM = require('body-parser').urlencoded(options)

  let types = options.types || ['form']
  class Parser extends Controller {
    handler(req, res, next) {
      function makeParsePromise(parser) {
        return new Promise(resolve => {
          parser(req, res, resolve)
        })
      }

      return new Promise(async resolve => {
        for (let type of types) {
          switch (type) {
            case 'form':
              await makeParsePromise(parserFORM)
              break
            case 'json':
              await makeParsePromise(parserJSON)
              break
          }
        }
        resolve()
        next()
      })
    }
  }

  return Parser
}
