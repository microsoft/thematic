import { jsx as _jsx } from 'react/jsx-runtime'
import { connect } from 'react-redux'
import { themeLoaded } from '../../state/actions'
import { ColorSelection } from './ColorSelection'
import './index.css'
const CoolerPickerComponent = ({ themeLoaded }) => {
	return _jsx(
		'div',
		{
			className: 'cooler-picker',
			children: _jsx(ColorSelection, { onThemeLoaded: themeLoaded }, void 0),
		},
		void 0,
	)
}
export const CoolerPicker = connect(null, {
	themeLoaded,
})(CoolerPickerComponent)
