/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	IDropdownStyles,
	IDropdownStyleProps,
	IStyleFunctionOrObject,
} from '@fluentui/react'
export interface EnumDropdownProps<E> {
	enumeration: any
	label?: string
	selected?: E
	onChange?: (selected: string | number) => void
	styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>
}
/**
 * This component wraps a Fluent Dropdown, automatically creating the options from a supplied enum.
 * https://developer.microsoft.com/en-us/fluentui#/controls/web/dropdown
 * TODO: add additional passthrough props. We really just override the options array and the onChange callback.
 */
export declare function EnumDropdown<E>({
	enumeration,
	label,
	selected,
	onChange,
	styles,
}: EnumDropdownProps<E>): JSX.Element
