# freeze.js
freeze natives

## Usage (freeze)
```javascript
const {freeze} = require('freeze.js')
freeze('console.clear')
freeze('document.readyState')
```

Any attempts to patch `console.clear` will nop.

## Usage (unfreeze)
```javascript
const {unfreeze} = require('freeze.js')
unfreeze('console.clear')
```

## Tests

```
npm run test
```

Explore to [http://localhost:2222/](http://localhost:2222/).

(Tests have to be run in the browser because we need `window`.)
