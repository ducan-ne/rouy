A 2.5kb web framework 👩‍🌾

Rouy is simple and flexible web framework for NODE JS, heavily inspired by React 🔥 🚀

Example Code:

```javascript
const Rouy = require('rouy')
const ParseQuery = require('rouy/modules/ParseQuery')
class UserInfo extends Rouy.Controller {
  async handler() {
    return { vuon_hong_ngay_xua: 'da ua tan' }
  }
  match() {
    return this.test('/users/:user')
  }
}

class Otherwise extends Rouy.Controller {
  handler(req, res) {
    return '404'
  }
}
// functional
function HelloWorld(req, res) {
  if (!this.test('/hello-world')) {
    return this.next()
  }
  return 'hello world, 2019'
}
// functional 2
function HelloWorld2(req, res) {
  return 'hello world, 2020'
}
HelloWorld2.match = '/hello-world'

Rouy.listen([ParseQuery(), UserInfo, Otherwise, HelloWorld, HelloWorld2], 3000)
```
