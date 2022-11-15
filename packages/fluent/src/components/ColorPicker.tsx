/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColor, ISliderStyles } from '@fluentui/react'
import { ColorPicker as FluentColorPicker, Slider } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'
import { css2hsluv } from '@thematic/color'
import merge from 'lodash-es/merge.js'
import type { CSSProperties, FC } from 'react'
import { useCallback, useMemo } from 'react'

import { useThematicFluent } from '../provider/useThematicFluent.js'
import { useSliderChange } from './ColorPicker.hooks.js'
import type { ColorPickerProps } from './ColorPicker.types.js'
import { ColorPickerLayout } from './ColorPicker.types.js'

type PartialParams = Partial<SchemeParams>

/**
 * This is a simple ColorPicker that you can show users, allowing them to choose a custom accent color.
 * It does not expose the background and nominal step properties, but may do so in the future.
 * At the moment it isn't much different than a regular color picker, but exists to wrap up the theme
 * parameterization and leave room for additional functionality.
 * Note also that it does NOT expose an alpha control, because this is not allowed in thematic params.
 */
export const ColorPicker: FC<ColorPickerProps> = ({
	onChange,
	layout,
	styles,
}) => {
	const theme = useThematicFluent()

	const lyt = layout || ColorPickerLayout.PickerOnly

	const updateParams = useCallback(
		(params: PartialParams) => {
			onChange &&
				onChange(
					theme.clone({
						params: {
							...theme.params,
							...params,
						},
					}),
				)
		},
		[theme, onChange],
	)

	const handlePickerChange = useCallback(
		(_ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
			const [h, s, l] = css2hsluv(color.hex)
			updateParams({
				accentHue: h,
				accentSaturation: s,
				accentLightness: l,
			})
		},
		[updateParams],
	)

	// TODO: debounce sliders so the value can be shown updating
	const handleAccentHueChange = useSliderChange('accentHue', updateParams)
	const handleAccentSaturationChange = useSliderChange(
		'accentSaturation',
		updateParams,
	)
	const handleAccentLightnessChange = useSliderChange(
		'accentLightness',
		updateParams,
	)
	const handleScaleSaturationChange = useSliderChange(
		'scaleSaturation',
		updateParams,
	)
	const handleScaleLightnessChange = useSliderChange(
		'scaleLightness',
		updateParams,
	)
	const handleGreyHueChange = useSliderChange('greyHue', updateParams)
	const handleGreySaturationChange = useSliderChange(
		'greySaturation',
		updateParams,
	)

	const {
		accentHue,
		accentSaturation,
		accentLightness,
		scaleSaturation,
		scaleLightness,
		greyHue,
		greySaturation,
	} = theme.params

	const slidersStyles: CSSProperties = useMemo(
		() => ({
			width: 300, // default max width of color picker, so the sliders match
			...(styles && styles.sliders),
		}),
		[styles],
	)
	const sliderStyles: ISliderStyles = useMemo(
		() =>
			merge(
				{
					root: {
						marginTop: 8,
						textAlign: 'left',
					},
					valueLabel: {
						margin: 0,
						padding: 0,
					},
				},
				styles && styles.slider,
			),
		[styles],
	)
	const color = useMemo(() => theme.palette.themePrimary, [theme])
	return (
		<div style={{ display: 'flex' }}>
			<FluentColorPicker
				color={color}
				onChange={handlePickerChange}
				alphaType="none"
			/>
			{lyt === ColorPickerLayout.SideBySide ? (
				<div style={slidersStyles}>
					<Slider
						label="Accent hue"
						value={accentHue}
						min={0}
						max={360}
						step={1}
						onChange={handleAccentHueChange}
						styles={sliderStyles}
					/>
					<Slider
						label="Accent saturation"
						value={accentSaturation}
						min={0}
						max={100}
						step={1}
						onChange={handleAccentSaturationChange}
						styles={sliderStyles}
					/>
					<Slider
						label="Accent lightness"
						value={accentLightness}
						min={0}
						max={100}
						step={1}
						onChange={handleAccentLightnessChange}
						styles={sliderStyles}
					/>
					<div style={pairFlexStyle}>
						<div style={pairStyle}>
							<Slider
								label="Scale saturation"
								value={scaleSaturation}
								min={0}
								max={100}
								step={1}
								onChange={handleScaleSaturationChange}
								styles={sliderStyles}
							/>
						</div>
						<div style={pairStyle}>
							<Slider
								label="Scale lightness"
								value={scaleLightness}
								min={0}
								max={100}
								step={1}
								onChange={handleScaleLightnessChange}
								styles={sliderStyles}
							/>
						</div>
					</div>
					<div style={pairFlexStyle}>
						<div style={pairStyle}>
							<Slider
								label="Grey hue"
								value={greyHue}
								min={0}
								max={360}
								step={1}
								onChange={handleGreyHueChange}
								styles={sliderStyles}
							/>
						</div>
						<div style={pairStyle}>
							<Slider
								label="Grey saturation"
								value={greySaturation}
								min={0}
								max={100}
								step={1}
								onChange={handleGreySaturationChange}
								styles={sliderStyles}
							/>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

const pairFlexStyle = {
	display: 'flex',
}

const pairStyle = {
	width: '50%',
}
