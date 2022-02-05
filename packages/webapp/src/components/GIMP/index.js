import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TextField } from '@fluentui/react'
import { gimp } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'
import { DownloadLink } from '../DownloadLink'
// the deep nesting of the component requires several layers of size adjustment
const styles = {
	root: {
		width: '100%',
		height: '90%',
	},
	wrapper: {
		height: '100%',
	},
	fieldGroup: {
		height: '100%',
	},
	field: {
		height: '100%',
		fontFamily: 'monospace',
		fontSize: 11,
	},
}
export const GimpEditor = () => {
	const theme = useThematic()
	const value = useMemo(() => theme.transform(gimp), [theme])
	return _jsxs(
		'div',
		{
			style: { width: '100%' },
			children: [
				_jsx(
					TextField,
					{ styles: styles, multiline: true, readOnly: true, value: value },
					void 0,
				),
				_jsx(
					DownloadLink,
					{
						filename: `${theme.name}-${theme.variant}.gpl`,
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
