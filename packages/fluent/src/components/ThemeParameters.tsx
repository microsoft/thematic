/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useSliderProps } from '@essex/components'
import type { ISliderProps } from '@fluentui/react'
import { Slider } from '@fluentui/react'
import { merge } from 'lodash-es'
import type { CSSProperties, FC } from 'react'
import { useMemo } from 'react'

import { useThematicFluent } from '../provider/useThematicFluent.js'
import { useSliderChange } from './ThemeParameters.hooks.js'
import {
	defaultSliderStyles,
	sectionStyle,
	useContainerStyle,
	useSectionHeaderStyle,
} from './ThemeParameters.styles.js'
import type { ThemeParametersProps } from './ThemeParameters.types.js'

/**
 * This is a simple ThemeParameters control that you can show users, allowing them to tune core theme parameters.
 * It does not expose the background and nominal step properties, but may do so in the future.
 */
export const ThemeParameters: FC<ThemeParametersProps> = ({
	onChange,
	styles,
}) => {
	const theme = useThematicFluent()

	const {
		accentHue,
		accentSaturation,
		accentLightness,
		scaleSaturation,
		scaleLightness,
		greyHue,
		greySaturation,
	} = theme.params

	const handleAccentHueChange = useSliderChange('accentHue', theme, onChange)
	const handleAccentSaturationChange = useSliderChange(
		'accentSaturation',
		theme,
		onChange,
	)
	const handleAccentLightnessChange = useSliderChange(
		'accentLightness',
		theme,
		onChange,
	)
	const handleScaleSaturationChange = useSliderChange(
		'scaleSaturation',
		theme,
		onChange,
	)
	const handleScaleLightnessChange = useSliderChange(
		'scaleLightness',
		theme,
		onChange,
	)
	const handleGreyHueChange = useSliderChange('greyHue', theme, onChange)
	const handleGreySaturationChange = useSliderChange(
		'greySaturation',
		theme,
		onChange,
	)

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
	)
}
