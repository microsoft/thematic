/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import { Dropdown } from '@fluentui/react'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'

import {
	useItemStyle,
	usePaletteHeight,
	usePaletteWidth,
	useSafeDimensions,
	useStyledProps,
	useThematicScaleOptions,
} from './ScaleDropdown.hooks.js'
import type { ScaleDropdownProps } from './ScaleDropdown.types.js'
import { ScaleDropdownOption } from './ScaleDropdownOption.js'

/**
 * Represents a Fluent dropdown of Thematic scale options.
 * The scale names can be accompanied by a visual rendering of the scale colors.
 * This bascially extends Dropdown, overriding the options and item rendering.
 */
export const ScaleDropdown: FC<ScaleDropdownProps> = ({
	type,
	size,
	...props
}) => {
	const ref = useRef(null)
	const { width, height } = useSafeDimensions(ref)
	const paletteWidth = usePaletteWidth(width, size)
	const paletteHeight = usePaletteHeight(height, props.label, size)
	const itemStyle = useItemStyle(width)
	const options = useThematicScaleOptions(type)
	const handleRenderTitle = useCallback(
		(options: IDropdownOption<any>[] | undefined) => {
			const firstOption = options?.[0]
			return firstOption ? (
				<ScaleDropdownOption
					paletteWidth={paletteWidth}
					paletteHeight={paletteHeight}
					option={firstOption}
					style={itemStyle}
					size={size}
				/>
			) : null
		},
		[paletteWidth, paletteHeight, itemStyle, size],
	)

	const handleRenderOption = useCallback(
		(option: IDropdownOption<any> | undefined) => {
			return option ? (
				<ScaleDropdownOption
					key={`scale-dropdown-item-${option.key as string}`}
					paletteWidth={paletteWidth}
					paletteHeight={paletteHeight}
					option={option}
					style={itemStyle}
					size={size}
				/>
			) : null
		},
		[paletteWidth, paletteHeight, itemStyle, size],
	)

	const _props = useStyledProps(props, size)

	return (
		<Dropdown
			onRenderTitle={handleRenderTitle}
			onRenderOption={handleRenderOption}
			{..._props}
			ref={ref}
			options={options}
		/>
	)
}
