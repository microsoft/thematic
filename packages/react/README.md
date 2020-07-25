This is the React package for thematic. It makes things easier to use with React!

## Getting started

There is a context provider and hook for retrieving a theme instance in your components.

It looks something like this:

```
	// in your App.tsx or other 'root'
	import React from 'react'
	import { load } from '@thematic/core'
	import { ThematicProvider } from '@thematic/react'

	const theme = load()

	const App = () => {
		return (
			<ThematicProvider theme={theme}>
				<div>Hello World</div>
			</ThematicProvider>
		)
	}
```

Later, in some other component:

```
	import React from 'react'
	import { useThematic } from '@thematic/react'

	const Child = () => {
		const theme = useThematic()

		return (
			<div
				style={{
					backgroundColor: theme.application().background().hex()
					color: theme.application().foreground().hex()
				}}
			>
				Hello again!
			</div>
		)
	}
```

We also have a handle of styling functions and a root ApplicationStyles component to ease applying basic theme colors to your application defaults.

For example:

```
	// in your App.tsx or other 'root'
	import React from 'react'
	import { load } from '@thematic/core'
	import { ThematicProvider, ApplicationStyles } from '@thematic/react'

	const theme = load()

	const App = () => {
		return (
			<ThematicProvider theme={theme}>
				<ApplicationStyles />
				<div>Hello World</div>
			</ThematicProvider>
		)
	}
```

Weaving the ApplicationStyles component in here ensures that your default background, body text, and hyperlink colors match the theme.
