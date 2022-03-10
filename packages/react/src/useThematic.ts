/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme } from '@thematic/core'
import { useContext } from 'react'

import { ThematicContext } from './ThematicContext.js'

/**
 * Hook to retrieve the thematic theme directly.
 */
export function useThematic(): Theme {
	return useContext(ThematicContext)
}
