/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { OfficeTheme } from '@thematic/core'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useMemo } from 'react'
import { ColorStrip } from '../ColorStrip'

export interface OfficePaletteProps {
	colors: OfficeTheme
}

const mainKeys = [
	'dark1',
	'light1',
	'dark2',
	'light2',
	'hyperlink',
	'followedHyperlink',
]
const accentKeys = [
	'accent1',
	'accent2',
	'accent3',
	'accent4',
	'accent5',
	'accent6',
]

export const OfficePalette: FC<OfficePaletteProps> = ({ colors }) => {
	const theme = useThematic()
	const mains = useColors(colors, mainKeys)
	const accents = useColors(colors, accentKeys)
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
					colorDefinitions={mains}
					swatchStyle={styles.swatch}
				/>
			</div>
			<div>
				<div style={styles.header}>Accent</div>
				<ColorStrip
					vertical
					colorDefinitions={accents}
					swatchStyle={styles.swatch}
				/>
			</div>
		</div>
	)
}

function useColors(theme: OfficeTheme, keys: string[]) {
	return useMemo(
		() =>
			keys.map(key => ({
				color: theme[key as keyof OfficeTheme],
				label: key,
				secondaryLabel: theme[key as keyof OfficeTheme],
			})),
		[theme, keys],
	)
}
