import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './index.css'
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'
import { ColorStrip } from '../ColorStrip'
const applicationPrimaryKeys = ['accent', 'foreground', 'background', 'border']
const applicationSignalKeys = ['success', 'warning', 'error']
const applicationLowKeys = ['faint', 'lowContrast', 'lowMidContrast']
const applicationHighKeys = ['midContrast', 'midHighContrast', 'highContrast']
export const ApplicationPalette = () => {
	const theme = useThematic()
	const primaries = useColors(applicationPrimaryKeys, theme)
	const signals = useColors(applicationSignalKeys, theme)
	const secondaries = useColors(applicationLowKeys, theme)
	const elements = useColors(applicationHighKeys, theme)
	const styles = {
		swatch: {
			border: `1px solid ${theme.application().border().hex()}`,
		},
		label: {
			width: 80,
		},
	}
	return _jsxs(
		'div',
		{
			className: 'application-palette',
			children: [
				_jsx(
					ColorStrip,
					{
						vertical: true,
						colorDefinitions: primaries,
						swatchStyle: styles.swatch,
						labelStyle: styles.label,
					},
					void 0,
				),
				_jsx(
					ColorStrip,
					{
						vertical: true,
						colorDefinitions: signals,
						swatchStyle: styles.swatch,
						labelStyle: styles.label,
					},
					void 0,
				),
				_jsx(
					ColorStrip,
					{
						vertical: true,
						colorDefinitions: secondaries,
						swatchStyle: styles.swatch,
						labelStyle: styles.label,
					},
					void 0,
				),
				_jsx(
					ColorStrip,
					{
						vertical: true,
						colorDefinitions: elements,
						swatchStyle: styles.swatch,
						labelStyle: styles.label,
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
function useColors(keys, theme) {
	return useMemo(() => {
		const app = theme.application()
		return keys.map(key => ({
			color: app[key]().hex(),
			label: key,
			secondaryLabel: app[key]().hex(),
		}))
	}, [keys, theme])
}
