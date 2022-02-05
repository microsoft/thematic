/// <reference types="react" />
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ICommandBarStyleProps,
	ICommandBarStyles,
	IStyleFunctionOrObject,
} from '@fluentui/react'
export interface WrapperStyles {
	root: React.CSSProperties
	label: React.CSSProperties
}
export interface EnumButtonBarProps<E> {
	enumeration: any
	selected?: E
	onChange?: (selected: string | number) => void
	wrapperStyles?: WrapperStyles
	commandBarStyles?: IStyleFunctionOrObject<
		ICommandBarStyleProps,
		ICommandBarStyles
	>
	iconNames?: string[]
	iconOnly?: boolean
	label?: string
}
export declare function EnumButtonBar<E>({
	enumeration,
	selected,
	onChange,
	wrapperStyles,
	commandBarStyles,
	iconNames,
	iconOnly,
	label,
}: EnumButtonBarProps<E>): JSX.Element
