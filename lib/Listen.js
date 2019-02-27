module.exports = Listen

const http = require('http')
const isClass = require('./modules/is-class')
const Controller = require('./Controller')

function handleResult(req, res, result) {
  if (res.finished) {
    return
  }

  if (result == undefined || result == null) {
    return res.end('')
  }

  if (typeof result === 'string' || typeof result === 'number') {
    return res.end(String(result))
  }

  if (typeof result === 'object') {
    return res.json(result)
  }
  return res.end(result.toString())
}

function Listen(ctrls, port) {
  let server = http.createServer()

  ctrls = ctrls.reduce((list, ctrl) => {
    if (ctrl.___$group) {
      list.push(...ctrl.___$group)
    } else {
      list.push(ctrl)
    }
    return list
  }, [])

  server.on('request', async function(req, res) {
    res.json = function json(obj, pretty) {
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      res.end(
        pretty == true ? JSON.stringify(obj, null, 4) : JSON.stringify(obj)
      )
    }

    req.$Rouy = new Map()

    for (let Ctrl of ctrls) {
      if (res.finished) {
        break
      }

      let ctrl

      if (isClass(Ctrl)) {
        ctrl = new Ctrl(req, res)
      } else {
        ctrl = new Controller(req, res)
        ctrl.handler = Ctrl

        Ctrl.test = ctrl.test
        if (typeof Ctrl.match === 'string') {
          ctrl.match = () => ctrl.test(Ctrl.match)
        } else if (Ctrl.match) {
          ctrl.match = (...args) => Ctrl.match.apply(ctrl, args)
        } else {
          ctrl.match = () => true
        }
      }

      for (let [key, value] of req.$Rouy.entries()) {
        ctrl[key] = value
      }

      let keysBefore = Object.keys(ctrl)

      await ctrl.pre(req, res)

      let matched = ctrl.match(req, res)

      if (ctrl._next) {
        continue
      }

      if (matched) {
        req.next = ctrl.next
        let result = await ctrl.handler(req, res, ctrl.next.bind(ctrl))

        for (let key of Object.keys(ctrl)) {
          if (!keysBefore.includes(key)) {
            req.$Rouy.set(key, ctrl[key])
          }
        }

        if (ctrl._next) {
          continue
        }

        handleResult(req, res, result)
        await ctrl.post(req, res)

        break
      }
    }
  })
  setTimeout(
    () =>
      server.address() === null &&
      server.listen(port, () => {
        console.log('app started at port %d', server.address().port)
      }),
    0
  )
  return server
}
