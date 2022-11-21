/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ColorPicker as FluentColorPicker } from '@fluentui/react'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'

import { usePickerChange } from './ColorPicker.hooks.js'
import type { ColorPickerProps } from './ColorPicker.types.js'

/**
 * This is a simple ColorPicker that you can show users, allowing them to choose a custom accent color.
 * It does not expose the background and nominal step properties, but may do so in the future.
 * At the moment it isn't much different than a regular color picker, but exists to wrap up the theme
 * parameterization and leave room for additional functionality.
 * Note also that it does NOT expose an alpha control, because this is not allowed in thematic params.
 */
export const ColorPicker: FC<ColorPickerProps> = ({ onChange, ...props }) => {
	const theme = useThematic()
	const handlePickerChange = usePickerChange(theme, onChange)
	return (
		<FluentColorPicker
			{...props}
			color={theme.application().accent().hex()}
			onChange={handlePickerChange}
			alphaType="none"
		/>
	)
}
