const Rouy = require('../../rouy')

function BenchMark() {
  return { hello: 'world' }
}

Rouy.listen([BenchMark], 3000)
