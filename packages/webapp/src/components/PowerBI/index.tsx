/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { useMemo } from 'react'
import { powerbi } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { DownloadLink } from '../DownloadLink'
import { PowerBIPalette } from './PowerBIPalette'

export const PowerBiEditor: React.FC = () => {
	const theme = useThematic()
	const pbi = useMemo(() => theme.transform(powerbi), [theme])
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
