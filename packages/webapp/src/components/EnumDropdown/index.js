import { jsx as _jsx } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dropdown } from '@fluentui/react'
import { useCallback, useState } from 'react'
/**
 * This component wraps a Fluent Dropdown, automatically creating the options from a supplied enum.
 * https://developer.microsoft.com/en-us/fluentui#/controls/web/dropdown
 * TODO: add additional passthrough props. We really just override the options array and the onChange callback.
 */
export function EnumDropdown({
	enumeration,
	label,
	selected,
	onChange = () => null,
	styles,
}) {
	const options = Object.entries(enumeration)
		.filter(m => isNaN(parseInt(m[0])))
		.map(m => ({ key: m[1], text: m[0] }))
	const handleChange = useCallback(
		(e, v) => {
			if (v) {
				setSelectedKey(v.key)
				onChange(v.key)
			}
		},
		[onChange],
	)
	const key = enumeration[enumeration[selected]]
	const [selectedKey, setSelectedKey] = useState(key)
	return _jsx(
		Dropdown,
		{
			label: label,
			options: options,
			selectedKey: selectedKey,
			onChange: handleChange,
			styles: styles,
		},
		void 0,
	)
}
