import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
export const ColorStrip = ({
	colors,
	labelColors,
	foreground,
	background,
	label,
}) => {
	const colorBlocks = colors.map((color, index) => {
		return _jsx(
			'div',
			{
				title: `${label} color ${color}`,
				style: {
					width: 50,
					flexShrink: 0,
					background: color,
					height: 20,
					lineHeight: '20px',
					color: labelColors != null ? labelColors[index] : background,
					textAlign: 'center',
					margin: 2,
					padding: 5,
				},
				children: color,
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
