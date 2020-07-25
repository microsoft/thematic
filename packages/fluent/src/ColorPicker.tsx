/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { CSSProperties } from 'react'
import { Theme } from '@thematic/core'
import { css2hsluv } from '@thematic/color'
import {
	ColorPicker as FluentColorPicker,
	Slider,
	IColor,
} from '@fluentui/react'
import { useThematic } from '@thematic/react'

export enum ColorPickerLayout {
	PickerOnly,
	SideBySide,
}

export interface ColorPickerStyles {
	sliders?: CSSProperties
	slider?: CSSProperties
}

interface ColorPickerProps {
	onChange?: (theme: Theme) => void
	layout?: ColorPickerLayout
	styles?: ColorPickerStyles
}

// TODO: this is a copy of the color/Params interface, but with each item optional
interface PartialParams {
	accentHue?: number
	accentSaturation?: number
	accentLuminance?: number
	backgroundHueShift?: number
	backgroundLevel?: number
	nominalHueStep?: number
}

/**
 * This is a simple ColorPicker that you can show users, allowing them to choose a custom accent color.
 * It does not expose the background and nominal step properties, but may do so in the future.
 * At the moment it isn't much different than a regular color picker, but exists to wrap up the theme
 * parameterization and leave room for additional functionality.
 * Note also that it does NOT expose an alpha control, because this is not allowed in thematic params.
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
	onChange,
	layout,
	styles,
}) => {
	const theme = useThematic()

	const lyt = layout || ColorPickerLayout.PickerOnly

	const updateParams = (params: PartialParams) => {
		if (onChange) {
			onChange(
				theme.clone({
					params: {
						...theme.params,
						...params,
					},
				}),
			)
		}
	}

	const handlePickerChange = (e, color: IColor) => {
		const [h, s, l] = css2hsluv(color.hex)
		updateParams({
			accentHue: h,
			accentSaturation: s,
			accentLuminance: l,
		})
	}

	// TODO: debounce sliders so the value can be shown updating
	const handleAccentHueChange = (v: number) => updateParams({ accentHue: v })
	const handleaccentSaturationChange = (v: number) =>
		updateParams({ accentSaturation: v })
	const handleAccentLuminanceChange = (v: number) =>
		updateParams({ accentLuminance: v })
	const handleBackgroundLevelChange = (v: number) =>
		updateParams({ backgroundLevel: v })
	const handleBackgroundHueShiftChange = (v: number) =>
		updateParams({ backgroundHueShift: v })
	const handleNominalHueStepChange = (v: number) =>
		updateParams({ nominalHueStep: v })

	const {
		accentHue,
		accentSaturation,
		accentLuminance,
		backgroundLevel,
		backgroundHueShift,
		nominalHueStep,
	} = theme.params

	// TODO: it would be really nice to make these IStyle objects and pass directly to
	// child component instead of wrapping them in a div
	// however, there are type incompatibilities that make it wonky
	const slidersStyles = {
		width: 300, // default max width of color picker, so the sliders match
		...(styles && styles.sliders),
	}
	const sliderStyles = {
		marginTop: 8,
		...(styles && styles.slider),
	}
	return (
		<div style={{ display: 'flex' }}>
			<FluentColorPicker
				color={theme.application().accent().hex()}
				onChange={handlePickerChange}
				alphaType="none"
			/>
			{lyt === ColorPickerLayout.SideBySide ? (
				<div style={slidersStyles}>
					<div style={sliderStyles}>
						<Slider
							label="Accent hue"
							value={accentHue}
							min={0}
							max={360}
							step={1}
							onChange={handleAccentHueChange}
						/>
					</div>
					<div style={sliderStyles}>
						<Slider
							label="Accent saturation"
							value={accentSaturation}
							min={0}
							max={100}
							step={1}
							onChange={handleaccentSaturationChange}
						/>
					</div>
					<div style={sliderStyles}>
						<Slider
							label="Accent lightness"
							value={accentLuminance}
							min={0}
							max={100}
							step={1}
							onChange={handleAccentLuminanceChange}
						/>
					</div>
					<div style={sliderStyles}>
						<Slider
							label="Background level"
							value={backgroundLevel}
							min={0}
							max={100}
							step={1}
							onChange={handleBackgroundLevelChange}
						/>
					</div>
					<div style={sliderStyles}>
						<Slider
							label="Background hue shift"
							value={backgroundHueShift}
							min={0}
							max={100}
							step={1}
							onChange={handleBackgroundHueShiftChange}
						/>
					</div>
					<div style={sliderStyles}>
						<Slider
							label="Nominal scale step"
							value={nominalHueStep}
							min={0}
							max={21}
							step={1}
							onChange={handleNominalHueStepChange}
						/>
					</div>
				</div>
			) : null}
		</div>
	)
}
