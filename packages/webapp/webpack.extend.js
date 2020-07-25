/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
module.exports.extendEnvironment = (env, mode) => {
	const isDevelopment = mode !== 'production'
	return {
		PUBLIC_URL: isDevelopment ? '/public' : '/',
	}
}

module.exports.extendConfiguration = config => ({
	...config,
	devtool: 'cheap-module-source-map',
})
