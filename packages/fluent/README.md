Provides integration with the @fluentui/react library, specifically working with their theming functionality.

Helpful links:

- [Fluent UI home page](https://developer.microsoft.com/en-us/fluentui#/)
- [Component docs](https://developer.microsoft.com/en-us/fluentui#/controls/web)
- [Icon tool](https://aka.ms/fluentui-icons)
- [Theme Designer](https://aka.ms/themedesigner)

## Theming Fluent Controls

This package contains a FluentTheme class and a loader to generate an instance from a thematic theme instance. You pass the generated Fluent theme instance to the Fluent theming provider, and all controls automatically inherit correct coloring.

The Thematic webapp uses this technique, so the entirety of the app is themed, including the Fluent controls.

Here is an example:

```
import { load } from '@thematic/core'
import { ThematicProvider } from '@thematic/react'
import { loadFluentTheme } from '@thematic/fluent'
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { ThemeProvider } from '@fluentui/react'

const theme = load()
const fluentTheme = loadFluentTheme(theme)

initializeIcons() // if you want to use Fluent icons, you have to load the font

// note the provisioning of both a ThematicProvider to enable useThematic() throughout the app,
// and ThemeProvider to theme Fluent UI controls
const App = () => {
	return (
		<ThematicProvider value={theme}>
			<ThemeProvider theme={fluentTheme.toFluent()}>
			// app content here...
			</ThemeProvider>
		</ThematicProvider>
	)
}
```

## Simplified Example

Also included in this package is a Provider component that wraps both ThematicProvider and Fluent ThemeProvider. You can do this:

```
	import { load } from '@thematic/core'
	import { ThematicFluentProvider } from '@thematic/fluent'

	const theme = load()

	const App = () => {
		return (
			<ThematicFluentProvider theme={theme}>
			// app content here...
			</ThematicFluentProvider>
		)
	}
```

The combined themes will be available throughout your app using the context hook of your choice. Specifically:

- to access it as a Thematic Theme, use `useThematic` from the [react](../react/) package.
- to access it as a Fluent ITheme, use the `useTheme` [hook](https://github.com/microsoft/fluentui/blob/0fac2d7a6f35c5fcebaf30da68b9604410fe0eb9/packages/react/src/utilities/ThemeProvider/useTheme.ts) provided by Fluent.
- to access it as a combined theme with both of the above interfaces merged, use the `useThematicFluent` hook in this package (handy for passing to other context providers like styled-components where you may need content from both themes).

## Palette mapping

This is an approximate mapping of the theme.application colors to Fluent theme.palette colors. Note that (1) Fluent has a much richer set of colors for greater nuance, hence a large number of gaps in the table, and (2) Fluent's theme generator has some hard-coded defaults that we overcome with a shading function, so the mapping in some cases (for the grayscales) is not precise.

### Primary

| Thematic        | Fluent          |
| --------------- | --------------- |
|                 | themeDarker     |
|                 | themeDark       |
|                 | themeDarkAlt    |
| accent, success | themePrimary    |
|                 | themeSeconday   |
|                 | themeTertiary   |
|                 | themeLight      |
|                 | themeLighter    |
|                 | themeLighterAlt |

### Foreground

| Thematic                 | Fluent            |
| ------------------------ | ----------------- |
|                          | black             |
|                          | neutralDark       |
| foreground, highContrast | neutralPrimary    |
|                          | neutralPrimaryAlt |
| midHighContrast          | neutralSecondary  |
| lowMidContrast           | neutralTertiary   |

### Background

| Thematic            | Fluent               |
| ------------------- | -------------------- |
| border, lowContrast | neutralTertiaryAlt   |
|                     | neutralQuaternary    |
|                     | neutralQuaternaryAlt |
|                     | neutralLight         |
| faint               | neutralLighter       |
|                     | neutralLighterAlt    |
| background          | white                |

## Unmapped

Thematic `warning`, and `error` are special colors, and `midContrast` has no near equivalent.
