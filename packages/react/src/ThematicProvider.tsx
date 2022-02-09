/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme } from '@thematic/core'
import { FC, useMemo } from 'react'
import { ThematicContext, defaultTheme } from './ThematicContext.js'

export interface ThematicProviderProps {
	theme?: Theme
}

/**
 * Provider component from the default context for Thematic
 */
export const ThematicProvider: FC<ThematicProviderProps> = ({
	theme,
	children,
}) => {
	const t = useMemo(() => (theme ? theme : defaultTheme), [theme])
	return (
		<ThematicContext.Provider value={t}>{children}</ThematicContext.Provider>
	)
}
