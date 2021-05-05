/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { themeLoaded } from '../../state/actions'
import { ScaleType, Theme } from '@thematic/core'
import {
	ScaleDropdown,
	ScaleTypeChoiceGroup,
	ColorPicker,
	ColorPickerButton,
} from '@thematic/fluent'
import { useThematic } from '@thematic/react'

interface FluentControlsComponentProps {
	themeLoaded: (theme: Theme) => void
}

const FluentControlsComponent: React.FC<FluentControlsComponentProps> = ({
	themeLoaded,
}) => {
	const theme = useThematic()
	const [scale, setScale] = useState<string>('<none>')
	const handleScaleChange = useCallback((e, option) => setScale(option.key), [])
	const [scaleType, setScaleType] = useState<ScaleType>(ScaleType.Linear)
	const handleScaleTypeChange = useCallback(type => setScaleType(type), [])
	const handlePickerChange = useCallback(t => themeLoaded(t), [themeLoaded])
	return (
		<Container>
			<Description>
				The @thematic/fluent package contains a few custom Fluent controls you
				can use in your applications to allow Thematic-specific interactions.
			</Description>
			<Controls>
				<Control>
					<Description>
						<Label>ScaleDropdown:</Label> a Dropdown that pre-loads Thematic
						scale options.
					</Description>
					<ScaleDropdown
						placeholder={'Choose scale'}
						onChange={handleScaleChange}
					/>
					<Action> onChange: {scale}</Action>
				</Control>
				<Control>
					<Description>
						<Label>ScaleTypeChoiceGroup:</Label> a ChoiceGroup that pre-loads
						Thematic scale types.
					</Description>
					<ScaleTypeChoiceGroup
						selectedType={scaleType}
						onChange={handleScaleTypeChange}
					/>
					<Action> onChange: {scaleType}</Action>
				</Control>
				<Control>
					<Description>
						<Label>ColorPicker:</Label> a ColorPicker that emits Thematic
						parameters.
					</Description>
					<ColorPicker theme={theme} onChange={handlePickerChange} />
					<Action> onChange: {theme.application().accent().hex()}</Action>
				</Control>
				<Control>
					<Description>
						<Label>ColorPickerButton:</Label> a DropdownButton that hosts a
						Thematic ColorPicker.
					</Description>
					<ColorPickerButton theme={theme} onChange={handlePickerChange} />
					<Action> onChange: {theme.application().accent().hex()}</Action>
				</Control>
			</Controls>
		</Container>
	)
}

export const FluentControls = connect(null, {
	themeLoaded,
})(FluentControlsComponent)

const Container = styled.div`
	font-size: 14px;
	overflow-y: scroll;
`

const Description = styled.p``

const Controls = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
`

const Control = styled.div`
	width: 320px;
	padding: 8px;
	margin: 8px;
	//border: 1px solid ${({ theme }) => theme.application().border().hex()};
`

const Label = styled.span`
	font-weight: bold;
	color: ${({ theme }) => theme.application().accent().hex()};
`

const Action = styled.p`
	font-size: 12px;
	font-family: monospace;
	color: ${({ theme }) => theme.application().warning().hex()};
`
