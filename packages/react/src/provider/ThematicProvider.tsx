/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme } from '@thematic/core'
import { FC, ReactNode, useMemo } from 'react'
import { ThematicContext, defaultTheme } from './ThematicContext'

export interface ThematicProviderProps {
	theme?: Theme
	children?: ReactNode
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
