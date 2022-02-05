import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'
import { connect } from 'react-redux'
import { DownloadLink } from '../DownloadLink'
import { JSONEditor } from '../JSONEditor'
const JSONPaneComponent = ({ scaleItemCount }) => {
	const theme = useThematic()
	const value = useMemo(
		() => theme.toJSON({ scaleItemCount }),
		[theme, scaleItemCount],
	)
	return _jsxs(
		'div',
		{
			style: { width: '100%', height: '90%' },
			children: [
				_jsx(JSONEditor, { value: value }, void 0),
				_jsx(
					DownloadLink,
					{
						filename: `${theme.name}-${theme.variant}.json`,
						blobParts: [JSON.stringify(value, null, 2)],
						styles: { root: { fontSize: '0.5em' } },
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
export const JSONPane = connect(state => ({
	scaleItemCount: state.ui.scaleItemCount,
}))(JSONPaneComponent)
