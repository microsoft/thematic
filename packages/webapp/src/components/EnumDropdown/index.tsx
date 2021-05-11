/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Dropdown,
	IDropdownOption,
	IDropdownStyles,
	IDropdownStyleProps,
	IStyleFunctionOrObject,
} from '@fluentui/react'
import { useCallback, useState } from 'react'

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
export function EnumDropdown<E>({
	enumeration,
	label,
	selected,
	onChange = () => null,
	styles,
}: EnumDropdownProps<E>): JSX.Element {
	const options = Object.entries(enumeration)
		.filter(m => isNaN(parseInt(m[0])))
		.map(m => ({ key: m[1] as any, text: m[0] }))
	const handleChange = useCallback(
		(e: React.FormEvent, v: IDropdownOption | undefined) => {
			if (v) {
				setSelectedKey(v.key)
				onChange(v.key)
			}
		},
		[onChange],
	)
	const key = enumeration[enumeration[selected]]
	const [selectedKey, setSelectedKey] = useState<string | number>(key)
	return (
		<Dropdown
			label={label}
			options={options}
			selectedKey={selectedKey}
			onChange={handleChange}
			styles={styles}
		/>
	)
}
