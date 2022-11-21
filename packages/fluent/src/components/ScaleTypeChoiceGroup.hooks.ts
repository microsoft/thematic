/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	IChoiceGroupOption,
	IChoiceGroupStyleProps,
	IChoiceGroupStyles,
	IStyleFunctionOrObject,
} from '@fluentui/react'
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

export function useStyles(
	styles?: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>,
): IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles> {
	return useMemo(
		() =>
			merge(
				{
					// we have a small number of options, so we flex to horizontal layout by default
					flexContainer: { display: 'flex', justifyContent: 'space-around' },
				},
				styles,
			),
		[styles],
	)
}
