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
import { CommandBar, Label } from '@fluentui/react'
import { useThematic } from '@thematic/react'
import { useCallback, useMemo } from 'react'

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

const splitCamel = (str: string) => str.replace(/([a-z\d])([A-Z])/g, '$1 $2')

export function EnumButtonBar<E>({
	enumeration,
	selected,
	onChange,
	wrapperStyles,
	commandBarStyles,
	iconNames,
	iconOnly,
	label,
}: EnumButtonBarProps<E>): JSX.Element {
	const theme = useThematic()
	const selectedKey = enumeration[enumeration[selected]]

	const handleChange = useCallback(
		(s: string) => {
			if (onChange) {
				onChange(s)
			}
		},
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
			...(wrapperStyles ? wrapperStyles.root : {}),
		}),
		[wrapperStyles, options],
	)

	const labelStyle = useMemo(
		() => ({
			...(wrapperStyles ? wrapperStyles.label : {}),
		}),
		[wrapperStyles],
	)
	const commandStyles = useMemo(
		() => ({
			primarySet: {
				border: `1px solid ${theme.application().border().hex()}`,
				paddingleft: 0,
				paddingRight: 0,
			},
			...commandBarStyles,
		}),
		[theme, commandBarStyles],
	)
	return (
		<div style={rootStyle}>
			{label && <Label style={labelStyle}>{label}</Label>}
			<CommandBar items={options} styles={commandStyles} />
		</div>
	)
}
