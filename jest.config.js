/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { configure } = require('@essex/jest-config')
module.exports = configure(['<rootDir>/jest.setup.js'], 'tsconfig.jest.json')
