import { jsx as _jsx } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Link } from '@fluentui/react'
export const DownloadLink = ({
	filename,
	blobParts,
	options,
	label,
	styles,
}) => {
	const blob = new Blob(blobParts, options)
	const url = URL.createObjectURL(blob)
	const lbl = label || `Download ${filename}`
	return _jsx(
		Link,
		{
			styles: styles,
			title: lbl,
			href: url,
			download: filename,
			children: lbl,
		},
		void 0,
	)
}
