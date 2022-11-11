import { polynomialSequence } from '../scheme/functions.js'

describe('schema compute functions', () => {
	describe('polynomialSequence', () => {
		test('default linear', () => {
			const scale1 = polynomialSequence(0, 10, 11).map(x => Math.round(x))
			expect(scale1).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
		})

		test('squared', () => {
			const scale2 = polynomialSequence(0, 64, 8, 2).map(x => Math.round(x))
			expect(scale2).toEqual([0, 1, 5, 12, 21, 33, 47, 64])
		})
	})
})
