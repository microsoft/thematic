/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { mark2style } from '@thematic/react'
import { ColorStrip } from './ColorStrip'
import { ColorBand } from './ColorBand'
import { Contrast } from './Contrast'
import { ApplicationPalette } from './ApplicationPalette'
import { useThematic } from '@thematic/react'

// this is the same number we use under the hood when constructing the continuous scales,
// so it makes sense to use here and potentially allow the gradation bands to be visible,
// because that's how the actual encodings will work. for many of the mid-range interpolated
// values there can be a duplicate color at this level, so we know it is fine enough to cover
// what the scale puts forth
const BAND_SLICES = 100
const BAND_WIDTH = 720

interface ColorPaletteProps {
	scaleItemCount: number
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
	scaleItemCount,
}) => {
	const theme = useThematic()
	const accentColor = theme.application().accent().hex()
	const foregroundColor = theme.application().foreground().hex()
	const slideBackgroundColor = theme.application().background().hex()
	const errorColor = theme.application().error().hex()
	const chartBackgroundColor = theme.plotArea().fill().hex()
	const accent = (
		<React.Fragment>
			<span style={{ color: accentColor }}>Accent {accentColor}</span>
		</React.Fragment>
	)
	const background = (
		<React.Fragment>
			<span style={{ color: foregroundColor }}>
				Background {slideBackgroundColor}
			</span>
		</React.Fragment>
	)
	const foreground = (
		<React.Fragment>
			<span style={{ color: foregroundColor }}>
				Foreground {foregroundColor}
			</span>
		</React.Fragment>
	)
	const bandDomain = [0, BAND_SLICES - 1]
	const nominal = theme.scales().nominal(scaleItemCount).toArray()
	const nominalBold = theme.scales().nominalBold(scaleItemCount).toArray()
	const nominalMuted = theme.scales().nominalMuted(scaleItemCount).toArray()
	const sequential = theme.scales().sequential(bandDomain).toArray()
	const diverging = theme.scales().diverging(bandDomain).toArray()
	const sequential2 = theme.scales().sequential2(bandDomain).toArray()
	const diverging2 = theme.scales().diverging2(bandDomain).toArray()
	const greys = theme.scales().greys(bandDomain).toArray()
	return (
		<div
			style={{
				border: `1px solid ${foregroundColor}`,
				background: slideBackgroundColor,
				padding: '10px 30px 30px 30px',
				color: foregroundColor,
				textAlign: 'left',
			}}
		>
			<h2 style={{ color: foregroundColor }}>Application colors</h2>
			<ApplicationPalette />
			<ul
				style={{
					fontSize: 18,
					listStyleType: 'none',
					paddingLeft: 0,
				}}
			>
				<li>
					{foreground} on {background} (contrast ratio:{' '}
					<Contrast
						foreground={foregroundColor}
						background={slideBackgroundColor}
						error={errorColor}
						showLink
					/>
					)
				</li>
				<li>
					{accent} on {background} (contrast ratio:{' '}
					<Contrast
						foreground={accentColor}
						background={slideBackgroundColor}
						error={errorColor}
						showLink
					/>
					)
				</li>
			</ul>
			<h2 style={{ color: foregroundColor }}>Scales</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					fontSize: 12,
					width: BAND_WIDTH,
					padding: 8,
					...mark2style(theme.plotArea()),
				}}
			>
				<ColorStrip
					label="Nominal "
					foreground={accentColor}
					background={chartBackgroundColor}
					colors={nominal}
				/>
				<ColorStrip
					label="Nominal+"
					foreground={accentColor}
					background={chartBackgroundColor}
					colors={nominalBold}
					labelColors={nominalMuted}
				/>
				<ColorStrip
					label="Nominal-"
					foreground={accentColor}
					background={chartBackgroundColor}
					colors={nominalMuted}
					labelColors={nominalBold}
				/>
				<ColorBand
					label="Sequential"
					foreground={accentColor}
					colors={sequential}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Sequential2"
					foreground={accentColor}
					colors={sequential2}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Diverging"
					foreground={accentColor}
					colors={diverging}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Diverging2"
					foreground={accentColor}
					colors={diverging2}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Greys"
					foreground={accentColor}
					colors={greys}
					width={BAND_WIDTH}
				/>
			</div>
		</div>
	)
}
