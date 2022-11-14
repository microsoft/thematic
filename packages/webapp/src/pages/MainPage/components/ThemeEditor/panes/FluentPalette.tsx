/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IPalette, Theme } from '@fluentui/react'
import type { FluentTheme } from '@thematic/fluent'
import type { FC } from 'react'
import { useMemo } from 'react'

import { ColorStrip } from '../../../../../components/ColorStrip.js'
import { useStyles } from './hooks.js'

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
]

const backgroundKeys: string[] = [
	'neutralTertiaryAlt',
	'neutralQuaternary',
	'neutralQuaternaryAlt',
	'neutralLight',
	'neutralLighter',
	'neutralLighterAlt',
	'white',
]

export const FluentPalette: FC<FluentPaletteProps> = ({ theme }) => {
	const fluent = theme.toFluent()
	const primaries = useColors(fluent, primaryKeys)
	const foregrounds = useColors(fluent, foregroundKeys)
	const backgrounds = useColors(fluent, backgroundKeys)
	const styles = useStyles()
	return (
		<div style={styles.root}>
			<div>
				<div style={styles.header}>Primary</div>
				<ColorStrip
					vertical={true}
					colorDefinitions={primaries}
					swatchStyle={styles.swatch}
				/>
			</div>
			<div>
				<div style={styles.header}>Foreground</div>
				<ColorStrip
					vertical={true}
					colorDefinitions={foregrounds}
					swatchStyle={styles.swatch}
				/>
			</div>
			<div>
				<div style={styles.header}>Background</div>
				<ColorStrip
					vertical={true}
					colorDefinitions={backgrounds}
					swatchStyle={styles.swatch}
				/>
			</div>
		</div>
	)
}

function useColors(theme: Theme, keys: string[]) {
	return useMemo(
		() =>
			keys.map(key => ({
				color: theme.palette[key as keyof IPalette],
				label: key,
				secondaryLabel: theme.palette[key as keyof IPalette],
			})),
		[theme, keys],
	)
}
