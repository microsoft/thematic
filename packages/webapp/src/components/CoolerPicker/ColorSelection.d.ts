/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme } from '@thematic/core'
import { FC } from 'react'
import './index.css'
export interface ColorSelectionProps {
	onThemeLoaded: (theme: Theme) => void
}
export declare const ColorSelection: FC<ColorSelectionProps>
