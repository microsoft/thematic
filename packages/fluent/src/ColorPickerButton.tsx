/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { CSSProperties } from 'react'
import { IconButton, Label } from '@fluentui/react'
import { Theme } from '@thematic/core'
import { ColorPicker } from './ColorPicker'

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
export const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
	onChange,
	label,
	styles,
}) => {
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
}
