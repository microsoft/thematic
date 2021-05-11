/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useSafeCollapseDimensions } from './hooks/useSafeDimensions'
import { ScaleDropdownItemProps } from './types'
import { selectColorPalette, useScale } from './util'

export const ScaleDropdownItem: React.FC<ScaleDropdownItemProps> = ({
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
			<div style={{ width: 74 }}>{option.text}</div>
			<Palette scale={scale} width={width} height={height} />
		</div>
	)
}

const containerStyle = {
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	minWidth: 10,
}
