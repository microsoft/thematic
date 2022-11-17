/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColor } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'
import { css2hsluv } from '@thematic/color'
import type { Theme } from '@thematic/core'
import { useCallback } from 'react'

type PartialParams = Partial<SchemeParams>

export function useParams(theme: Theme, onChange?: (theme: Theme) => void) {
	const updateParams = useCallback(
		(params: PartialParams) => {
			onChange &&
				onChange(
					theme.clone({
						params: {
							...theme.params,
							...params,
						},
					}),
				)
		},
		[theme, onChange],
	)
	return {
		params: theme.params,
		updateParams,
	}
}
export function useSliderChange(key: string, onChange: (params: any) => void) {
	return useCallback((v: number) => onChange({ [key]: v }), [key, onChange])
}
export function usePickerChange(
	onParamsChange: (params: PartialParams) => void,
) {
	return useCallback(
		(_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
			const [h, s, l] = css2hsluv(color.hex)
			onParamsChange({
				accentHue: h,
				accentSaturation: s,
				accentLightness: l,
			})
		},
		[onParamsChange],
	)
}
