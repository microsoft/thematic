/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useChoiceGroupProps } from '@essex/components'
import type { IChoiceGroupOption, IChoiceGroupProps } from '@fluentui/react'
import { merge } from 'lodash-es'
import { useMemo } from 'react'
export function useTypeOptions(suppressQuantile = false): IChoiceGroupOption[] {
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

export function useStyledProps(
	props: IChoiceGroupProps,
	options: IChoiceGroupOption[],
	size: 'small' | 'medium' = 'medium',
) {
	const base = useMemo(
		() =>
			merge(
				{
					styles: {
						// we have a small number of options, so we flex to horizontal layout by default
						flexContainer: { display: 'flex', justifyContent: 'space-around' },
					},
					options,
				},
				props,
			),
		[props, options],
	)
	return useChoiceGroupProps(base, size)
}
