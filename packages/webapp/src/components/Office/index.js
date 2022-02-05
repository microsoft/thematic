import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { office } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'
import { DownloadLink } from '../DownloadLink'
import { OfficePalette } from './OfficePalette'
export const Office = () => {
	const theme = useThematic()
	const ofc = useMemo(() => theme.transform(office), [theme])
	const str = useMemo(() => JSON.stringify(ofc, null, 2), [ofc])
	return _jsxs(
		'div',
		{
			children: [
				_jsx(OfficePalette, { colors: ofc }, void 0),
				_jsx(
					DownloadLink,
					{
						filename: `${theme.name}-${theme.variant}-office.json`,
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
