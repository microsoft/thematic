/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IChoiceGroupStyles } from '@fluentui/react';
import type { ScaleType } from '@thematic/core';

export interface ScaleTypeChoiceGroupProps {
	selectedType: ScaleType;
	onChange?: (scaleType: ScaleType) => void;
	label: string;
	suppressQuantile?: boolean;
	styles?: IChoiceGroupStyles;
}
