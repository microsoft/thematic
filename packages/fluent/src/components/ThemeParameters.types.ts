/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISliderStyles } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'
import type { CSSProperties } from 'react'

export interface ThemeParametersStyles {
	container?: CSSProperties
	slider?: ISliderStyles
}

export interface ThemeParametersProps {
	onChange?: (params: SchemeParams) => void
	styles?: ThemeParametersStyles
}
