/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dropdown } from '@fluentui/react'
import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { ScaleDropdownItem } from './ScaleDropdownItem'
import {
	usePaletteWidth,
	usePaletteHeight,
	useItemStyle,
	useThematicScaleOptions,
} from './hooks/theme'
import { useSafeDimensions } from './hooks/useSafeDimensions'
import { ScaleDropdownProps } from './types'

/**
 * Represents a Fluent dropdown of Thematic scale options.
 * The scale names can be accompanied by a visual rendering of the scale colors.
 * This bascially extends Dropdown, overriding the options and item rendering.
 * TODO: move to @thematic/fluent
 */
export const ScaleDropdown: React.FC<ScaleDropdownProps> = props => {
	const ref = useRef(null)
	const { width, height } = useSafeDimensions(ref)
	const paletteWidth = usePaletteWidth(width)
	const paletteHeight = usePaletteHeight(height, props.label)
	const itemStyle = useItemStyle(width)
	const options = useThematicScaleOptions()

	const handleRenderTitle = useCallback(
		([option]) => {
			return (
				<ScaleDropdownItem
					paletteWidth={paletteWidth}
					paletteHeight={paletteHeight}
					option={option}
				/>
			)
		},
		[paletteWidth, paletteHeight],
	)

	const handleRenderOption = useCallback(
		option => {
			return (
				<ScaleDropdownItem
					key={`scale-dropdown-item-${option.key}`}
					paletteWidth={paletteWidth}
					paletteHeight={paletteHeight}
					option={option}
					style={itemStyle}
				/>
			)
		},
		[paletteWidth, paletteHeight, itemStyle],
	)

	return (
		<Container ref={ref}>
			<Dropdown
				{...props}
				options={options}
				onRenderTitle={handleRenderTitle}
				onRenderOption={handleRenderOption}
			/>
		</Container>
	)
}

const Container = styled.div``
