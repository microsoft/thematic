/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { configure } = require('@essex/webpack-config')

const extendConfiguration = config => ({
	...config,
	entry: ['@babel/polyfill', './src/index.tsx'],
})

const webpackConfig = configure({
	pnp: true,
	extendConfiguration,
})

module.exports = webpackConfig
