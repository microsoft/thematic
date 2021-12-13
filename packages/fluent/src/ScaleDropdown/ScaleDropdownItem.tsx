/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC } from 'react'
import { TEXT_WIDTH } from './hooks/theme'
import { useSafeCollapseDimensions } from './hooks/useSafeDimensions'
import { ScaleDropdownItemProps } from './types'
import { selectColorPalette, useScale } from './util'

export const ScaleDropdownItem: FC<ScaleDropdownItemProps> = ({
	option,
	paletteWidth,
	paletteHeight,
	style,
}) => {
	const { key } = option
	const Palette = selectColorPalette(key)
	const [width, height] = useSafeCollapseDimensions(paletteWidth, paletteHeight)
	const scale = useScale(option.key, paletteWidth)
	return (
		<div
			style={{
				...containerStyle,
				...style,
			}}
		>
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
