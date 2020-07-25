This package contains the core theme parsing and transformation.

## Getting Started

To load the default theme, you can call `load` without any parameters:

```
	import { load } from '@thematic/core'

	const theme = load()
```

The Theme interface includes configuration objects for a wide variety of mark types and scales. Most of these follow a few basic format principles:

- where possible, we use svg attribute names for natural visual mappings
- all values are retrieved via functions rather than direct properties, this leaves us room to put optional modifier parameters in
- when colors are retrieved, they use a Color interface that has a variety of format functions

For example, to retrieve the configuration for rectangles on a chart (such as for a bar chart), it might look something like:

```
	const bar = theme.rect()
	const fill = bar.fill().hex() // get the hex code version of the fill color
```

The mark functions accept parameters ('MarkConfig') that allow for scale mappings, selection states, etc. The individual attr functions always accept a datum that can be used if scale mappings are provided.

For example:

```
	import { scaleLinear } from 'd3-scale'

	// get the selected bar config
	const normalBar = theme.rect()
	const selectedBar = theme.rect({ selectionState: SelectionState.Selected })
	const normalFill = normalBar.fill().hex() // default color
	const selectedFill = selectedBar.fill().hex() // darker color

	// bind a scale
	const scale = scaleLinear().range([1, 10])
	const scaledCircle = theme.circle({
		scaleBindings: {
			radius: {
				scale,
			}
		}
	})
	const r0 = scaledCircle.radius(0) // 1
	const r1 = scaledCircle.radius(1) // 10
```
