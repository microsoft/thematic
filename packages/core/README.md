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

### Default themes

This package includes a handful of default themes to make it easy to get started. You can use the `loadById` function to get one of these by name. Otherwise, additional loader methods are present to generate brand new themes from raw input parameters.

## Extensions

This package also includes a few extensions to create theme objects that are compatible with other systems. These extensions are essentially just transform functions that accept a Theme instance and return any other object. We've included a few that we use in our projects:

- gimp: this generates a [GIMP-compatible](https://docs.gimp.org/en/gimp-concepts-palettes.html) palette text file. Usable in other apps that support this format such as Inkscape.
- office: this generates a set of standard colors for Microsoft Office themes. It's paricularly useful for generating PowerPoints that share the same colors as data visualizations that you may include. Note that Office does not have an importable JSON feature; we have used custom scripts to merge Thematic Office colors into PowerPoint XML template files.
- powerbi: this creates a [Power BI-compatible JSON file](https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes#import-custom-report-theme-files) that can be uploaded into your Power BI reports to set the theme data colors.
