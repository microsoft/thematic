/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import './index.css'
import { FC } from 'react'
import { ColorStrip } from '../ColorStrip'
import { useThematic } from '@thematic/react'

const applicationPrimaryKeys = ['accent', 'foreground', 'background']
const applicationSignalKeys = ['success', 'warning', 'error']
const applicationSecondaryKeys = ['lowContrast', 'midContrast', 'highContrast']
const applicationElementKeys = ['border', 'faint']
export const ApplicationPalette: FC = () => {
	const theme = useThematic()
	const app = theme.application()
	const mapkeys = keys =>
		keys.map(key => ({
			color: app[key]().hex(),
			label: key,
			secondaryLabel: app[key]().hex(),
		}))
	const primaries = mapkeys(applicationPrimaryKeys)
	const signals = mapkeys(applicationSignalKeys)
	const secondaries = mapkeys(applicationSecondaryKeys)
	const elements = mapkeys(applicationElementKeys)
	const styles = {
		swatch: {
			border: `1px solid ${app.border().hex()}`,
		},
		label: {
			width: 80,
		},
	}
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
