/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Application, Theme } from '@thematic/core'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useMemo } from 'react'

import { ColorStrip } from '../../../../../components/ColorStrip.js'

const applicationPrimaryKeys = ['accent', 'foreground', 'background', 'border']
const applicationSignalKeys = ['success', 'warning', 'error']
const applicationLowKeys = ['faint', 'lowContrast', 'lowMidContrast']
const applicationHighKeys = ['midContrast', 'midHighContrast', 'highContrast']

export const ApplicationPalette: FC = () => {
	const theme = useThematic()
	const primaries = useColors(applicationPrimaryKeys, theme)
	const signals = useColors(applicationSignalKeys, theme)
	const secondaries = useColors(applicationLowKeys, theme)
	const elements = useColors(applicationHighKeys, theme)
	const styles = useMemo(
		() => ({
			swatch: {
				border: `1px solid ${theme.application().border().hex()}`,
			},
			label: {
				width: 80,
			},
		}),
		[theme],
	)
	return (
		<div className="application-palette">
			<ColorStrip
				vertical
				colorDefinitions={primaries}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={signals}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={secondaries}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={elements}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
		</div>
	)
}

function useColors(keys: string[], theme: Theme) {
	return useMemo(() => {
		const app = theme.application()
		return keys.map(key => ({
			color: app[key as keyof Application]().hex(),
			label: key,
			secondaryLabel: app[key as keyof Application]().hex(),
		}))
	}, [keys, theme])
}