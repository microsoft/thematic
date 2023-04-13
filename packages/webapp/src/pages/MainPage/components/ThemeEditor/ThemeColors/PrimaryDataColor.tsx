/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SelectionState } from '@thematic/core'
import { useThematicFluent } from '@thematic/fluent'
import type { FC } from 'react'
import { useMemo } from 'react'

import type { ColorDefinition } from '../../../../../components/ColorStrip.js'
import { ColorStrip } from '../../../../../components/ColorStrip.js'

export const PrimaryDataColor: FC = () => {
	const theme = useThematicFluent()
	const primary = useThemePrimaryColors()
	const styles = useMemo(
		() => ({
			swatch: {
				border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
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
				colorDefinitions={[primary[0]]}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={[primary[1]]}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={[primary[2]]}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
		</div>
	)
}

function useThemePrimaryColors(): [
	ColorDefinition,
	ColorDefinition,
	ColorDefinition,
] {
	const theme = useThematicFluent()
	return useMemo<[ColorDefinition, ColorDefinition, ColorDefinition]>(() => {
		const primary = theme.rect().fill().hex()
		const muted = theme
			.rect({
				selectionState: SelectionState.Suppressed,
			})
			.fill()
			.hex()
		const bold = theme
			.rect({
				selectionState: SelectionState.Selected,
			})
			.fill()
			.hex()
		return [
			{
				color: primary,
				label: 'primary',
				secondaryLabel: primary,
			},
			{
				color: muted,
				label: 'muted',
				secondaryLabel: muted,
			},
			{
				color: bold,
				label: 'bold',
				secondaryLabel: bold,
			},
		]
	}, [theme])
}
