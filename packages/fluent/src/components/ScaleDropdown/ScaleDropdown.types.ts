/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption, IDropdownProps } from '@fluentui/react';
import type { ContinuousColorScaleFunction, NominalColorScaleFunction } from '@thematic/core';

export type ScaleDropdownProps = Omit<IDropdownProps, 'options'>;

export interface ScaleDropdownItemProps {
	option: IDropdownOption;
	paletteWidth: number;
	paletteHeight: number;
	style?: React.CSSProperties;
}

export interface ChipsProps {
	scale: ContinuousColorScaleFunction | NominalColorScaleFunction;
	width?: number;
	height?: number;
	maxItems?: number;
}
