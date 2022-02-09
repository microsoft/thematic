/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { FC, useMemo } from 'react'

export interface ColorStripProps {
	colors: string[]
	labelColors?: string[]
	foreground: string
	background: string
	label: string
}
export const ColorStrip: FC<ColorStripProps> = ({
	colors,
	labelColors,
	foreground,
	background,
	label,
}) => {
	const colorBlocks = useMemo(
		() =>
			colors.map((color, index) => {
				return (
					<div
						key={`Color-${index}`}
						title={`${label} color ${color}`}
						style={{
							width: 50,
							flexShrink: 0,
							background: color,
							height: 20,
							lineHeight: '20px',
							color: labelColors != null ? labelColors[index] : background,
							textAlign: 'center',
							margin: 2,
							padding: 5,
						}}
					>
						{color}
					</div>
				)
			}),
		[colors, background, label, labelColors],
	)
	const foregroundStyle = useMemo(
		() => ({
			width: 65,
			flexShrink: 0,
			height: 20,
			lineHeight: '20px',
			color: foreground,
			textAlign: 'right' as const,
			margin: 2,
			padding: 5,
		}),
		[foreground],
	)
	return (
		<div
			style={{
				display: 'flex',
			}}
		>
			<div style={foregroundStyle}>{label}</div>
			<div
				style={{
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
