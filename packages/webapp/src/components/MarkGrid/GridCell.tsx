/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { mark2style } from '@thematic/react'
import React from 'react'
import { Rect, Circle, Line, Arc, Text } from '../svg'
import { useThematic } from '@thematic/react'
import { SelectionState } from '@thematic/core'

interface GridCellProps {
	name: string
	size: number
	selectionState?: SelectionState
}

const selectMark = (key: string) => {
	switch (key) {
		case 'rect':
		case 'plotArea':
		case 'area':
		case 'tooltip':
			return Rect
		case 'circle':
		case 'process':
		case 'node':
			return Circle
		case 'line':
		case 'rule':
		case 'flow':
		case 'link':
		case 'axisLine':
		case 'axisTicks':
		case 'gridLines':
			return Line
		case 'arc':
			return Arc
		case 'text':
		case 'axisTickLabels':
		case 'axisTitle':
			return Text
		default:
			throw new Error('Unsupported mark type')
	}
}

export const GridCell: React.FC<GridCellProps> = ({
	name,
	size,
	selectionState,
}) => {
	const theme = useThematic()
	const Mark = selectMark(name)
	const exampleSize = size * 1.5
	const exampleStyle = {
		...mark2style(theme.plotArea()),
		width: exampleSize,
		height: exampleSize,
	}
	const config = theme[name]({ selectionState })
	return (
		<div className="mark-grid-cell">
			<h2 className="mark-grid-cell-title">{name}</h2>
			<div className="mark-grid-cell-example" style={exampleStyle}>
				<Mark config={config} size={size} />
			</div>
		</div>
	)
}
