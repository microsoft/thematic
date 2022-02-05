import { jsx as _jsx } from 'react/jsx-runtime'
import { ColorPicker, ColorPickerLayout } from '@thematic/fluent'
import './index.css'
export const ColorSelection = ({ onThemeLoaded }) => {
	return _jsx(
		'div',
		{
			className: 'color-controls-area',
			children: _jsx(
				ColorPicker,
				{
					onChange: onThemeLoaded,
					layout: ColorPickerLayout.SideBySide,
					styles: { sliders: { width: 400 } },
				},
				void 0,
			),
		},
		void 0,
	)
}
