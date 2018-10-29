const assert = require('assert');
const Solver = require('../src/index.js');

const toSet = (...results) => (
	new Set(results.map(
		(result) => new Set(result.map(
			({ x, y, width, height }) => ([x, y, width, height])
		))
	))
);

describe('solve', () => {
	// 6..
	// ...
	it('No.1 を解けること。', () => {
		assert.deepEqual(
			toSet(...Solver.solve({
				rows: 2,
				columns: 3,
				numbers: [
					{ x: 0, y: 0, number: 6 },
				]
			})),
			new Set([
				new Set([
					[0, 0, 3, 2],
				])
			])
		);
	});

	// 24.
	// ...
	it('No.2 を解けること。', () => {
		assert.deepEqual(
			toSet(...Solver.solve({
				rows: 2,
				columns: 3,
				numbers: [
					{ x: 0, y: 0, number: 2 },
					{ x: 1, y: 0, number: 4 },
				]
			})),
			new Set([
				new Set([
					[0, 0, 1, 2],
					[1, 0, 2, 2],
				])
			])
		);
	});

	// 2.
	// .2
	it('No.3 を解けること。', () => {
		assert.deepEqual(
			toSet(...Solver.solve({
				rows: 2,
				columns: 2,
				numbers: [
					{ x: 0, y: 0, number: 2 },
					{ x: 1, y: 1, number: 2 },
				]
			})),
			new Set([
				new Set([
					[0, 0, 1, 2],
					[1, 0, 1, 2],
				]),
				new Set([
					[0, 0, 2, 1],
					[0, 1, 2, 1],
				]),
			])
		);
	});

	// .2
	// 2.
	it('No.4 を解けること。', () => {
		assert.deepEqual(
			toSet(...Solver.solve({
				rows: 2,
				columns: 2,
				numbers: [
					{ x: 1, y: 0, number: 2 },
					{ x: 0, y: 1, number: 2 },
				]
			})),
			new Set([
				new Set([
					[0, 0, 1, 2],
					[1, 0, 1, 2],
				]),
				new Set([
					[0, 0, 2, 1],
					[0, 1, 2, 1],
				]),
			])
		);
	});

	it('https://en.wikipedia.org/wiki/Shikaku の例題を解けること。', () => {
		assert.deepEqual(
			toSet(...Solver.solve({
				rows: 11,
				columns: 11,
				numbers: [
					{ x: 1, y: 0, number: 4 },
					{ x: 0, y: 1, number: 2 },
					{ x: 1, y: 1, number: 4 },
					{ x: 4, y: 1, number: 3 },
					{ x: 7, y: 2, number: 16 },
					{ x: 0, y: 3, number: 6 },
					{ x: 1, y: 3, number: 5 },
					{ x: 2, y: 3, number: 2 },
					{ x: 3, y: 3, number: 4 },
					{ x: 6, y: 3, number: 4 },
					{ x: 4, y: 4, number: 2 },
					{ x: 5, y: 4, number: 5 },
					{ x: 8, y: 4, number: 2 },
					{ x: 10, y: 4, number: 7 },
					{ x: 2, y: 5, number: 2 },
					{ x: 5, y: 5, number: 2 },
					{ x: 6, y: 5, number: 4 },
					{ x: 8, y: 5, number: 2 },
					{ x: 4, y: 6, number: 16 },
					{ x: 4, y: 8, number: 12 },
					{ x: 6, y: 8, number: 6 },
					{ x: 0, y: 9, number: 2 },
					{ x: 9, y: 9, number: 9 },
				]
			})),
			new Set([
				new Set([
					[0, 0, 4, 1],
					[4, 0, 1, 3],
					[5, 0, 1, 5],
					[6, 0, 1, 4],
					[7, 0, 4, 4],
					[0, 1, 1, 2],
					[1, 1, 2, 2],
					[3, 1, 1, 4],
					[0, 3, 1, 6],
					[1, 3, 1, 5],
					[2, 3, 1, 2],
					[4, 3, 1, 2],
					[6, 4, 2, 2],
					[8, 4, 2, 1],
					[10, 4, 1, 7],
					[2, 5, 2, 1],
					[4, 5, 2, 1],
					[8, 5, 2, 1],
					[2, 6, 8, 2],
					[1, 8, 4, 3],
					[5, 8, 2, 3],
					[7, 8, 3, 3],
					[0, 9, 1, 2],
				]),
			])
		);
	});

	it('http://www.geocities.jp/tsukulunker/old/puz/puz.html の 2012/01/25 作成の問題を解けること。', () => {
		assert.deepEqual(
			toSet(...Solver.solve({
				rows: 10,
				columns: 10,
				numbers: [
					{ x: 1, y: 0, number: 4 },
					{ x: 5, y: 0, number: 4 },
					{ x: 7, y: 1, number: 6 },
					{ x: 2, y: 2, number: 6 },
					{ x: 5, y: 2, number: 2 },
					{ x: 0, y: 3, number: 3 },
					{ x: 3, y: 3, number: 5 },
					{ x: 6, y: 3, number: 5 },
					{ x: 1, y: 4, number: 4 },
					{ x: 5, y: 4, number: 2 },
					{ x: 7, y: 4, number: 3 },
					{ x: 2, y: 5, number: 2 },
					{ x: 4, y: 5, number: 4 },
					{ x: 8, y: 5, number: 4 },
					{ x: 3, y: 6, number: 5 },
					{ x: 6, y: 6, number: 5 },
					{ x: 9, y: 6, number: 5 },
					{ x: 4, y: 7, number: 2 },
					{ x: 7, y: 7, number: 6 },
					{ x: 2, y: 8, number: 12 },
					{ x: 4, y: 9, number: 5 },
					{ x: 8, y: 9, number: 6 },
				]
			})),
			new Set([
				new Set([
					[0, 0, 4, 1],
					[4, 0, 2, 2],
					[6, 0, 1, 5],
					[7, 0, 3, 2],
					[0, 1, 1, 3],
					[1, 1, 3, 2],
					[4, 2, 2, 1],
					[7, 2, 1, 3],
					[8, 2, 1, 4],
					[9, 2, 1, 5],
					[1, 3, 5, 1],
					[0, 4, 2, 2],
					[2, 4, 1, 2],
					[3, 4, 1, 5],
					[4, 4, 2, 1],
					[4, 5, 4, 1],
					[0, 6, 3, 4],
					[4, 6, 5, 1],
					[4, 7, 1, 2],
					[5, 7, 3, 2],
					[8, 7, 2, 3],
					[3, 9, 5, 1],
				]),
			])
		);
	});
});

describe('VERSION', () => {
	it('バージョン番号を取得できること。', () => {
		assert.strictEqual(Solver.VERSION, '0.0.1');
	});
});
