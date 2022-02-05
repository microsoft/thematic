/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC } from 'react'
export interface ColorBandProps {
	colors: string[]
	foreground: string
	label: string
	width: number
}
export declare const ColorBand: FC<ColorBandProps>
