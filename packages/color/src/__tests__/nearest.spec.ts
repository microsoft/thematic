import { Color } from '../Color.js'
import { nearest } from '../nearest.js'

describe('nearest', () => {
	describe('nearest within [default] nominal 20', () => {
		const colors = [
			'#80acf7',
			'#35c456',
			'#f88c8d',
			'#3dbcbc',
			'#c2ab37',
			'#f67eed',
			'#40b6d8',
			'#95b439',
			'#f683ba',
			'#3fbc9b',
			'#e7973c',
			'#c095f4',
			'#47afea',
			'#71b83c',
			'#f582a1',
			'#43b7a8',
			'#ce9e3f',
			'#db84f2',
			'#46b1c0',
			'#a6a840',
		].map((c) => new Color(c))

		test('red', () => {
			const color = new Color('red')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#f88c8d')
		})

		test('orange', () => {
			const color = new Color('orange')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#e7973c')
		})

		test('yellow', () => {
			const color = new Color('yellow')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#a6a840')
		})

		test('green', () => {
			const color = new Color('green')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#35c456')
		})

		test('blue', () => {
			const color = new Color('blue')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#80acf7')
		})

		test('indigo', () => {
			const color = new Color('indigo')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#c095f4')
		})

		test('violet', () => {
			const color = new Color('violet')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#f67eed')
		})
	})
	describe('nearest within [autumn] nominal 20', () => {
		// this is a MUCH different theme, so provides a nice contrast
		// to confirm that the colors still look reasonable
		const colors = [
			'#e09f35',
			'#d291f7',
			'#38bfa7',
			'#f788b1',
			'#40b7e7',
			'#86bb37',
			'#f78a76',
			'#93a4f5',
			'#3abf74',
			'#f57edc',
			'#41b8c0',
			'#b5ab3b',
			'#f08d3d',
			'#b197f3',
			'#3fb990',
			'#f37ec2',
			'#46b3cb',
			'#9eae3f',
			'#f38090',
			'#59a8f1',
		].map((c) => new Color(c))

		test('red', () => {
			const color = new Color('red')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#f38090')
		})

		test('orange', () => {
			const color = new Color('orange')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#e09f35')
		})

		test('yellow', () => {
			const color = new Color('yellow')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#b5ab3b')
		})

		test('green', () => {
			const color = new Color('green')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#3abf74')
		})

		test('blue', () => {
			const color = new Color('blue')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#93a4f5')
		})

		test('indigo', () => {
			const color = new Color('indigo')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#b197f3')
		})

		test('violet', () => {
			const color = new Color('violet')
			const match = nearest(color, colors)
			expect(match.hex()).toBe('#f57edc')
		})
	})
})
