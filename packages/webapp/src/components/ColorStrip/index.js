import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import './index.css'
const ColorBlock = ({
	color,
	label,
	secondaryLabel,
	vertical,
	swatchStyle,
	labelStyle,
}) => {
	const direction = vertical ? 'vertical' : 'horizontal'
	return _jsxs(
		'div',
		{
			className: `color-block-${direction}`,
			children: [
				label
					? _jsx(
							'div',
							{
								className: `color-block-primary-label-${direction}`,
								style: labelStyle,
								children: label,
							},
							void 0,
					  )
					: null,
				_jsx(
					'div',
					{
						className: `color-block-swatch-${direction}`,
						style: { ...swatchStyle, backgroundColor: `${color}` },
					},
					void 0,
				),
				secondaryLabel
					? _jsx(
							'div',
							{
								className: `color-block-secondary-label-${direction}`,
								children: secondaryLabel,
							},
							void 0,
					  )
					: null,
			],
		},
		void 0,
	)
}
export const ColorStrip = ({
	colorDefinitions,
	vertical,
	swatchStyle,
	labelStyle,
}) => {
	const direction = vertical ? 'vertical' : 'horizontal'
	return _jsx(
		'div',
		{
			className: `color-strip-${direction}`,
			children: colorDefinitions.map(def =>
				_jsx(
					ColorBlock,
					{
						...def,
						vertical: vertical,
						swatchStyle: swatchStyle,
						labelStyle: labelStyle,
					},
					`${def.color}-${def.label}`,
				),
			),
		},
		void 0,
	)
}
