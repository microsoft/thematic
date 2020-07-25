This package provides a variety of helpers for applying Thematic to visualizations based on [D3](https://d3js.org/).

D3's generally programming model is to use function chaining to update selections. We provide a variety of applicator functions that work directly with the D3 [selection.call](https://github.com/d3/d3-selection#selection_call) mechanism to apply theme parameters to the selection items.

For example, you may want to apply the core chart properties to your root svg:

```
import { chart} from '@thematic/d3'
...
const svg = select('svg').call(chart as any, theme)
```

This example selects the svg DOM element, then passes the chart applicator function to the selection.call method, along with the theme instance as a parameter. Thematic will then read the chart properties from the theme, such as border and background color properties, and apply them to the svg as stroke and fill attributes.

We can do this with any selection, and Thematic provides applicator functions for both the core svg primitives (e.g., rect, circle, line, etc.), as well as higher-level charting components and semantics such as chart, plotArea, and axis.
