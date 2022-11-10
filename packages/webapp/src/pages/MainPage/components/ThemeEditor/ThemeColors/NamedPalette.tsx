/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme } from '@thematic/core'
import { useThematicFluent } from '@thematic/fluent'
import type { FC } from 'react'
import { useMemo } from 'react'

import { ColorStrip } from '../../../../../components/ColorStrip.js'

const first = ['red', 'orange', 'yellow', 'green']
const second = ['blue', 'indigo', 'violet']

export const NamedPalette: FC = () => {
	const theme = useThematicFluent()
	const firsts = useStandardColors(first)
	const firstMatches = useMatchedColors(first, theme)
	const seconds = useStandardColors(second)
	const secondMatches = useMatchedColors(second, theme)
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
				colorDefinitions={firsts}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={firstMatches}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={seconds}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
			<ColorStrip
				vertical
				colorDefinitions={secondMatches}
				swatchStyle={styles.swatch}
				labelStyle={styles.label}
			/>
		</div>
	)
}

function useMatchedColors(keys: string[], theme: Theme) {
	return useMemo(() => {
		return keys.map(key => ({
			color: theme.nearest(key).hex(),
			secondaryLabel: theme.nearest(key).hex(),
		}))
	}, [keys, theme])
}

function useStandardColors(keys: string[]) {
	return useMemo(() => {
		return keys.map(key => ({
			color: key,
			label: key,
		}))
	}, [keys])
}
