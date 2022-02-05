import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { loadFluentTheme } from '@thematic/fluent'
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'
import { DownloadLink } from '../DownloadLink'
import { FluentPalette } from './FluentPalette'
/**
 * This component hosts the Fluent Theme slots in the style of Thematic.
 * A running version can be found here: https://aka.ms/themedesigner
 */
export const FluentViewer = () => {
	const theme = useThematic()
	const fluentTheme = useMemo(() => loadFluentTheme(theme), [theme])
	const value = useMemo(
		() => JSON.stringify(fluentTheme.toFluent(), null, 2),
		[fluentTheme],
	)
	return _jsxs(
		'div',
		{
			children: [
				_jsx(FluentPalette, { theme: fluentTheme }, void 0),
				_jsx(
					DownloadLink,
					{
						filename: `${theme.name}-${theme.variant}-fluent.json`,
						blobParts: [value],
						styles: { root: { fontSize: '0.5em' } },
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
