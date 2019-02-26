const toString = Function.prototype.toString

function fnBody(fn) {
  return toString
    .call(fn)
    .replace(/^[^{]*{\s*/, '')
    .replace(/\s*}[^}]*$/, '')
}

module.exports = function(fn) {
  return (
    typeof fn === 'function' &&
    (/^class[\s{]/.test(toString.call(fn)) ||
      /^.*classCallCheck\(/.test(fnBody(fn))) // babel.js
  )
}
