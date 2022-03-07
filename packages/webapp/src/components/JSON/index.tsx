/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useScaleItemCount } from '../../state'
import { DownloadLink } from '../DownloadLink'
import { JSONEditor } from '../JSONEditor'

export interface JSONPaneProps {
	scaleItemCount?: number
}

const JSONPaneComponent: FC<JSONPaneProps> = ({ scaleItemCount }) => {
	const theme = useThematic()
	const value = useMemo(
		() => theme.toJSON({ scaleItemCount }),
		[theme, scaleItemCount],
	)
	const blobParts = useMemo(() => [JSON.stringify(value, null, 2)], [value])
	return (
		<div style={{ width: '100%', height: '90%' }}>
			<JSONEditor value={value} />
			<DownloadLink
				filename={`${theme.name}-${theme.variant}.json`}
				blobParts={blobParts}
				styles={{ root: { fontSize: '0.5em' } }}
			/>
		</div>
	)
}

export const JSONPane = () => {
	const [scaleItemCount] = useScaleItemCount()
	return <JSONPaneComponent scaleItemCount={scaleItemCount} />
}
