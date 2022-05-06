/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export const backgroundHueShiftOptions = [
	{
		label: '-170 Complement',
		value: -170,
	},
	{
		label: '-60 Analogous',
		value: -60,
	},
	{
		label: '-30 Analogous',
		value: -30,
	},
	{
		label: '0 Monochrome',
		value: 0,
	},
	{
		label: '+30 Analogous',
		value: 30,
	},
	{
		label: '+60 Analogous',
		value: 60,
	},
	{
		label: '+170 Complement',
		value: 170,
	},
]

const getBackgroundLevelOptions = (): Array<{
	label: string
	value: number
}> => {
	const options: Array<{ label: string; value: number }> = []
	for (let i = 0; i <= 100; i += 10) {
		options.push({
			label: `${i}`,
			value: i,
		})
	}
	return options
}

export const backgroundLevelOptions = getBackgroundLevelOptions()
