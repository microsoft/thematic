/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useIconButtonProps } from '@essex/components'
import { IconButton } from '@fluentui/react'
import merge from 'lodash-es/merge.js'
import type { FC } from 'react'
import { memo, useMemo } from 'react'

import { ColorPicker } from './ColorPicker.js'
import type { ColorPickerButtonProps } from './ColorPickerButton.types.js'
/**
 * This is a dropdown button that displays a thematic ColorPicker.
 */
export const ColorPickerButton: FC<ColorPickerButtonProps> = memo(
	function ColorPickerButton({ size, onChange, ...props }) {
		// core props to setup the icon button with a fill color, and to render the ColorPicker as the dropdown menu
		const coreProps = useMemo(
			() =>
				merge(
					{
						iconProps: {
							iconName: 'CheckBoxFill',
						},
						menuProps: {
							items: [
								{
									key: 'colorPicker',
									onRender: () => (
										<ColorPicker
											size={'small'}
											onChange={onChange}
											styles={{
												root: {
													width: 200,
												},
											}}
										/>
									),
								},
							],
						},
					},
					props,
				),
			[onChange, props],
		)

		const _props = useIconButtonProps(coreProps, size)
		return <IconButton {..._props} />
	},
)
