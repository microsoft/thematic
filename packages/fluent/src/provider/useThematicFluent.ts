/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react'
import type { FluentTheme } from '../types.js'
import { ThematicFluentContext } from './ThematicFluentContext.js'

/**
 * Hook to retrieve the thematic theme directly.
 */
export function useThematicFluent(): FluentTheme {
	return useContext(ThematicFluentContext)
}
