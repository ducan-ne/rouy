module.exports = Listen

const http = require('http')

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
      for (let [key, value] of req.$Rouy.entries()) {
        Ctrl.prototype[key] = value
      }

      const ctrl = new Ctrl(req, res)
      let keysBefore = Object.keys(ctrl)

      await ctrl.pre(req, res)

      let matched = ctrl.match(req, res)

      if (matched) {
        req.next = ctrl.next
        let result = await ctrl.handler(req, res, ctrl.next)

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
      server.listen(port, () => {
        console.log('app started at port %d', server.address().port)
      }),
    0
  )
  return server
}
