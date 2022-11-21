/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SchemeParams } from '@thematic/color'
import type { CSSProperties } from 'react'

export interface ColorPickerButtonStyles {
	label?: CSSProperties
}

export interface ColorPickerButtonProps {
	onChange?: (params: SchemeParams) => void
	label?: string
	styles?: ColorPickerButtonStyles
}
