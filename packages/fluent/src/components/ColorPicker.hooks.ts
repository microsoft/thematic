/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColor } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'
import { css2hsluv } from '@thematic/color'
import type { Theme } from '@thematic/core'
import { useCallback } from 'react'

export function usePickerChange(
	theme: Theme,
	onChange?: (params: SchemeParams) => void,
) {
	return useCallback(
		(_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
			const [h, s, l] = css2hsluv(color.hex)
			onChange?.({
				...theme.params,
				accentHue: h,
				accentSaturation: s,
				accentLightness: l,
			})
		},
		[theme, onChange],
	)
}
