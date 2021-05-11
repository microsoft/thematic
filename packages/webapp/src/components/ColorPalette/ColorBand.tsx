/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { FC } from 'react'

export interface ColorBandProps {
	colors: string[]
	foreground: string
	label: string
	width: number
}
export const ColorBand: FC<ColorBandProps> = ({
	colors,
	foreground,
	label,
	width,
}) => {
	// hard-coded 83 is the label width + (2 * padding) + (2 * margin) + (2 * band margin)
	// 65 + 10 + 4 + 4
	const slice = width ? (width - 83) / colors.length : 0
	const colorBlocks = colors.map((color, index) => {
		return (
			<div
				key={`Color-${index}`}
				style={{
					width: slice,
					flexShrink: 0,
					background: color,
					height: 30,
					margin: 0,
					padding: 0,
				}}
			/>
		)
	})
	return (
		<div
			style={{
				display: 'flex',
			}}
		>
			<div
				style={{
					width: 65,
					flexShrink: 0,
					height: 20,
					lineHeight: '20px',
					color: foreground,
					textAlign: 'right',
					margin: 2,
					padding: 5,
				}}
			>
				{label}
			</div>
			<div
				style={{
					margin: 2,
					display: 'flex',
					flexFlow: 'row',
					flexWrap: 'wrap',
				}}
			>
				{colorBlocks}
			</div>
		</div>
	)
}
