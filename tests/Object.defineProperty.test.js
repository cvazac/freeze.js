import test from 'tape';

test('A passing test', function(assert) {

  Object.testMethod = function original() {
  }

  Object.defineProperty(Object, 'testMethod', {
    writable: false, // shut off assignment
    configurable: false, // shut off changes to the property descriptor
    value: Object.testMethod // use the original property value
  });

  Object.testMethod = function patched() {
  }


  assert.end();


  (function test(revert, verifyNative, patch, verifyPatched, freeze, unfreeze) {
    revert()
    verifyNative()
    freeze()
    patch()
    verifyNative()
    unfreeze()
    patch()
    verifyPatched()
    revert()
    verifyNative()
  })(function () {
    Object.testMethod = function () {
      return 1
    }
  }, function () {
    assert.is(Object.testMethod() === 1)
  }, function () {
    Object.testMethod = function () {
      return 0
    }
  }, function () {
    assert.is(Object.testMethod() === 0)

  }, function () {
    Object.defineProperty(Object, 'testMethod', {
      writable: false,
      value: Object.testMethod
    })
  }, function () {
    Object.defineProperty(Object, 'testMethod', {
      writable: true,
    })
  })

  assert.end();
})
