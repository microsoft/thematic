import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { useThematic, mark2style } from '@thematic/react'
import { useMemo } from 'react'
import { Rect, Circle, Line, Arc, Text } from '../svg'
const selectMark = key => {
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
export const GridCell = ({ name, size, selectionState }) => {
	const theme = useThematic()
	const Mark = selectMark(name)
	const exampleSize = size * 1.5
	const exampleStyle = useMemo(
		() => ({
			...mark2style(theme.plotArea()),
			width: exampleSize,
			height: exampleSize,
		}),
		[theme, exampleSize],
	)
	const config = theme[name]({ selectionState })
	return _jsxs(
		'div',
		{
			className: 'mark-grid-cell',
			children: [
				_jsx(
					'h2',
					{ className: 'mark-grid-cell-title', children: name },
					void 0,
				),
				_jsx(
					'div',
					{
						className: 'mark-grid-cell-example',
						style: exampleStyle,
						children: _jsx(Mark, { config: config, size: size }, void 0),
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
