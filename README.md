# freeze.js
freeze natives

## Usage (freeze)
```javascript
const {freeze} = require('freeze.js')
freeze('console.clear')
```

Any attempts to patch `console.clear` will nop.

## Usage (unfreeze)
```javascript
const {unfreeze} = require('freeze.js')
unfreeze('console.clear')
```
