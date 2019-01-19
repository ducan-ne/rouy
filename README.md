A simple and flexible web framework for NODE JS, heavily inspired by React 🔥 🚀

Example Code:

```javascript
const { Controller, listen } = require('rouy')
const ParseQuery = require('rouy/modules/ParseQuery')
class UserInfo extends Controller {
  async handler() {
    return { vuon_hong_ngay_xua: 'da ua tan' }
  }
  match() {
    return this.test('/users/:user')
  }
}

class Otherwise extends Controller {
  handler(req, res) {
    return '404'
  }
}

listen([ParseQuery(), UserInfo, Otherwise], 3000)
```
