/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColor } from '@fluentui/react'
import { ColorPicker as FluentColorPicker, Slider } from '@fluentui/react'
import type { Params } from '@thematic/color'
import { css2hsluv } from '@thematic/color'
import type { CSSProperties, FC } from 'react'
import { useCallback, useMemo } from 'react'

import { useThematicFluent } from '../provider/useThematicFluent.js'
import type { ColorPickerProps } from './ColorPicker.types.js'
import { ColorPickerLayout } from './ColorPicker.types.js'

type PartialParams = Partial<Params>

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
			onChange?.(
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
				accentLuminance: l,
			})
		},
		[updateParams],
	)

	// TODO: debounce sliders so the value can be shown updating
	const handleAccentHueChange = useCallback(
		(v: number) => updateParams({ accentHue: v }),
		[updateParams],
	)
	const handleaccentSaturationChange = useCallback(
		(v: number) => updateParams({ accentSaturation: v }),
		[updateParams],
	)
	const handleAccentLuminanceChange = useCallback(
		(v: number) => updateParams({ accentLuminance: v }),
		[updateParams],
	)
	const handleBackgroundLevelChange = useCallback(
		(v: number) => updateParams({ backgroundLevel: v }),
		[updateParams],
	)
	const handleBackgroundHueShiftChange = useCallback(
		(v: number) => updateParams({ backgroundHueShift: v }),
		[updateParams],
	)
	const handleNominalHueStepChange = useCallback(
		(v: number) => updateParams({ nominalHueStep: v }),
		[updateParams],
	)

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
	const slidersStyles: CSSProperties = useMemo(
		() => ({
			width: 300, // default max width of color picker, so the sliders match
			...styles?.sliders,
		}),
		[styles],
	)
	const sliderStyles: CSSProperties = useMemo(
		() => ({
			marginTop: 8,
			...styles?.slider,
		}),
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
