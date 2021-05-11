/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { connect } from 'react-redux'
import { DownloadLink } from '../DownloadLink'
import { JSONEditor } from '../JSONEditor'
import { useThematic } from '@thematic/react'

interface JSONPaneProps {
	scaleItemCount?: number
}

const JSONPaneComponent: React.FC<JSONPaneProps> = ({ scaleItemCount }) => {
	const theme = useThematic()
	const value = useMemo(() => theme.toJSON({ scaleItemCount }), [
		theme,
		scaleItemCount,
	])
	return (
		<div style={{ width: '100%', height: '90%' }}>
			<JSONEditor value={value} />
			<DownloadLink
				filename={`${theme.name}-${theme.variant}.json`}
				blobParts={[JSON.stringify(value, null, 2)]}
				styles={{ root: { fontSize: '0.5em' } }}
			/>
		</div>
	)
}

export const JSONPane = connect((state: any) => ({
	scaleItemCount: state.ui.scaleItemCount,
}))(JSONPaneComponent)
