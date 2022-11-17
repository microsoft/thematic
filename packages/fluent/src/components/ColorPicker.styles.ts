/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISliderStyles } from '@fluentui/react'
import { useTheme } from '@fluentui/react'
import merge from 'lodash-es/merge.js'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'

export function useContainerStyle(styles?: CSSProperties) {
	return useMemo(
		() =>
			merge(
				{
					width: 300, // default max width of color picker, so the sliders match
					paddingTop: 14,
					paddingBottom: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				},
				styles,
			),
		[styles],
	)
}

export function useSectionHeaderStyle() {
	const theme = useTheme()
	return useMemo(
		() => ({
			color: theme.palette.neutralSecondary,
			fontSize: 12,
			fontWeight: 'bold' as const,
			textTransform: 'uppercase' as const,
		}),
		[theme],
	)
}

export function useSliderStyles(styles?: ISliderStyles) {
	return useMemo(
		() =>
			merge(
				{
					root: {
						marginBottom: 4,
						textAlign: 'left',
						display: 'flex',
						alignItems: 'center',
						width: '100%',
					},
					titleLabel: {
						fontSize: 12,
						textAlign: 'right',
						width: 60,
					},
					container: {
						flex: 1,
					},
					valueLabel: {
						fontSize: 12,
						width: 24,
						margin: 0,
						padding: 0,
						textAlign: 'right',
					},
					thumb: {
						top: -3.5,
						width: 10,
						height: 10,
						borderWidth: 1,
					},
					lineContainer: {
						height: 2,
						borderRadius: 2,
					},
					slideBox: {
						paddingTop: 1,
						paddingRight: 0,
					},
				},
				styles,
			),
		[styles],
	)
}
