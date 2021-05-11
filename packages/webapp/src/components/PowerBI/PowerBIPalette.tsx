/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC } from 'react'
import { ColorStrip } from '../ColorStrip'
import { useThematic } from '@thematic/react'

export interface PowerBIPaletteProps {
	colors: any
}

const mainKeys = ['foreground', 'background', 'tableAccent']

export const PowerBIPalette: FC<PowerBIPaletteProps> = ({ colors }) => {
	const theme = useThematic()
	const mapkeys = keys =>
		keys.map(key => ({
			color: colors[key],
			label: key,
			secondaryLabel: colors[key],
		}))
	const mains = mapkeys(mainKeys)
	const dataColorsLeft = colors.dataColors.slice(0, 6).map(c => ({
		color: c,
		label: c,
	}))
	const dataColorsRight = colors.dataColors.slice(6).map(c => ({
		color: c,
		secondaryLabel: c,
	}))
	const styles = {
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
