import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { ColorStrip } from '../ColorStrip'
const primaryKeys = [
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
const foregroundKeys = [
	'black',
	'neutralDark',
	'neutralPrimary',
	'neutralPrimaryAlt',
	'neutralSecondary',
	'neutralTertiary',
]
const backgroundKeys = [
	'neutralTertiaryAlt',
	'neutralQuaternary',
	'neutralQuaternaryAlt',
	'neutralLight',
	'neutralLighter',
	'neutralLighterAlt',
	'white',
]
export const FluentPalette = ({ theme }) => {
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
	return _jsxs(
		'div',
		{
			style: styles.root,
			children: [
				_jsxs(
					'div',
					{
						children: [
							_jsx(
								'div',
								{ style: styles.header, children: 'Primary' },
								void 0,
							),
							_jsx(
								ColorStrip,
								{
									vertical: true,
									colorDefinitions: primaries,
									swatchStyle: styles.swatch,
								},
								void 0,
							),
						],
					},
					void 0,
				),
				_jsxs(
					'div',
					{
						children: [
							_jsx(
								'div',
								{ style: styles.header, children: 'Foreground' },
								void 0,
							),
							_jsx(
								ColorStrip,
								{
									vertical: true,
									colorDefinitions: foregrounds,
									swatchStyle: styles.swatch,
								},
								void 0,
							),
						],
					},
					void 0,
				),
				_jsxs(
					'div',
					{
						children: [
							_jsx(
								'div',
								{ style: styles.header, children: 'Background' },
								void 0,
							),
							_jsx(
								ColorStrip,
								{
									vertical: true,
									colorDefinitions: backgrounds,
									swatchStyle: styles.swatch,
								},
								void 0,
							),
						],
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
