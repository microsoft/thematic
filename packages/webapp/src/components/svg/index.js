import { jsx as _jsx } from 'react/jsx-runtime'
const svgAttrs = config => ({
	fill: config.fill().hex(),
	fillOpacity: config.fillOpacity(),
	stroke: config.stroke().hex(),
	strokeOpacity: config.strokeOpacity(),
	strokeWidth: config.strokeWidth(),
})
const Mark = props => {
	const { children, size } = props
	return _jsx(
		'svg',
		{
			width: size,
			height: size,
			style: { backgroundColor: 'none' },
			children: children,
		},
		void 0,
	)
}
export const Rect = props => {
	const { config, size } = props
	return _jsx(
		Mark,
		{
			...props,
			children: _jsx(
				'rect',
				{ width: size, height: size, ...svgAttrs(config) },
				void 0,
			),
		},
		void 0,
	)
}
export const Circle = props => {
	const { config, size } = props
	return _jsx(
		Mark,
		{
			...props,
			children: _jsx(
				'circle',
				{ ...svgAttrs(config), cx: size / 2, cy: size / 2, r: size * 0.48 },
				void 0,
			),
		},
		void 0,
	)
}
export const Line = props => {
	const { config, size } = props
	return _jsx(
		Mark,
		{
			...props,
			children: _jsx(
				'line',
				{ ...svgAttrs(config), x1: 0, x2: size, y1: size / 2, y2: size / 2 },
				void 0,
			),
		},
		void 0,
	)
}
export const Arc = props => {
	const { config, size } = props
	const d = `M0 0 L ${size} 0 A ${size / 4} ${size / 5} 0 0 1 0 0`
	return _jsx(
		Mark,
		{ ...props, children: _jsx('path', { ...svgAttrs(config), d: d }, void 0) },
		void 0,
	)
}
export const Text = props => {
	const { config, size } = props
	return _jsx(
		Mark,
		{
			...props,
			children: _jsx(
				'text',
				{
					...svgAttrs(config),
					fontSize: `${config.fontSize()}px`,
					fontWeight: config.fontWeight(),
					x: size / 2,
					y: size * 0.67,
					textAnchor: 'middle',
					children: '10',
				},
				void 0,
			),
		},
		void 0,
	)
}
