/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IPalette, Theme } from '@fluentui/react'
import { FluentTheme } from '@thematic/fluent'
import { FC, useMemo } from 'react'
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
	const styles = useMemo(
		() => ({
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
		}),
		[theme],
	)
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
