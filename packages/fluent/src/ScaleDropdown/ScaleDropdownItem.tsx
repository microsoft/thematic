/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import styled from 'styled-components'
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
		<Container style={style}>
			<Label>{option.text}</Label>
			<Palette scale={scale} width={width} height={height} />
		</Container>
	)
}

const Container = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 10;
`

const Label = styled.div`
	width: 74px;
`
