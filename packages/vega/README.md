This package provides a [Vega](https://vega.github.io/vega/) adapter for thematic.

To use this, you feed it a Vega [Specification](https://vega.github.io/vega/docs/specification/) and a Theme instance, and it will return a copy of the Vega spec with appropriate properties added to globally theme the chart and marks.

Example:

```
import { load } from '@thematic/core'
import { vega as decorator } from '@thematic/vega'
const vega = require('vega')

const theme = load()
const spec = // a valid Vega spec
const merged = decorator(theme, spec)
const parsed = vega.parse(merged)
return new vega.View(parsed).renderer('svg')
```
