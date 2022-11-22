/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { useMemo } from 'react'

import {
	useLabelStyle,
	usePaletteComponent,
	useSafeCollapseDimensions,
	useScale,
} from './ScaleDropdown.hooks.js'
import type { ScaleDropdownOptionProps } from './ScaleDropdown.types.js'

export const ScaleDropdownOption: FC<ScaleDropdownOptionProps> = ({
	option,
	paletteWidth,
	paletteHeight,
	style,
	size,
}) => {
	const { key } = option
	const Palette = usePaletteComponent(key as string)
	const [width, height] = useSafeCollapseDimensions(paletteWidth, paletteHeight)
	const scale = useScale(option.key as string, paletteWidth)
	const cStyle = useMemo(
		() => ({
			...containerStyle,
			...style,
		}),
		[style],
	)
	const labelStyle = useLabelStyle(size)
	return (
		<div style={cStyle}>
			<div style={labelStyle}>{option.text}</div>
			<Palette scale={scale} width={width} height={height} />
		</div>
	)
}

const containerStyle = {
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	minWidth: 10,
}
