import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { mark2style, useThematic } from '@thematic/react'
import { Fragment } from 'react'
import { ApplicationPalette } from './ApplicationPalette'
import { ColorBand } from './ColorBand'
import { ColorStrip } from './ColorStrip'
import { Contrast } from './Contrast'
// this is the same number we use under the hood when constructing the continuous scales,
// so it makes sense to use here and potentially allow the gradation bands to be visible,
// because that's how the actual encodings will work. for many of the mid-range interpolated
// values there can be a duplicate color at this level, so we know it is fine enough to cover
// what the scale puts forth
const BAND_SLICES = 100
const BAND_WIDTH = 720
export const ColorPalette = ({ scaleItemCount }) => {
	const theme = useThematic()
	const accentColor = theme.application().accent().hex()
	const foregroundColor = theme.application().foreground().hex()
	const backgroundColor = theme.application().background().hex()
	const errorColor = theme.application().error().hex()
	const accent = _jsx(
		Fragment,
		{
			children: _jsxs(
				'span',
				{ style: { color: accentColor }, children: ['Accent ', accentColor] },
				void 0,
			),
		},
		void 0,
	)
	const background = _jsx(
		Fragment,
		{
			children: _jsxs(
				'span',
				{
					style: { color: foregroundColor },
					children: ['Background ', backgroundColor],
				},
				void 0,
			),
		},
		void 0,
	)
	const foreground = _jsx(
		Fragment,
		{
			children: _jsxs(
				'span',
				{
					style: { color: foregroundColor },
					children: ['Foreground ', foregroundColor],
				},
				void 0,
			),
		},
		void 0,
	)
	const bandDomain = [0, BAND_SLICES - 1]
	const nominal = theme.scales().nominal(scaleItemCount).toArray()
	const nominalBold = theme.scales().nominalBold(scaleItemCount).toArray()
	const nominalMuted = theme.scales().nominalMuted(scaleItemCount).toArray()
	const sequential = theme.scales().sequential(bandDomain).toArray()
	const diverging = theme.scales().diverging(bandDomain).toArray()
	const sequential2 = theme.scales().sequential2(bandDomain).toArray()
	const diverging2 = theme.scales().diverging2(bandDomain).toArray()
	const greys = theme.scales().greys(bandDomain).toArray()
	return _jsxs(
		'div',
		{
			style: {
				border: `1px solid ${foregroundColor}`,
				background: backgroundColor,
				padding: '10px 30px 30px 30px',
				color: foregroundColor,
				textAlign: 'left',
			},
			children: [
				_jsx(
					'h2',
					{ style: { color: foregroundColor }, children: 'Application colors' },
					void 0,
				),
				_jsx(ApplicationPalette, {}, void 0),
				_jsxs(
					'ul',
					{
						style: {
							fontSize: 18,
							listStyleType: 'none',
							paddingLeft: 0,
						},
						children: [
							_jsxs(
								'li',
								{
									children: [
										foreground,
										' on ',
										background,
										' (contrast ratio:',
										' ',
										_jsx(
											Contrast,
											{
												foreground: foregroundColor,
												background: backgroundColor,
												error: errorColor,
												showLink: true,
											},
											void 0,
										),
										')',
									],
								},
								void 0,
							),
							_jsxs(
								'li',
								{
									children: [
										accent,
										' on ',
										background,
										' (contrast ratio:',
										' ',
										_jsx(
											Contrast,
											{
												foreground: accentColor,
												background: backgroundColor,
												error: errorColor,
												showLink: true,
											},
											void 0,
										),
										')',
									],
								},
								void 0,
							),
						],
					},
					void 0,
				),
				_jsx(
					'h2',
					{ style: { color: foregroundColor }, children: 'Scales' },
					void 0,
				),
				_jsxs(
					'div',
					{
						style: {
							display: 'flex',
							flexDirection: 'column',
							fontSize: 12,
							width: BAND_WIDTH,
							padding: 8,
							...mark2style(theme.plotArea()),
						},
						children: [
							_jsx(
								ColorStrip,
								{
									label: 'Nominal ',
									foreground: foregroundColor,
									background: backgroundColor,
									colors: nominal,
								},
								void 0,
							),
							_jsx(
								ColorStrip,
								{
									label: 'Nominal+',
									foreground: foregroundColor,
									background: backgroundColor,
									colors: nominalBold,
									labelColors: nominalMuted,
								},
								void 0,
							),
							_jsx(
								ColorStrip,
								{
									label: 'Nominal-',
									foreground: foregroundColor,
									background: backgroundColor,
									colors: nominalMuted,
									labelColors: nominalBold,
								},
								void 0,
							),
							_jsx(
								ColorBand,
								{
									label: 'Sequential',
									foreground: foregroundColor,
									colors: sequential,
									width: BAND_WIDTH,
								},
								void 0,
							),
							_jsx(
								ColorBand,
								{
									label: 'Sequential2',
									foreground: foregroundColor,
									colors: sequential2,
									width: BAND_WIDTH,
								},
								void 0,
							),
							_jsx(
								ColorBand,
								{
									label: 'Diverging',
									foreground: foregroundColor,
									colors: diverging,
									width: BAND_WIDTH,
								},
								void 0,
							),
							_jsx(
								ColorBand,
								{
									label: 'Diverging2',
									foreground: foregroundColor,
									colors: diverging2,
									width: BAND_WIDTH,
								},
								void 0,
							),
							_jsx(
								ColorBand,
								{
									label: 'Greys',
									foreground: foregroundColor,
									colors: greys,
									width: BAND_WIDTH,
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
