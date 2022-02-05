import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { ThematicFluentProvider } from '@thematic/fluent'
import { ApplicationStyles } from '@thematic/react'
import { connect } from 'react-redux'
import { ControlPanel } from './components/ControlPanel'
import { ThemeEditor } from './components/ThemeEditor'
import { ThemeViewer } from './components/ThemeViewer'
import './App.css'
const AppComponent = ({ theme }) =>
	_jsxs(
		ThematicFluentProvider,
		{
			theme: theme,
			children: [
				_jsx(ApplicationStyles, {}, void 0),
				_jsxs(
					'div',
					{
						className: 'App',
						children: [
							_jsx(
								'div',
								{
									className: 'controls',
									style: {
										backgroundColor: theme.application().faint().hex(),
										borderBottom: `1px solid ${theme
											.application()
											.border()
											.hex()}`,
									},
									children: _jsx(ControlPanel, {}, void 0),
								},
								void 0,
							),
							_jsxs(
								'div',
								{
									className: 'main',
									children: [
										_jsx(
											'div',
											{
												className: 'editor',
												children: _jsx(ThemeEditor, {}, void 0),
											},
											void 0,
										),
										_jsx(
											'div',
											{
												className: 'viewer',
												children: _jsx(ThemeViewer, {}, void 0),
											},
											void 0,
										),
									],
								},
								void 0,
							),
						],
					},
					void 0,
				),
			],
		},
		void 0,
	)
export const App = connect(state => ({
	theme: state.theme,
}))(AppComponent)
