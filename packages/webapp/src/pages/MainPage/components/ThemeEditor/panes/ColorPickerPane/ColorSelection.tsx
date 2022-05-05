/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { Theme } from '@thematic/core'
import { ColorPicker, ColorPickerLayout } from '@thematic/fluent'
import type { FC } from 'react'

export interface ColorSelectionProps {
	onThemeLoaded: (theme: Theme) => void
}

export const ColorSelection: FC<ColorSelectionProps> = ({ onThemeLoaded }) => {
	return (
		<div className="color-controls-area">
			<ColorPicker
				onChange={onThemeLoaded}
				layout={ColorPickerLayout.SideBySide}
				styles={{ sliders: { width: 400 } }}
			/>
		</div>
	)
}
