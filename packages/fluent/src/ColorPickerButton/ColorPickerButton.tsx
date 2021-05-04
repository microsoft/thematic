/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton, Label } from '@fluentui/react'
import React, { memo, CSSProperties } from 'react'
import { ColorPicker } from '../ColorPicker'
import { Theme } from '@thematic/core'

export interface ColorPickerButtonStyles {
	label?: CSSProperties
}

export interface ColorPickerButtonProps {
	onChange?: (theme: Theme) => void
	label?: string
	styles?: ColorPickerButtonStyles
}

/**
 * This is a dropdown button that displays a thematic ColorPicker.
 */
export const ColorPickerButton: React.FC<ColorPickerButtonProps> = memo(
	function ColorPickerButton({ onChange, label, styles }) {
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
								onRender: () => <ColorPicker onChange={onChange} />,
							},
						],
					}}
					styles={{
						root: {
							width: 48,
						},
					}}
				/>
			</div>
		)
	},
)
