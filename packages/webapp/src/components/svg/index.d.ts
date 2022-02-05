/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, ReactNode } from 'react'
export interface MarkProps {
	children: ReactNode
	size: number
}
export interface ThemedMarkProps {
	config: any
	size: number
}
export declare const Rect: FC<ThemedMarkProps>
export declare const Circle: FC<ThemedMarkProps>
export declare const Line: FC<ThemedMarkProps>
export declare const Arc: FC<ThemedMarkProps>
export declare const Text: FC<ThemedMarkProps>
