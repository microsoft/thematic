/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { CSSProperties } from 'react'
import { contrast } from '@thematic/color'
import { IconButton } from '@fluentui/react'

interface ContrastProps {
	foreground: string
	background: string
	error: string
	showLink?: boolean
}

const WCAG = 4.5
const ICON_SIZE = '0.7em'
const NOTE = 'WCAG guidelines recommend a minimum contrast ratio of 4.5:1'

export const Contrast: React.FC<ContrastProps> = ({
	foreground,
	background,
	error,
	showLink,
}) => {
	const c = contrast(foreground, background)
	const style: CSSProperties = {}
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
	return (
		<>
			<span style={style} title={NOTE}>
				{display}
			</span>
			{showLink && low ? (
				<IconButton
					iconProps={{ iconName: 'NavigateExternalInline' }}
					styles={buttonStyles}
					href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast"
					title={NOTE}
					target="_blank"
				/>
			) : null}
		</>
	)
}
