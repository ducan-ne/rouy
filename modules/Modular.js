function Modular(ctrl, opts) {
  ctrl.prototype.match = function() {
    return '/method/' + ctrl.name
  }
}
module.exports = Modular
