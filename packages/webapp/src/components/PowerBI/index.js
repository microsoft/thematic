import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { powerbi } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'
import { DownloadLink } from '../DownloadLink'
import { PowerBIPalette } from './PowerBIPalette'
export const PowerBiEditor = () => {
	const theme = useThematic()
	const pbi = useMemo(() => theme.transform(powerbi), [theme])
	const str = useMemo(() => JSON.stringify(pbi, null, 2), [pbi])
	return _jsxs(
		'div',
		{
			children: [
				_jsx(PowerBIPalette, { colors: pbi }, void 0),
				_jsx(
					DownloadLink,
					{
						filename: `${theme.name}-${theme.variant}-powerbi.json`,
						blobParts: [str],
						styles: { root: { fontSize: '0.5em' } },
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
