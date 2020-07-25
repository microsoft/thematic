Provides integration with the @fluentui/react library, specifically working with their theming functionality.

**NOTE:** to use the hook and jsx components, you may need an alias for react to your Webpack configuration, otherwise
multiple copies of react will be loaded and it will not work. See [Duplicate React](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react).

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
import { initializeIcons } from '@uifabric/icons'
import { ThemeProvider } from '@fluentui/react/lib/Foundation'

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
