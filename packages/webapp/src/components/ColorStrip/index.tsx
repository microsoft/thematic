/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './index.css'

import type { CSSProperties, FC } from 'react'

export interface ColorDefinition {
	color: string
	label?: string
	secondaryLabel?: string
}

interface ColorBlockProps extends ColorDefinition {
	vertical?: boolean
	swatchStyle?: CSSProperties
	labelStyle?: CSSProperties
}

export interface ColorStripProps {
	colorDefinitions: ColorDefinition[]
	vertical?: boolean
	swatchStyle?: CSSProperties
	labelStyle?: CSSProperties
}

const ColorBlock = ({
	color,
	label,
	secondaryLabel,
	vertical,
	swatchStyle,
	labelStyle,
}: ColorBlockProps) => {
	const direction = vertical ? 'vertical' : 'horizontal'
	return (
		<div className={`color-block-${direction}`}>
			{label ? (
				<div
					className={`color-block-primary-label-${direction}`}
					style={labelStyle}
				>
					{label}
				</div>
			) : null}
			<div
				className={`color-block-swatch-${direction}`}
				style={{ ...swatchStyle, backgroundColor: `${color}` }}
			/>
			{secondaryLabel ? (
				<div className={`color-block-secondary-label-${direction}`}>
					{secondaryLabel}
				</div>
			) : null}
		</div>
	)
}

export const ColorStrip: FC<ColorStripProps> = ({
	colorDefinitions,
	vertical,
	swatchStyle,
	labelStyle,
}) => {
	const direction = vertical ? 'vertical' : 'horizontal'
	return (
		<div className={`color-strip-${direction}`}>
			{colorDefinitions.map(def => (
				<ColorBlock
					key={`${def.color}-${def.label ?? 'unknown'}`}
					{...def}
					vertical={vertical}
					swatchStyle={swatchStyle}
					labelStyle={labelStyle}
				/>
			))}
		</div>
	)
}
