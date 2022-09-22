/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton, Label } from '@fluentui/react'
import type { Theme } from '@thematic/core'
import type { CSSProperties, FC } from 'react'
import { memo, useCallback, useMemo } from 'react'

import { ColorPicker } from './ColorPicker.js'

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
export const ColorPickerButton: FC<ColorPickerButtonProps> = memo(
	function ColorPickerButton({ onChange, label, styles }) {
		const labelStyle = useMemo(
			() => ({
				paddingTop: 0,
				paddingBottom: 0,
				marginBottom: -3,
				...(styles && styles.label),
			}),
			[styles],
		)
		const handleRender = useCallback(
			() => <ColorPicker onChange={onChange} />,
			[onChange],
		)
		const menuProps = useMemo(
			() => ({
				items: [
					{
						key: 'colorPicker',
						onRender: handleRender,
					},
				],
			}),
			[handleRender],
		)

		return (
			<div style={containerStyle}>
				{label && <Label style={labelStyle}>{label}</Label>}
				<IconButton
					title={label}
					iconProps={iconProps}
					menuProps={menuProps}
					styles={iconStyles}
				/>
			</div>
		)
	},
)

const containerStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
}
const iconProps = {
	iconName: 'CheckBoxFill',
}
const iconStyles = {
	root: {
		width: 48,
	},
}
