/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { useMemo } from 'react'
import { useThematic } from '@thematic/react'
import { OfficePalette } from './OfficePalette'
import { DownloadLink } from '../DownloadLink'
import { office } from '@thematic/core'
export const Office: React.FC = () => {
	const theme = useThematic()
	const ofc = useMemo(() => theme.transform(office), [theme])
	const str = useMemo(() => JSON.stringify(ofc, null, 2), [ofc])
	return (
		<div>
			<OfficePalette colors={ofc} />
			<DownloadLink
				filename={`${theme.name}-${theme.variant}-office.json`}
				blobParts={[str]}
				styles={{ root: { fontSize: '0.5em' } }}
			/>
		</div>
	)
}
