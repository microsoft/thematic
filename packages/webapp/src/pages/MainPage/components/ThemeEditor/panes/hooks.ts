/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematicFluent } from '@thematic/fluent';
import { useMemo } from 'react';

export function useStyles() {
	const theme = useThematicFluent();
	return useMemo(
		() => ({
			root: {
				display: 'flex',
			},
			swatch: {
				border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
			},
			header: {
				color: theme.palette.neutralPrimary,
				fontSize: 14,
			},
		}),
		[theme],
	);
}
