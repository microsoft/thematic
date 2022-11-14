/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react';

import { FluentTheme } from '../FluentTheme.js';
import type { FluentTheme as IFluentTheme } from '../types.js';
import { ThematicFluentContext } from './ThematicFluentContext.js';

/**
 * Hook to retrieve the thematic theme directly.
 */
export function useThematicFluent(dark?: boolean): IFluentTheme {
	const theme = useContext(ThematicFluentContext);
	if (dark) {
		return new FluentTheme(theme.toDark());
	}
	return theme;
}
