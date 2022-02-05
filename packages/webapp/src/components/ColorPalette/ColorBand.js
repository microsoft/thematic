import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
export const ColorBand = ({ colors, foreground, label, width }) => {
	// hard-coded 83 is the label width + (2 * padding) + (2 * margin) + (2 * band margin)
	// 65 + 10 + 4 + 4
	const slice = width ? (width - 83) / colors.length : 0
	const colorBlocks = colors.map((color, index) => {
		return _jsx(
			'div',
			{
				style: {
					width: slice,
					flexShrink: 0,
					background: color,
					height: 30,
					margin: 0,
					padding: 0,
				},
			},
			`Color-${index}`,
		)
	})
	return _jsxs(
		'div',
		{
			style: {
				display: 'flex',
			},
			children: [
				_jsx(
					'div',
					{
						style: {
							width: 65,
							flexShrink: 0,
							height: 20,
							lineHeight: '20px',
							color: foreground,
							textAlign: 'right',
							margin: 2,
							padding: 5,
						},
						children: label,
					},
					void 0,
				),
				_jsx(
					'div',
					{
						style: {
							margin: 2,
							display: 'flex',
							flexFlow: 'row',
							flexWrap: 'wrap',
						},
						children: colorBlocks,
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
