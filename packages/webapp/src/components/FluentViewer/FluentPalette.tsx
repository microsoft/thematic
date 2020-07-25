/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { FluentTheme } from '@thematic/fluent'
import { ColorStrip } from '../ColorStrip'

interface FluentPaletteProps {
	theme: FluentTheme
}

export const FluentPalette: React.FC<FluentPaletteProps> = ({ theme }) => {
	const json = theme.toJSON()
	const mapkeys = keys =>
		keys.map(key => ({
			color: json[key],
			label: key,
			secondaryLabel: json[key],
		}))
	const primaries = mapkeys(theme.primaryKeys)
	const foregrounds = mapkeys(theme.foregroundKeys)
	const backgrounds = mapkeys(theme.backgroundKeys)
	const styles = {
		root: {
			display: 'flex',
		},
		swatch: {
			border: `1px solid ${theme.theme.application().border().hex()}`,
		},
		header: {
			color: theme.theme.application().foreground().hex(),
			fontSize: 14,
		},
	}
	return (
		<div style={styles.root}>
			<div>
				<div style={styles.header}>Primary</div>
				<ColorStrip
					vertical
					colorDefinitions={primaries}
					swatchStyle={styles.swatch}
				/>
			</div>
			<div>
				<div style={styles.header}>Foreground</div>
				<ColorStrip
					vertical
					colorDefinitions={foregrounds}
					swatchStyle={styles.swatch}
				/>
			</div>
			<div>
				<div style={styles.header}>Background</div>
				<ColorStrip
					vertical
					colorDefinitions={backgrounds}
					swatchStyle={styles.swatch}
				/>
			</div>
		</div>
	)
}
