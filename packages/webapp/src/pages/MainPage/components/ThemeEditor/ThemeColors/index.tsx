/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ThemeColors.css'

import { mark2style, useThematic } from '@thematic/react'
import type { FC } from 'react'
import { Fragment, useMemo } from 'react'

import { ApplicationPalette } from './ApplicationPalette'
import { ColorBand } from './ColorBand'
import { ColorStrip } from './ColorStrip'
import { Contrast } from './Contrast'

// this is the same number we use under the hood when constructing the continuous scales,
// so it makes sense to use here and potentially allow the gradation bands to be visible,
// because that's how the actual encodings will work. for many of the mid-range interpolated
// values there can be a duplicate color at this level, so we know it is fine enough to cover
// what the scale puts forth
const BAND_SLICES = 100
const BAND_WIDTH = 720

export interface ColorPaletteProps {
	scaleItemCount: number
}

export const ColorPalette: FC<ColorPaletteProps> = ({ scaleItemCount }) => {
	const theme = useThematic()
	const [accentColor, foregroundColor, backgroundColor, errorColor] =
		usePalette()
	const accent = (
		<Fragment>
			<span style={{ color: accentColor! }}>Accent {accentColor}</span>
		</Fragment>
	)
	const background = (
		<Fragment>
			<span style={{ color: foregroundColor! }}>
				Background {backgroundColor}
			</span>
		</Fragment>
	)
	const foreground = (
		<Fragment>
			<span style={{ color: foregroundColor! }}>
				Foreground {foregroundColor}
			</span>
		</Fragment>
	)

	const [
		nominal,
		nominalBold,
		nominalMuted,
		sequential,
		diverging,
		sequential2,
		diverging2,
		greys,
	] = useScales(scaleItemCount)
	return (
		<div
			style={{
				border: `1px solid ${foregroundColor!}`,
				background: backgroundColor!,
				padding: '0 20px 20px 20px',
				color: foregroundColor!,
				textAlign: 'left',
			}}
		>
			<h2 style={{ color: foregroundColor! }}>Application colors</h2>
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
						foreground={foregroundColor!}
						background={backgroundColor!}
						error={errorColor!}
						showLink
					/>
					)
				</li>
				<li>
					{accent} on {background} (contrast ratio:{' '}
					<Contrast
						foreground={accentColor!}
						background={backgroundColor!}
						error={errorColor!}
						showLink
					/>
					)
				</li>
			</ul>
			<h2 style={{ color: foregroundColor! }}>Scales</h2>
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
					foreground={foregroundColor!}
					background={backgroundColor!}
					colors={nominal!}
				/>
				<ColorStrip
					label="Nominal+"
					foreground={foregroundColor!}
					background={backgroundColor!}
					colors={nominalBold!}
					labelColors={nominalMuted}
				/>
				<ColorStrip
					label="Nominal-"
					foreground={foregroundColor!}
					background={backgroundColor!}
					colors={nominalMuted!}
					labelColors={nominalBold}
				/>
				<ColorBand
					label="Sequential"
					foreground={foregroundColor!}
					colors={sequential!}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Sequential2"
					foreground={foregroundColor!}
					colors={sequential2!}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Diverging"
					foreground={foregroundColor!}
					colors={diverging!}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Diverging2"
					foreground={foregroundColor!}
					colors={diverging2!}
					width={BAND_WIDTH}
				/>
				<ColorBand
					label="Greys"
					foreground={foregroundColor!}
					colors={greys!}
					width={BAND_WIDTH}
				/>
			</div>
		</div>
	)
}

function usePalette() {
	const theme = useThematic()
	return useMemo(() => {
		return [
			theme.application().accent().hex(),
			theme.application().foreground().hex(),
			theme.application().background().hex(),
			theme.application().error().hex(),
		]
	}, [theme])
}
function useScales(scaleItemCount: number) {
	const theme = useThematic()
	return useMemo(() => {
		const bandDomain = [0, BAND_SLICES - 1]
		return [
			theme.scales().nominal(scaleItemCount).toArray(),
			theme.scales().nominalBold(scaleItemCount).toArray(),
			theme.scales().nominalMuted(scaleItemCount).toArray(),
			theme.scales().sequential(bandDomain).toArray(),
			theme.scales().diverging(bandDomain).toArray(),
			theme.scales().sequential2(bandDomain).toArray(),
			theme.scales().diverging2(bandDomain).toArray(),
			theme.scales().greys(bandDomain).toArray(),
		]
	}, [theme, scaleItemCount])
}
