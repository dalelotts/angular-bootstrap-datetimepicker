var angular = require('angular')
var test = require('tape')

test("can load module after requiring", function (t) {
  function loadModule () {
    angular.module("ui.bootstrap.datetimepicker")
  }

  t.throws(loadModule)
  require('./')
  t.doesNotThrow(loadModule)
  t.end()
})
