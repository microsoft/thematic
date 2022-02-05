import {
	jsx as _jsx,
	Fragment as _Fragment,
	jsxs as _jsxs,
} from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton } from '@fluentui/react'
import { contrast } from '@thematic/color'
const WCAG = 4.5
const ICON_SIZE = '0.7em'
const NOTE = 'WCAG guidelines recommend a minimum contrast ratio of 4.5:1'
export const Contrast = ({ foreground, background, error, showLink }) => {
	const c = contrast(foreground, background)
	const style = {}
	const low = c < WCAG
	if (low) {
		style.color = error
	}
	const display = Math.round(c * 100) / 100
	const buttonStyles = {
		root: {
			width: ICON_SIZE,
			height: ICON_SIZE,
		},
		icon: {
			fontSize: ICON_SIZE,
		},
	}
	return _jsxs(
		_Fragment,
		{
			children: [
				_jsx('span', { style: style, title: NOTE, children: display }, void 0),
				showLink && low
					? _jsx(
							IconButton,
							{
								iconProps: { iconName: 'NavigateExternalInline' },
								styles: buttonStyles,
								href: 'https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
								title: NOTE,
								target: '_blank',
							},
							void 0,
					  )
					: null,
			],
		},
		void 0,
	)
}
