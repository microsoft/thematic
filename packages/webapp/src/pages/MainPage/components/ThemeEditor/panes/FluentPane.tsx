/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { loadFluentTheme } from '@thematic/fluent'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useMemo } from 'react'

import { DownloadLink } from '../../../../../components/DownloadLink.js'
import { FluentPalette } from './FluentPalette.js'

/**
 * This component hosts the Fluent Theme slots in the style of Thematic.
 * A running version can be found here: https://aka.ms/themedesigner
 */
export const FluentPane: FC = () => {
	const theme = useThematic()
	const fluentTheme = useMemo(() => loadFluentTheme(theme), [theme])
	const value = useMemo(
		() => JSON.stringify(fluentTheme.toFluent(), null, 2),
		[fluentTheme],
	)
	return (
		<div>
			<FluentPalette theme={fluentTheme} />
			<DownloadLink
				filename={`${theme.name}-${theme.variant}-fluent.json`}
				blobParts={[value]}
				styles={{ root: { fontSize: '0.5em' } }}
			/>
		</div>
	)
}
