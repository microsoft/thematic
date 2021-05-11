/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
interface ColorStripProps {
	colors: string[]
	labelColors?: string[]
	foreground: string
	background: string
	label: string
}
export const ColorStrip: React.FC<ColorStripProps> = ({
	colors,
	labelColors,
	foreground,
	background,
	label,
}) => {
	const colorBlocks = colors.map((color, index) => {
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
