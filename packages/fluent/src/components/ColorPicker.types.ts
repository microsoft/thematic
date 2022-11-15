/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISliderStyles } from '@fluentui/react'
import type { Theme } from '@thematic/core'
import type { CSSProperties } from 'react'

export enum ColorPickerLayout {
	PickerOnly = 'pickeronly',
	SideBySide = 'sidebyside',
}

export interface ColorPickerStyles {
	sliders?: CSSProperties
	slider?: ISliderStyles
}

export interface ColorPickerProps {
	onChange?: (theme: Theme) => void
	layout?: ColorPickerLayout
	styles?: ColorPickerStyles
}
