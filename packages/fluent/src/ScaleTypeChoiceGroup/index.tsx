/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ChoiceGroup,
	IChoiceGroupOption,
	IChoiceGroupStyles,
} from '@fluentui/react'
import { useCallback, useMemo } from 'react'
import { ScaleType } from '@thematic/core'

interface ScaleTypeChoiceGroupProps {
	selectedType: ScaleType
	onChange?: (scaleType: ScaleType) => void
	label?: string
	suppressQuantile?: boolean
	styles?: IChoiceGroupStyles
}

const CHOICE_STYLE = {
	flexContainer: { display: 'flex', justifyContent: 'space-around' },
}

/**
 * Represents a strongly typed ChoiceGroup for selecting thematic ScaleTypes.
 */
export const ScaleTypeChoiceGroup: React.FC<ScaleTypeChoiceGroupProps> = ({
	selectedType,
	onChange,
	label,
	suppressQuantile = false,
	styles,
}) => {
	const style = useMemo(
		() => ({
			...CHOICE_STYLE,
			...styles,
		}),
		[styles],
	)
	const typeOptions = useTypeOptions(suppressQuantile)

	const handleTypeChange = useCallback(
		(_, option) => {
			onChange && onChange(option.key)
		},
		[onChange],
	)

	return (
		<ChoiceGroup
			styles={style}
			label={label}
			options={typeOptions}
			selectedKey={selectedType}
			onChange={handleTypeChange}
		/>
	)
}

function useTypeOptions(suppressQuantile = false): IChoiceGroupOption[] {
	return useMemo(() => {
		const options = [
			{
				key: 'linear',
				text: 'Linear',
			},
			{
				key: 'log',
				text: 'Log',
			},
		]
		if (!suppressQuantile) {
			options.push({
				key: 'quantile',
				text: 'Quantile',
			})
		}
		return options
	}, [suppressQuantile])
}
