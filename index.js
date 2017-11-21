;(function() {
  var nativeDefineProperty, keys = {}

  function freeze(key) {
    if (keys.hasOwnProperty(key)) return false

    var parse = parseKey(key)
    if (!parse) return false

    var obj = parse.obj
    var prop = parse.prop

    keys[key] = {
      frozen: obj[prop],
      obj: parse.obj,
      prop: parse.prop
    }

    if (!nativeDefineProperty) {
      // nop changes to the property descriptor for all of our `obj.prop` tuples
      nativeDefineProperty = Object.defineProperty
      Object.defineProperty = function (obj, prop, descriptor) {
        return shouldNopDefineProperty(obj, prop)
          ? obj
          : nativeDefineProperty.apply(undefined, arguments)
      }
    }

    nativeDefineProperty(obj, prop, {
      set: function (value) {
        if (keys[key] && !keys[key].frozen) {
          keys[key].closed = value
        }
      },
      get: function () {
        return keys[key].frozen || keys[key].closed
      }
    })
    return true
  }

  function unfreeze(key) {
    if (!keys.hasOwnProperty(key) || !keys[key].frozen) return false

    keys[key].closed = keys[key].frozen
    keys[key].frozen = false
    return true
  }

  function parseKey(key) {
    if (!key) {
      return
    }

    var split = key.split('.')
    var obj = window
    while (obj && split.length > 1) {
      obj = obj[split.shift()]
    }

    if (split.length > 1) {
      // could not find `key` from window
      return
    }

    var prop = split.shift()
    return obj[prop] && {
      obj: obj,
      prop: prop
    }
  }

  function shouldNopDefineProperty(obj, prop) {
    for (var key in keys) {
      if (keys.hasOwnProperty(key) &&
        keys[key].obj === obj && keys[key].prop === prop) {
        return true
      }
    }
    return false
  }

  module.exports = {
    freeze: freeze,
    unfreeze: unfreeze,
  }
})()
