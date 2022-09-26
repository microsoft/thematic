/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme } from '@thematic/core'
import type { CSSProperties } from 'react'

export interface ColorPickerButtonStyles {
	label?: CSSProperties
}

export interface ColorPickerButtonProps {
	onChange?: (theme: Theme) => void
	label?: string
	styles?: ColorPickerButtonStyles
}
