import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { CommandBar, Label } from '@fluentui/react'
import { useThematic } from '@thematic/react'
import { useCallback, useMemo } from 'react'
const splitCamel = str => str.replace(/([a-z\d])([A-Z])/g, '$1 $2')
export function EnumButtonBar({
	enumeration,
	selected,
	onChange,
	wrapperStyles,
	commandBarStyles,
	iconNames,
	iconOnly,
	label,
}) {
	const theme = useThematic()
	const selectedKey = enumeration[enumeration[selected]]
	const handleChange = useCallback(
		s => {
			if (onChange) {
				onChange(s)
			}
		},
		[onChange],
	)
	const options = useMemo(
		() =>
			Object.entries(enumeration)
				.filter(m => isNaN(parseInt(m[0]))) // only keep the int copy from the enum obj
				.map((m, i) => {
					const key = m[1]
					const text = splitCamel(m[0])
					return {
						key,
						text,
						checked: selectedKey === key,
						iconProps: iconNames ? { iconName: iconNames[i] } : undefined,
						iconOnly,
						onClick: () => handleChange(key),
					}
				}),
		[enumeration, handleChange, iconNames, iconOnly, selectedKey],
	)
	const rootStyle = {
		// TODO: this width is used to prevent automatic collapsing with overflow items
		// it may not be what we always want, however
		width: options.length * 46.75,
		...(wrapperStyles ? wrapperStyles.root : {}),
	}
	const labelStyle = {
		...(wrapperStyles ? wrapperStyles.label : {}),
	}
	const commandStyles = {
		primarySet: {
			border: `1px solid ${theme.application().border().hex()}`,
			paddingleft: 0,
			paddingRight: 0,
		},
		...commandBarStyles,
	}
	return _jsxs(
		'div',
		{
			style: rootStyle,
			children: [
				label && _jsx(Label, { style: labelStyle, children: label }, void 0),
				_jsx(CommandBar, { items: options, styles: commandStyles }, void 0),
			],
		},
		void 0,
	)
}
