/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IChoiceGroupOption } from '@fluentui/react';
import { ChoiceGroup } from '@fluentui/react';
import type { ScaleType } from '@thematic/core';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';

import type { ScaleTypeChoiceGroupProps } from './ScaleTypeChoiceGroup.types.js';

const CHOICE_STYLE = {
	flexContainer: { display: 'flex', justifyContent: 'space-around' },
};

/**
 * Represents a strongly typed ChoiceGroup for selecting thematic ScaleTypes.
 */
export const ScaleTypeChoiceGroup: FC<ScaleTypeChoiceGroupProps> = ({
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
	);
	const typeOptions = useTypeOptions(suppressQuantile);

	const handleTypeChange = useCallback(
		(_: any, option: IChoiceGroupOption | undefined) => {
			onChange && option && onChange(option.key as ScaleType);
		},
		[onChange],
	);

	return (
		<ChoiceGroup
			styles={style}
			label={label}
			options={typeOptions}
			selectedKey={selectedType}
			onChange={handleTypeChange}
		/>
	);
};

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
		];
		if (!suppressQuantile) {
			options.push({
				key: 'quantile',
				text: 'Quantile',
			});
		}
		return options;
	}, [suppressQuantile]);
}
