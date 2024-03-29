/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useTheme } from '@fluentui/react'
import { useMemo } from 'react'

export function useContainerStyles() {
	const theme = useTheme()
	return useMemo(
		() => ({
			width: '100%',
			height: 32,
			fontSize: 12,
			display: 'flex',
			flexDirection: 'row' as const,
			justifyContent: 'center',
			gap: 18,
			alignItems: 'center',
			color: theme.palette.neutralSecondary,
			background: theme.palette.neutralLight,
			borderTop: `1px solid ${theme.palette.neutralTertiaryAlt}`,
		}),
		[theme],
	)
}

export const constants = {
	privacyUrl: 'https://go.microsoft.com/fwlink/?LinkId=521839',
	consumerHealthUrl: 'https://go.microsoft.com/fwlink/?LinkId=2259814',
	termsOfUseUrl: 'https://go.microsoft.com/fwlink/?LinkID=206977',
	trademarksUrl: 'https://www.microsoft.com/trademarks',
	microsoft: 'https://www.microsoft.com',
	copyright: `©️ ${new Date().getFullYear()} Microsoft`,
	github: 'https://github.com/microsoft/thematic',
}
