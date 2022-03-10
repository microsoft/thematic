/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { useMemo } from 'react'

import { TEXT_WIDTH, usePaletteComponent, useScale } from './hooks/theme.js'
import { useSafeCollapseDimensions } from './hooks/useSafeDimensions.js'
import type { ScaleDropdownItemProps } from './types.js'

export const ScaleDropdownItem: FC<ScaleDropdownItemProps> = ({
	option,
	paletteWidth,
	paletteHeight,
	style,
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
	return (
		<div style={cStyle}>
			<div style={labelStyle}>{option.text}</div>
			<Palette scale={scale} width={width} height={height} />
		</div>
	)
}

const labelStyle = {
	width: TEXT_WIDTH,
	minWidth: TEXT_WIDTH,
}

const containerStyle = {
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	minWidth: 10,
}
