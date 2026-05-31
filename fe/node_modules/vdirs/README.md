# vdirs
Helper directives for Vue.

## Installation
```bash
npm install --save-dev vdirs
```

## Docs
### zindexable
**Description**

Set largest z-index on the most recently displayed element. 

**Usage**
```js
import { zindexable } from 'vdirs'

export default {
  directives: {
    zindexable
  }
}
```
```html
<div
  v-zindexable="{
    enabled: boolean,
    zIndex?: number
  }"
/>
```

### clickoutside, mousemoveoutside
**Description**

As the names.

**Usage**
```js
import { clickoutside, mousemoveoutside } from 'vdirs'

export default {
  directives: {
    clickoutside,
    mousemoveoutside
  }
}
```
```html
<div
  v-clickoutside="(e: MouseEvent) => any"
  v-mousemoveoutside="(e: MouseEvent) => any"
/>
```




