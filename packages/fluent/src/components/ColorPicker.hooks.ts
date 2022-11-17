/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColor } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'
import { css2hsluv } from '@thematic/color'
import type { Theme } from '@thematic/core'
import { useDebounceEffect } from 'ahooks'
import { useCallback, useState } from 'react'

type PartialParams = Partial<SchemeParams>

export function useParams(theme: Theme, onChange?: (theme: Theme) => void) {
	const [local, setLocal] = useState<SchemeParams>(theme.params)
	const updateParams = useCallback(
		(params: PartialParams) => {
			setLocal(prev => ({
				...prev,
				...params,
			}))
		},
		[theme, onChange],
	)
	useDebounceEffect(() => {
		onChange &&
			onChange(
				theme.clone({
					params: {
						...theme.params,
						...local,
					},
				}),
			)
	}, [theme, local])
	return {
		params: local,
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
