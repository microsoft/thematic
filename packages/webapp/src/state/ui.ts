/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorBlindnessMode } from '@thematic/color'
import { atom, useRecoilState } from 'recoil'

const drawNodes = atom<boolean>({
	key: 'draw-nodes',
	default: true,
})

export function useDrawNodes() {
	return useRecoilState(drawNodes)
}

const drawLinks = atom<boolean>({
	key: 'draw-links',
	default: false,
})

export function useDrawLinks() {
	return useRecoilState(drawLinks)
}

const chartSize = atom<number>({
	key: 'chart-size',
	default: 400,
})

export function useChartSize() {
	return useRecoilState(chartSize)
}

const scaleItemCount = atom<number>({
	key: 'scale-item-count',
	default: 10,
})

export function useScaleItemCount() {
	return useRecoilState(scaleItemCount)
}

const colorBlindnessMode = atom<ColorBlindnessMode>({
	key: 'color-blindness-mode',
	default: ColorBlindnessMode.None,
})

export function useColorBlindnessMode() {
	return useRecoilState(colorBlindnessMode)
}
