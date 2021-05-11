/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, ReactNode } from 'react'

export interface MarkProps {
	children: ReactNode
	size: number
}

export interface ThemedMarkProps {
	config: any
	size: number
}

const svgAttrs = config => ({
	fill: config.fill().hex(),
	fillOpacity: config.fillOpacity(),
	stroke: config.stroke().hex(),
	strokeOpacity: config.strokeOpacity(),
	strokeWidth: config.strokeWidth(),
})

const Mark: FC<MarkProps> = props => {
	const { children, size } = props
	return (
		<svg width={size} height={size} style={{ backgroundColor: 'none' }}>
			{children}
		</svg>
	)
}

export const Rect: FC<ThemedMarkProps> = props => {
	const { config, size } = props
	return (
		<Mark {...props}>
			<rect width={size} height={size} {...svgAttrs(config)} />
		</Mark>
	)
}

export const Circle: FC<ThemedMarkProps> = props => {
	const { config, size } = props
	return (
		<Mark {...props}>
			<circle
				{...svgAttrs(config)}
				cx={size / 2}
				cy={size / 2}
				r={size * 0.48} // should we actually use the theme radius?
			/>
		</Mark>
	)
}

export const Line: FC<ThemedMarkProps> = props => {
	const { config, size } = props
	return (
		<Mark {...props}>
			<line
				{...svgAttrs(config)}
				x1={0}
				x2={size}
				y1={size / 2}
				y2={size / 2}
			/>
		</Mark>
	)
}

export const Arc: FC<ThemedMarkProps> = props => {
	const { config, size } = props
	const d = `M0 0 L ${size} 0 A ${size / 4} ${size / 5} 0 0 1 0 0`

	return (
		<Mark {...props}>
			<path {...svgAttrs(config)} d={d} />
		</Mark>
	)
}

export const Text: FC<ThemedMarkProps> = props => {
	const { config, size } = props
	return (
		<Mark {...props}>
			<text
				{...svgAttrs(config)}
				fontSize={`${config.fontSize()}px`}
				fontWeight={config.fontWeight()}
				x={size / 2}
				y={size * 0.67}
				textAnchor={'middle'}
			>
				10
			</text>
		</Mark>
	)
}
