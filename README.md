# freeze.js
Freeze constructors, methods, and properties

## Usage (freeze)
```javascript
const {freeze, thaw} = require('freeze.js')
freeze('console.clear')
freeze('document.readyState')
freeze('XMLHttpRequest')
freeze('XMLHttpRequest.prototype.open')
freeze('MyClass.prototype.method')
```

Any attempts to patch `console.clear`, `document.readyState`, `XMLHttpRequest`, `XMLHttpRequest.prototype.open`, or `MyClass.prototype.method` will silently nop.

Use `thaw(...)` to reverse.

## Tests
```
npm run test
```

Explore to [http://localhost:2222/](http://localhost:2222/). Open devtools.

(Tests have to be run in the browser because we need `window`)
