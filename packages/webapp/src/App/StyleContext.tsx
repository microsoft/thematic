/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ThematicFluentProvider } from '@thematic/fluent'
import { ApplicationStyles } from '@thematic/react'
import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import { useTheme } from '../state/index.js'

export const StyleContext: FC<{
	children?: ReactNode
}> = memo(function StyleContext({ children }) {
	const theme = useTheme()
	return (
		<ThematicFluentProvider theme={theme}>
			<GlobalStyle />
			<ApplicationStyles />
			{children}
		</ThematicFluentProvider>
	)
})

const GlobalStyle = () => {
	return (
		<style>
			{`
			* {
				box-sizing: border-box;
			}
			html,
			body,
			#root {
				overflow-y: hidden;
				margin: 0;
			}
			h1 {
				text-transform: uppercase;
				font-size: 1em;
			}
			`}
		</style>
	)
}
