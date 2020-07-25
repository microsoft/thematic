/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react'
import { Theme } from '@thematic/core'
import { ThematicContext } from './ThematicContext'

/**
 * Hook to retrieve the thematic theme directly.
 */
export function useThematic(): Theme {
	return useContext(ThematicContext)
}
