/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { defaultParams, Params } from '@thematic/color'
import {
	Theme,
	ThemeListing,
	ThemeVariant,
	defaultThemes,
	loadById,
	loadFromSpec,
} from '@thematic/core'
import { useCallback } from 'react'
import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil'

const themesState = atom<ThemeListing[]>({
	key: 'themes',
	default: defaultThemes,
})

export function useThemes() {
	return useRecoilState(themesState)
}

const themeInfoState = atom<ThemeListing>({
	key: 'theme-info',
	default: defaultThemes[0],
})

// we drive the theme by the params, so if a pre-defined theme
// is requested, set it for listed state and also extract the params
export function useThemeInfo(): [ThemeListing, (t: ThemeListing) => void] {
	const [themeInfo, setThemeInfo] = useRecoilState(themeInfoState)
	const setParams = useSetParams()
	const update = useCallback(
		(info: ThemeListing) => {
			const theme = loadById(info.id)
			setThemeInfo(info)
			setParams(theme.params)
		},
		[setThemeInfo, setParams],
	)
	return [themeInfo, update]
}

const darkModeState = atom<boolean>({
	key: 'dark-mode',
	default: false,
})

export function useDarkMode() {
	return useRecoilState(darkModeState)
}

const paramsState = atom<Params>({
	key: 'theme-params',
	default: defaultParams,
})

export function useSetParams() {
	return useSetRecoilState(paramsState)
}

const themeState = selector<Theme>({
	key: 'theme',
	// theme instance uses an internal cache
	dangerouslyAllowMutability: true,
	get: ({ get }) => {
		const darkMode = get(darkModeState)
		const params = get(paramsState)
		return loadFromSpec(
			{
				params,
			},
			{
				variant: darkMode ? ThemeVariant.Dark : ThemeVariant.Light,
			},
		)
	},
})

export function useTheme() {
	return useRecoilValue(themeState)
}

export function useSetTheme() {
	const setParams = useSetParams()
	return useCallback(
		(theme: Theme) => {
			setParams(theme.params)
		},
		[setParams],
	)
}
