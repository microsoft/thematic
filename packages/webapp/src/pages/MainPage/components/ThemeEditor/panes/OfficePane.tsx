/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { OfficeTheme } from '@thematic/core'
import { office } from '@thematic/core'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useMemo } from 'react'

import { DownloadLink } from '../../../../../components/DownloadLink.js'
import { OfficePalette } from './OfficePalette.js'

export const OfficePane: FC = () => {
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
