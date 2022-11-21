/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useChoiceGroupProps } from '@essex/components'
import type { IChoiceGroupOption, IDropdownOption } from '@fluentui/react'
import { ChoiceGroup } from '@fluentui/react'
import type { Theme } from '@thematic/core'
import { ScaleType } from '@thematic/core'
import {
	ColorPicker,
	ColorPickerButton,
	ScaleDropdown,
	ScaleTypeChoiceGroup,
	useThematicFluent,
} from '@thematic/fluent'
import type { FC } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { useSetTheme } from '../../../../../state/index.js'

export interface FluentControlsComponentProps {
	themeLoaded: (theme: Theme) => void
}

const FluentControlsComponent: FC<FluentControlsComponentProps> = ({
	themeLoaded,
}) => {
	const theme = useThematicFluent()
	const [size, setSize] = useState<'small' | 'medium'>('medium')
	const handleSizeChange = useCallback(
		(_ev?: any, option?: IChoiceGroupOption) =>
			setSize(option?.key as 'small' | 'medium'),
		[],
	)
	const [scale, setScale] = useState<string>('<none>')
	const handleScaleChange = useCallback(
		(_e: any, option: IDropdownOption<any> | undefined) =>
			option && setScale(option.key as string),
		[],
	)
	const [scaleType, setScaleType] = useState<ScaleType>(ScaleType.Linear)
	const handleScaleTypeChange = useCallback(
		(_ev?: any, option?: IChoiceGroupOption) =>
			setScaleType(option?.key as ScaleType),
		[],
	)
	const handlePickerChange = useCallback(
		(t: Theme) => themeLoaded(t),
		[themeLoaded],
	)
	const labelStyle = useMemo(
		() => ({
			fontWeight: 'bold' as const,
			color: theme.palette.themePrimary,
		}),
		[theme],
	)
	const actionStyle = useMemo(
		() => ({
			fontSize: 12,
			fontFamily: 'monospace',
			color: theme.palette.themeTertiary,
		}),
		[theme],
	)
	const controlStyle = useMemo(
		() => ({
			width: size === 'medium' ? 320 : 240,
			padding: 8,
			margin: 8,
		}),
		[size],
	)

	const scaleChoiceSizedProps = useChoiceGroupProps({}, size)
	console.log(scaleChoiceSizedProps)
	return (
		<div
			style={{
				fontSize: 14,
				overflowY: 'scroll',
			}}
		>
			<p>
				The @thematic/fluent package contains a few custom Fluent controls you
				can use in your applications to allow Thematic-specific interactions.
				These components also support a <b>size</b> prop to align with Fluent 9
				sizing, which you can preview here.
			</p>
			<ChoiceGroup
				label="Controls size"
				selectedKey={size}
				options={sizeOptions}
				styles={sizeStyles}
				onChange={handleSizeChange}
			/>
			<div style={controlsStyle}>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ScaleDropdown:</span> a Dropdown that
						pre-loads Thematic scale options.
					</p>
					<ScaleDropdown
						size={size}
						placeholder={'Choose scale'}
						onChange={handleScaleChange}
					/>
					<p style={actionStyle}> onChange: {scale}</p>
				</div>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ScaleTypeChoiceGroup:</span> a ChoiceGroup
						that pre-loads Thematic scale types.
					</p>
					<ScaleTypeChoiceGroup
						{...scaleChoiceSizedProps}
						selectedKey={scaleType}
						onChange={handleScaleTypeChange}
					/>
					<p style={actionStyle}> onChange: {scaleType}</p>
				</div>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ColorPicker:</span> a ColorPicker that
						emits Thematic parameters.
					</p>
					<ColorPicker onChange={handlePickerChange} />
					<p style={actionStyle}> onChange: {theme.palette.themePrimary}</p>
				</div>
				<div style={controlStyle}>
					<p>
						<span style={labelStyle}>ColorPickerButton:</span> a DropdownButton
						that hosts a Thematic ColorPicker.
					</p>
					<ColorPickerButton onChange={handlePickerChange} />
					<p style={actionStyle}> onChange: {theme.palette.themePrimary}</p>
				</div>
			</div>
		</div>
	)
}

export const FluentControls = () => {
	const themeLoaded = useSetTheme()
	return <FluentControlsComponent themeLoaded={themeLoaded} />
}

const controlsStyle = {
	display: 'flex' as const,
	flexDirection: 'row' as const,
	flexWrap: 'wrap' as const,
	justifyContent: 'space-around' as const,
}

const sizeOptions = [
	{ key: 'small', text: 'Small' },
	{ key: 'medium', text: 'Medium' },
]

const sizeStyles = {
	flexContainer: {
		display: 'flex',
		justifyContent: 'center',
		gap: 12,
	},
}
