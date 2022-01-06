/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme } from '@thematic/core'
import { useContext } from 'react'
import { ThematicContext } from './ThematicContext'

/**
 * Hook to retrieve the thematic theme directly.
 */
export function useThematic(): Theme {
	return useContext(ThematicContext)
}
