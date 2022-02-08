/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { OfficeTheme } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { FC } from 'react'
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
	const mapkeys = (keys: string[]) =>
		keys.map(key => ({
			color: colors[key as keyof OfficeTheme],
			label: key,
			secondaryLabel: colors[key as keyof OfficeTheme],
		}))
	const mains = mapkeys(mainKeys)
	const accents = mapkeys(accentKeys)
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
