/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { CSSProperties, FC } from 'react'
import './index.css'
export interface ColorStripProps {
	colorDefinitions: any[]
	vertical?: boolean
	swatchStyle?: CSSProperties
	labelStyle?: CSSProperties
}
export declare const ColorStrip: FC<ColorStripProps>
