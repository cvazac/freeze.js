!(function() {

  // if you have a method that you want to lock down
  Object.testMethod = function() {
    return 'native'
  }

  // nop changes to the property descriptor for Object.testMethod
  var defineProperty = Object.defineProperty
  Object.defineProperty = function(obj, prop, descriptor) {
    if (obj === Object && prop === 'testMethod') {
      return obj
    }
    return defineProperty.call(undefined, arguments)
  }

  // save a reference to the original method
  var _orig = Object.testMethod

  // you can nop the setter
  defineProperty(Object, 'testMethod', {
    set: function() {},
    get: function() { return _orig }
  })

  Object.testMethod = function() {
    return 'patched'
  }
  // reassignment will nop silently

  // and you can revert it by changing the setters/getters
  var closedValue = _orig
  defineProperty(Object, 'testMethod', {
    set: function(value) {
      closedValue = value
    },
    get: function() {
      return closedValue
    }
  })

  // reassignment will succeed
  Object.testMethod = function() {
    return 'patched'
  }
})()