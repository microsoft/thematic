/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { ThemeProvider } from '@fluentui/react'
import type { Theme } from '@thematic/core'
import { ThematicProvider } from '@thematic/react'
import type { FC, ReactNode } from 'react'
import { useEffect, useMemo } from 'react'

import { loadFluentTheme } from '../loader.js'
import { ThematicFluentContext } from './ThematicFluentContext.js'

export interface ThematicFluentProviderProps {
	theme: Theme
	children?: ReactNode
}

/**
 * This component wraps the ThematicProvider and Fluent ThemeProvider to simplify instantiation.
 * Just treat it like a typical Context.Provider, wrapping it around your app.
 * Your Fluent controls should automatically inherit the Thematic colors as semantically applied by Fluent.
 * You can use the context hooks for any of the three variants as you please:
 * - useThematic from \@thematic/react returns the normal thematic theme
 * - useThematicFluent from this package returns the hybrid theme
 * - useTheme from \@fluentui/react returns the normal fluent theme
 */
export const ThematicFluentProvider: FC<ThematicFluentProviderProps> = ({
	theme,
	children,
}) => {
	useEffect(() => initializeIcons(), [])
	const combinedTheme = useMemo(() => loadFluentTheme(theme), [theme])
	const fluentTheme = useMemo(() => combinedTheme.toFluent(), [combinedTheme])
	return (
		<ThematicProvider theme={theme}>
			<ThematicFluentContext.Provider value={combinedTheme}>
				<ThemeProvider theme={fluentTheme}>{children}</ThemeProvider>
			</ThematicFluentContext.Provider>
		</ThematicProvider>
	)
}
