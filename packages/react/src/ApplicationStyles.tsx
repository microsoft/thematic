/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, useMemo } from 'react'
import { useThematic } from './'

/**
 * This component applies root-level styles to your application using the theme defaults.
 */
export const ApplicationStyles: FC = () => {
	const theme = useThematic()
	return useMemo(
		() => (
			<style>
				{`
        html,
        body {
            background-color: ${theme.application().background().hex()};
            color: ${theme.application().foreground().hex()};
        }
        a {
            color: ${theme.application().accent().hex()};
        }
    `}
			</style>
		),
		[theme],
	)
}
