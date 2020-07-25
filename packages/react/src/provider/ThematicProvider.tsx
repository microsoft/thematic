/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { ReactNode, useMemo } from 'react'
import { ThematicContext, defaultTheme } from './ThematicContext'
import { Theme } from '@thematic/core'

export interface ThematicProviderProps {
	theme?: Theme
	children?: ReactNode
}

/**
 * Provider component from the default context for Thematic
 */
export const ThematicProvider: React.FC<ThematicProviderProps> = ({
	theme,
	children,
}) => {
	const t = useMemo(() => {
		return theme ? theme : defaultTheme
	}, [theme])
	return (
		<ThematicContext.Provider value={t}>{children}</ThematicContext.Provider>
	)
}
