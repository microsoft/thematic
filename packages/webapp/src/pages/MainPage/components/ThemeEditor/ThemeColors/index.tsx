/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ThemeColors.css'

import { mark2style, useThematic } from '@thematic/react'
import type { FC } from 'react'
import { Fragment, useMemo } from 'react'

import { ApplicationPalette } from './ApplicationPalette.js'
import { ColorBand } from './ColorBand.js'
import { ColorStrip } from './ColorStrip.js'
import { Contrast } from './Contrast.js'
import { NamedPalette } from './NamedPalette.js'

// this is the same number we use under the hood when constructing the continuous scales,
// so it makes sense to use here and potentially allow the gradation bands to be visible,
// because that's how the actual encodings will work. for many of the mid-range interpolated
// values there can be a duplicate color at this level, so we know it is fine enough to cover
// what the scale puts forth
const BAND_SLICES = 100
const BAND_WIDTH = 720

export interface ThemeColorsProps {
	scaleItemCount: number
}

export const ThemeColors: FC<ThemeColorsProps> = ({ scaleItemCount }) => {
	const theme = useThematic()
	const [
		accentColor,
		foregroundColor,
		backgroundColor,
		errorColor,
		headerColor,
	] = usePalette()
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
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					border: `1px solid ${foregroundColor!}`,
					padding: '0 20px 10px 20px',
					background: backgroundColor!,
					color: foregroundColor!,
					textAlign: 'left',
				}}
			>
				<h3 style={{ color: headerColor! }}>Application colors</h3>
				<ApplicationPalette />
				<ul
					style={{
						fontSize: 14,
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
				<h3 style={{ color: headerColor! }}>Scales</h3>
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
				<h3 style={{ color: headerColor! }}>Color matching</h3>
				<div
					style={{
						display: 'flex',
					}}
				>
					<div
						style={{
							width: 200,
							fontSize: 14,
						}}
					>
						Thematic&apos;s <i>nearest</i> method will attempt to match any
						valid CSS color with the closest theme-compatible scale color using
						the hue component.
						<br />
						<br />
						ROYGBIV examples here.
					</div>
					<NamedPalette />
				</div>
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
			theme.application().midHighContrast().hex(),
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
