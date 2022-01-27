/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FluentTheme } from '@thematic/fluent'
import { FC } from 'react'
import { ColorStrip } from '../ColorStrip'

export interface FluentPaletteProps {
	theme: FluentTheme
}

const primaryKeys: string[] = [
	'themeDarker',
	'themeDark',
	'themeDarkAlt',
	'themePrimary',
	'themeSecondary',
	'themeTertiary',
	'themeLight',
	'themeLighter',
	'themeLighterAlt',
]

const foregroundKeys: string[] = [
	'black',
	'neutralDark',
	'neutralPrimary',
	'neutralPrimaryAlt',
	'neutralSecondary',
	'neutralTertiary',
	'white',
]

const backgroundKeys: string[] = [
	'neutralTertiaryAlt',
	'neutralQuaternary',
	'neutralQuaternaryAlt',
	'neutralLight',
	'neutralLighter',
	'neutralLighterAlt',
]

export const FluentPalette: FC<FluentPaletteProps> = ({ theme }) => {
	const json = theme.toFluent()
	const mapkeys = keys =>
		keys.map(key => ({
			color: json.palette[key],
			label: key,
			secondaryLabel: json.palette[key],
		}))
	const primaries = mapkeys(primaryKeys)
	const foregrounds = mapkeys(foregroundKeys)
	const backgrounds = mapkeys(backgroundKeys)
	const styles = {
		root: {
			display: 'flex',
		},
		swatch: {
			border: `1px solid ${theme.application().border().hex()}`,
		},
		header: {
			color: theme.application().foreground().hex(),
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
