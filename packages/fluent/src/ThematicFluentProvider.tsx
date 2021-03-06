/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { ThemeProvider } from '@fluentui/react'
import { useMemo, ReactNode, FC } from 'react'
import { loadFluentTheme } from './loader'
import { Theme } from '@thematic/core'
import { ThematicProvider } from '@thematic/react'

export interface ThematicFluentProviderProps {
	theme: Theme
	children?: ReactNode
}

initializeIcons()

/**
 * This component wraps the ThematicProvider and Fluent ThemeProvider to simplify instantiation.
 * Just treat it like a typical Context.Provider, wrapping it around your app.
 * Your Fluent controls should automatically inherit the Thematic colors as semantically applied by Fluent.
 */
export const ThematicFluentProvider: FC<ThematicFluentProviderProps> = ({
	theme,
	children,
}) => {
	const fluentTheme = useMemo(() => loadFluentTheme(theme), [theme])
	return (
		<ThematicProvider theme={theme}>
			<ThemeProvider theme={fluentTheme.toFluent()}>{children}</ThemeProvider>
		</ThematicProvider>
	)
}
