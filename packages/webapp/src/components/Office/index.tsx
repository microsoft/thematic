/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { office, OfficeTheme } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { FC, useMemo } from 'react'
import { DownloadLink } from '../DownloadLink'
import { OfficePalette } from './OfficePalette'

export const Office: FC = () => {
	const theme = useThematic()
	const ofc = useMemo(() => theme.transform(office) as OfficeTheme, [theme])
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
