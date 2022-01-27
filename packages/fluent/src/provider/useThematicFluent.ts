/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react'
import { FluentTheme } from '../types'
import { ThematicFluentContext } from './ThematicFluentContext'

/**
 * Hook to retrieve the thematic theme directly.
 */
export function useThematicFluent(): FluentTheme {
	return useContext(ThematicFluentContext)
}
