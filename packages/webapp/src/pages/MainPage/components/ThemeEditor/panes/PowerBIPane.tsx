/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { PowerBITheme } from '@thematic/core'
import { powerbi } from '@thematic/core'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useMemo } from 'react'

import { DownloadLink } from '../../../../../components/DownloadLink.js'
import { PowerBIPalette } from './PowerBIPalette.js'

export const PowerBIPane: FC = () => {
	const theme = useThematic()
	const pbi = useMemo(() => theme.transform(powerbi) as PowerBITheme, [theme])
	const str = useMemo(() => JSON.stringify(pbi, null, 2), [pbi])
	return (
		<div>
			<PowerBIPalette colors={pbi} />
			<DownloadLink
				filename={`${theme.name}-${theme.variant}-powerbi.json`}
				blobParts={[str]}
				styles={{ root: { fontSize: '0.5em' } }}
			/>
		</div>
	)
}
