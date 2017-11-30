const test = require('tape')
const {freeze, thaw} = require('../index')

// happy paths
test('Freeze and Unfreeze `Object.method1()`', function(assert) {
  const testMethod = 'method1'
  Object[testMethod] = function() { return 1 }

  assert.is(Object[testMethod](), 1) // is original
  assert.true(freeze('Object.' + testMethod)) // should freeze testMethod
  assert.is(Object[testMethod](), 1) // is original
  Object[testMethod] = function() { return 2 } // should NOT patch testMethod
  assert.is(Object[testMethod](), 1) // is original
  assert.true(thaw('Object.' + testMethod)) // should thaw testMethod
  assert.is(Object[testMethod](), 1) // is original
  Object[testMethod] = function() { return 2 } // should patch testMethod
  assert.is(Object[testMethod](), 2) // is patched

  assert.end();
})

test('Freeze and Unfreeze several methods', function(assert) {
  const testMethods = ['Object.method2', 'Object.child.method3', 'Object.child.grandChild.method4']
  Object.method2 = function() {
    return 1
  }
  Object.child = {
    method3: function() {
      return 1
    },
    grandChild: {
      method4: function() {
        return 1
      }
    }
  }

  testMethods.forEach(function(testMethod) {
    assert.is(eval(testMethod)(), 1) // is original
  })

  testMethods.forEach(function(testMethod) {
    assert.true(freeze(testMethod)) // should freeze testMethod
  })

  testMethods.forEach(function(testMethod) {
    eval(testMethod + ' = function() { return 2 }') // should NOT patch testMethod
  })

  testMethods.forEach(function(testMethod) {
    assert.is(eval(testMethod)(), 1) // is original
  })

  testMethods.forEach(function(testMethod) {
    assert.true(thaw(testMethod)) // should thaw testMethod
  })

  testMethods.forEach(function(testMethod) {
    assert.is(eval(testMethod)(), 1) // is original
  })

  testMethods.forEach(function(testMethod) {
    eval(testMethod + ' = function() { return 2 }') // should patch testMethod
  })

  testMethods.forEach(function(testMethod) {
    assert.is(eval(testMethod)(), 2) // is patched
  })

  assert.end();
})

// TODO add tests against Object.defineProperty & Object.assign

// unhappy paths
test('Multiple calls to `freeze()` will nop', function(assert) {
  const testMethod = 'method3'
  Object[testMethod] = function() { return 1 }

  assert.true(freeze('Object.' + testMethod)) // should freeze testMethod
  assert.false(freeze('Object.' + testMethod)) // should NOT freeze testMethod
  assert.false(freeze('Object.' + testMethod)) // should NOT freeze testMethod

  assert.end();
})

test('Multiple calls to `thaw()` will nop', function(assert) {
  const testMethod = 'method4'
  Object[testMethod] = function() { return 1 }

  assert.false(thaw('Object.' + testMethod)) // should NOT thaw testMethod
  assert.true(freeze('Object.' + testMethod)) // should freeze testMethod
  assert.true(thaw('Object.' + testMethod)) // should thaw testMethod
  assert.false(thaw('Object.' + testMethod)) // should NOT thaw testMethod
  assert.false(thaw('Object.' + testMethod)) // should NOT thaw testMethod

  assert.end();
})

test('freeze() will nop for unfound refereces', function(assert) {
  assert.false(freeze('Object.method5')) // should NOT freeze non-existant reference
  assert.end();
})

test('thaw() will nop for unfound refereces', function(assert) {
  assert.false(thaw('Object.method5')) // should NOT thaw non-existant reference
  assert.end();
})
