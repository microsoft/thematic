/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	ICommandBarItemProps,
	ICommandBarStyleProps,
	ICommandBarStyles,
	IStyleFunctionOrObject,
} from '@fluentui/react'
import { CommandBar } from '@fluentui/react'
import { useCallback, useMemo } from 'react'

export interface EnumButtonBarProps<E> {
	enumeration: any
	selected?: E
	onChange?: (selected: string | number) => void
	styles?: IStyleFunctionOrObject<ICommandBarStyleProps, ICommandBarStyles>
	/**
	 * List of icons for each enum option. Must match the indices of the enum entries.
	 */
	iconNames?: string[]
	iconOnly?: boolean
}

const splitCamel = (str: string) => str.replace(/([a-z\d])([A-Z])/g, '$1 $2')

export function EnumButtonBar<E>({
	enumeration,
	selected,
	onChange,
	styles,
	iconNames,
	iconOnly,
}: EnumButtonBarProps<E>): JSX.Element {
	const selectedKey = enumeration[enumeration[selected]]

	const handleChange = useCallback(
		(s: string | number) => onChange && onChange(s),
		[onChange],
	)

	const options = useMemo<ICommandBarItemProps[]>(
		() =>
			Object.entries(enumeration)
				.filter(m => isNaN(parseInt(m[0]))) // only keep the int copy from the enum obj
				.map((m, i) => {
					const key = m[1] as string
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

	const rootStyle = useMemo(
		() => ({
			// TODO: this width is used to prevent automatic collapsing with overflow items
			// it may not be what we always want, however
			width: options.length * 46.75,
		}),
		[options],
	)
	return (
		<div style={rootStyle}>
			<CommandBar items={options} styles={styles} />
		</div>
	)
}
