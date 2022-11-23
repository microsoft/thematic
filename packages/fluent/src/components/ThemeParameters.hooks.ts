/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { SchemeParams } from '@thematic/color'
import type { Theme } from '@thematic/core'
import { useCallback } from 'react'

export function useSliderChange(
	key: string,
	theme: Theme,
	onChange?: (params: SchemeParams) => void,
) {
	return useCallback(
		(v: number) => {
			onChange &&
				onChange({
					...theme.params,
					[key]: v,
				})
		},
		[key, theme, onChange],
	)
}
