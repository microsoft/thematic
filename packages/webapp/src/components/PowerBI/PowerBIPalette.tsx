/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { PowerBITheme } from '@thematic/core'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useMemo } from 'react'
import type { ColorDefinition } from '../ColorStrip'
import { ColorStrip } from '../ColorStrip'

export interface PowerBIPaletteProps {
	colors: PowerBITheme
}

const mainKeys = ['foreground', 'background', 'tableAccent']

const mapkeys = (theme: PowerBITheme, keys: string[]) =>
	keys.map(key => ({
		color: theme[key as keyof PowerBITheme],
		label: key,
		secondaryLabel: theme[key as keyof PowerBITheme],
	}))

export const PowerBIPalette: FC<PowerBIPaletteProps> = ({ colors }) => {
	const theme = useThematic()
	const mains = useMemo(
		() => mapkeys(colors, mainKeys) as ColorDefinition[],
		[colors],
	)
	const dataColorsLeft = useMemo(
		() =>
			colors.dataColors.slice(0, 6).map(c => ({
				color: c,
				label: c,
			})),
		[colors],
	)
	const dataColorsRight = useMemo(
		() =>
			colors.dataColors.slice(6).map(c => ({
				color: c,
				secondaryLabel: c,
			})),
		[colors],
	)
	const styles = useMemo(
		() => ({
			root: {
				display: 'flex',
			},
			header: {
				color: theme.application().foreground().hex(),
				fontSize: 14,
			},
			swatch: {
				border: `1px solid ${theme.application().border().hex()}`,
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
					colorDefinitions={mains}
					swatchStyle={styles.swatch}
				/>
			</div>
			<div>
				<div style={styles.header}>Data Colors</div>
				<div style={{ display: 'flex', alignItems: ' flex-start' }}>
					<ColorStrip
						vertical
						colorDefinitions={dataColorsLeft}
						swatchStyle={styles.swatch}
					/>
					<ColorStrip
						vertical
						colorDefinitions={dataColorsRight}
						swatchStyle={styles.swatch}
					/>
				</div>
			</div>
		</div>
	)
}
