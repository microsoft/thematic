/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useSliderProps } from '@essex/components'
import type { ISliderProps } from '@fluentui/react'
import { ColorPicker as FluentColorPicker, Slider } from '@fluentui/react'
import { merge } from 'lodash-es'
import type { CSSProperties, FC } from 'react'
import { useMemo } from 'react'

import { useThematicFluent } from '../provider/useThematicFluent.js'
import {
	useParams,
	usePickerChange,
	useSliderChange,
} from './ColorPicker.hooks.js'
import {
	defaultSliderStyles,
	useContainerStyle,
	useSectionHeaderStyle,
} from './ColorPicker.styles.js'
import type { ColorPickerProps } from './ColorPicker.types.js'
import { ColorPickerLayout } from './ColorPicker.types.js'

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

	const { params, updateParams } = useParams(theme, onChange)

	const {
		accentHue,
		accentSaturation,
		accentLightness,
		scaleSaturation,
		scaleLightness,
		greyHue,
		greySaturation,
	} = params

	const handlePickerChange = usePickerChange(updateParams)

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

	const lyt = layout || ColorPickerLayout.PickerOnly
	const containerStyle: CSSProperties = useContainerStyle(styles?.container)
	const defaultSliderProps = useMemo(
		() => merge({ styles: defaultSliderStyles }, styles?.slider),
		[styles],
	)
	const sliderBaseProps: ISliderProps = useSliderProps(
		defaultSliderProps,
		'small',
	)
	const sectionHeaderStyle = useSectionHeaderStyle()

	return (
		<div style={{ display: 'flex' }}>
			<FluentColorPicker
				color={theme.palette.themePrimary}
				onChange={handlePickerChange}
				alphaType="none"
			/>
			{lyt === ColorPickerLayout.SideBySide ? (
				<div style={containerStyle}>
					<div style={sectionStyle}>
						<div style={sectionHeaderStyle}>Accent color</div>
						<Slider
							{...sliderBaseProps}
							label="Hue"
							value={accentHue}
							min={0}
							max={360}
							step={1}
							onChange={handleAccentHueChange}
						/>

						<Slider
							{...sliderBaseProps}
							label="Saturation"
							value={accentSaturation}
							min={0}
							max={100}
							step={1}
							onChange={handleAccentSaturationChange}
						/>
						<Slider
							{...sliderBaseProps}
							label="Lightness"
							value={accentLightness}
							min={0}
							max={100}
							step={1}
							onChange={handleAccentLightnessChange}
						/>
					</div>
					<div style={sectionStyle}>
						<div style={sectionHeaderStyle}>Scale brightness</div>
						<Slider
							{...sliderBaseProps}
							label="Saturation"
							value={scaleSaturation}
							min={0}
							max={100}
							step={1}
							onChange={handleScaleSaturationChange}
						/>
						<Slider
							{...sliderBaseProps}
							label="Lightness"
							value={scaleLightness}
							min={0}
							max={100}
							step={1}
							onChange={handleScaleLightnessChange}
						/>
					</div>
					<div style={sectionStyle}>
						<div style={sectionHeaderStyle}>Grey tint</div>
						<Slider
							{...sliderBaseProps}
							label="Hue"
							value={greyHue}
							min={0}
							max={360}
							step={1}
							onChange={handleGreyHueChange}
						/>
						<Slider
							{...sliderBaseProps}
							label="Saturation"
							value={greySaturation}
							min={0}
							max={100}
							step={1}
							onChange={handleGreySaturationChange}
						/>
					</div>
				</div>
			) : null}
		</div>
	)
}

const sectionStyle = {
	textAlign: 'left' as const,
}
