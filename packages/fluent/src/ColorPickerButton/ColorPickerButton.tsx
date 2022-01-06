/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton, Label } from '@fluentui/react'
import { Theme } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { memo, CSSProperties, FC } from 'react'
import { ColorPicker } from '../ColorPicker'

export interface ColorPickerButtonStyles {
	label?: CSSProperties
}

export interface ColorPickerButtonProps {
	onChange?: (theme: Theme) => void
	theme?: Theme
	label?: string
	styles?: ColorPickerButtonStyles
}

/**
 * This is a dropdown button that displays a thematic ColorPicker.
 */
export const ColorPickerButton: FC<ColorPickerButtonProps> = memo(
	function ColorPickerButton({ onChange, theme, label, styles }) {
		const contextTheme = useThematic()
		const activeTheme = theme || contextTheme
		const labelStyle = {
			paddingTop: 0,
			paddingBottom: 0,
			marginBottom: -3,
			...(styles && styles.label),
		}
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{label && <Label style={labelStyle}>{label}</Label>}
				<IconButton
					title={label}
					iconProps={{
						iconName: 'CheckBoxFill',
					}}
					menuProps={{
						items: [
							{
								key: 'colorPicker',
								// eslint-disable-next-line react/display-name
								onRender: () => (
									<ColorPicker theme={theme} onChange={onChange} />
								),
							},
						],
					}}
					styles={{
						root: {
							width: 48,
						},
						icon: {
							color: activeTheme.application().accent().hex(),
						},
					}}
				/>
			</div>
		)
	},
)
