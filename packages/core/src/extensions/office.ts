/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme, ThemeVariant, Transformer } from '../types'

export type OfficeTheme = {
	dark1: string
	light1: string
	dark2: string
	light2: string
	accent1: string
	accent2: string
	accent3: string
	accent4: string
	accent5: string
	accent6: string
	hyperlink: string
	followedHyperlink: string
}

/**
 * Creates an object with the properties of a standard Office color theme.
 * @param theme
 */
export const office: Transformer<OfficeTheme> = (theme: Theme) => {
	const nominal = theme.scales().nominal().toArray()
	return {
		dark1:
			theme.variant === ThemeVariant.Dark
				? theme.application().background().hex()
				: theme.text().fill().hex(),

		light1:
			theme.variant === ThemeVariant.Dark
				? theme.text().fill().hex()
				: theme.application().background().hex(),
		dark2:
			theme.variant === ThemeVariant.Dark
				? theme.plotArea().fill().hex()
				: theme.application().accent().hex(),
		light2:
			theme.variant === ThemeVariant.Dark
				? theme.application().accent().hex()
				: theme.plotArea().fill().hex(),
		accent1: nominal[0],
		accent2: nominal[1],
		accent3: nominal[2],
		accent4: nominal[3],
		accent5: nominal[4],
		accent6: nominal[5],
		hyperlink: theme.application().accent().hex(),
		followedHyperlink: nominal[0],
	}
}
