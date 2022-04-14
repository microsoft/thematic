/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import { Dropdown } from '@fluentui/react'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'

import {
	useContainerStyle,
	useItemStyle,
	usePaletteHeight,
	usePaletteWidth,
	useThematicScaleOptions,
} from './hooks/theme.js'
import { useSafeDimensions } from './hooks/useSafeDimensions.js'
import { ScaleDropdownItem } from './ScaleDropdownItem.js'
import type { ScaleDropdownProps } from './types.js'

/**
 * Represents a Fluent dropdown of Thematic scale options.
 * The scale names can be accompanied by a visual rendering of the scale colors.
 * This bascially extends Dropdown, overriding the options and item rendering.
 */
export const ScaleDropdown: FC<ScaleDropdownProps> = props => {
	const ref = useRef(null)
	const { width, height } = useSafeDimensions(ref)
	const paletteWidth = usePaletteWidth(width)
	const paletteHeight = usePaletteHeight(height, props.label)
	const containerStyle = useContainerStyle()
	const itemStyle = useItemStyle(width)
	const options = useThematicScaleOptions()
	const handleRenderTitle = useCallback(
		(options: IDropdownOption<any>[] | undefined) => {
			const firstOption: IDropdownOption<any> = options![0]!
			return (
				<ScaleDropdownItem
					paletteWidth={paletteWidth}
					paletteHeight={paletteHeight}
					option={firstOption!}
				/>
			)
		},
		[paletteWidth, paletteHeight],
	)

	const handleRenderOption = useCallback(
		(option: IDropdownOption<any> | undefined) => {
			return option ? (
				<ScaleDropdownItem
					key={`scale-dropdown-item-${option.key as string}`}
					paletteWidth={paletteWidth}
					paletteHeight={paletteHeight}
					option={option}
					style={itemStyle}
				/>
			) : null
		},
		[paletteWidth, paletteHeight, itemStyle],
	)

	return (
		<div style={containerStyle} ref={ref}>
			<Dropdown
				{...props}
				options={options}
				onRenderTitle={handleRenderTitle}
				onRenderOption={handleRenderOption}
			/>
		</div>
	)
}
