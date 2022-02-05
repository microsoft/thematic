/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC } from 'react'
export interface ColorStripProps {
	colors: string[]
	labelColors?: string[]
	foreground: string
	background: string
	label: string
}
export declare const ColorStrip: FC<ColorStripProps>
