/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { FC } from 'react'
import { useMemo } from 'react'

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
	const colorBlocks = useMemo(() => {
		const slice = width ? (width - 102) / colors.length : 0
		return colors.map((color, index) => {
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
	}, [colors, width])
	const foregroundStyle = useMemo(
		() => ({
			width: 75,
			flexShrink: 0,
			height: 30,
			lineHeight: '20px',
			color: foreground,
			textAlign: 'right' as const,
			paddingTop: 8,
			marginRight: 4,
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
			<div style={layoutStyle}>{colorBlocks}</div>
		</div>
	)
}

const layoutStyle = {
	margin: 2,
	display: 'flex',
	flexFlow: 'row',
	flexWrap: 'wrap' as const,
}
