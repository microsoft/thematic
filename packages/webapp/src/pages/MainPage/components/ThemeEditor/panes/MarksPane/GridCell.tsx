/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SelectionState, ThemeElementType } from '@thematic/core'
import { mark2style, useThematic } from '@thematic/react'
import type { CSSProperties, FC } from 'react'
import { useMemo } from 'react'

import { Arc, Circle, Line, Rect, Text } from '../../../../../../components/svg'

export interface GridCellProps {
	name: ThemeElementType
	size: number
	selectionState?: SelectionState
}

const selectMark = (key: ThemeElementType) => {
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

export const GridCell: FC<GridCellProps> = ({ name, size, selectionState }) => {
	const theme = useThematic()
	const Mark = useMemo(() => selectMark(name), [name])
	const exampleSize = size * 1.5
	const exampleStyle: CSSProperties = useMemo(
		() => ({
			...mark2style(theme.plotArea()),
			width: exampleSize,
			height: exampleSize,
		}),
		[theme, exampleSize],
	)
	const config = useMemo(
		() => theme[name]({ selectionState }),
		[theme, name, selectionState],
	)
	return (
		<div className="mark-grid-cell">
			<h3 className="mark-grid-cell-title">{name}</h3>
			<div className="mark-grid-cell-example" style={exampleStyle}>
				<Mark config={config} size={size} />
			</div>
		</div>
	)
}
