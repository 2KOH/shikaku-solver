const assert = require('assert');
const Solver = require('../src/index.js');

describe('solve', () => {
	// 6..
	// ...
	it('No.1 を解けること。', () => {
		assert.deepEqual(
			new Set(Solver.solve({
				rows: 2,
				columns: 3,
				numbers: [
					{ x: 0, y: 0, number: 6 },
				]
			})),
			new Set([
				new Set([
					{ x: 0, y: 0, width: 3, height: 2 },
				])
			])
		);
	});

	// 24.
	// ...
	it('No.2 を解けること。', () => {
		assert.deepEqual(
			new Set(Solver.solve({
				rows: 2,
				columns: 3,
				numbers: [
					{ x: 0, y: 0, number: 2 },
					{ x: 1, y: 0, number: 4 },
				]
			})),
			new Set([
				new Set([
					{ x: 0, y: 0, width: 1, height: 2 },
					{ x: 1, y: 0, width: 2, height: 2 },
				])
			])
		);
	});

	// 2.
	// .2
	it('No.3 を解けること。', () => {
		assert.deepEqual(
			new Set(Solver.solve({
				rows: 2,
				columns: 2,
				numbers: [
					{ x: 0, y: 0, number: 2 },
					{ x: 1, y: 1, number: 2 },
				]
			})),
			new Set([
				new Set([
					{ x: 0, y: 0, width: 1, height: 2 },
					{ x: 1, y: 0, width: 1, height: 2 },
				]),
				new Set([
					{ x: 0, y: 0, width: 2, height: 1 },
					{ x: 0, y: 1, width: 2, height: 1 },
				]),
			])
		);
	});

	// .2
	// 2.
	it('No.4 を解けること。', () => {
		assert.deepEqual(
			new Set(Solver.solve({
				rows: 2,
				columns: 2,
				numbers: [
					{ x: 1, y: 0, number: 2 },
					{ x: 0, y: 1, number: 2 },
				]
			})),
			new Set([
				new Set([
					{ x: 0, y: 0, width: 1, height: 2 },
					{ x: 1, y: 0, width: 1, height: 2 },
				]),
				new Set([
					{ x: 0, y: 0, width: 2, height: 1 },
					{ x: 0, y: 1, width: 2, height: 1 },
				]),
			])
		);
	});

	it('https://en.wikipedia.org/wiki/Shikaku の例題を解けること。', () => {
		assert.deepEqual(
			new Set(Solver.solve({
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
					{ x: 0, y: 0, width: 4, height: 1 },
					{ x: 4, y: 0, width: 1, height: 3 },
					{ x: 5, y: 0, width: 1, height: 5 },
					{ x: 6, y: 0, width: 1, height: 4 },
					{ x: 7, y: 0, width: 4, height: 4 },
					{ x: 0, y: 1, width: 1, height: 2 },
					{ x: 1, y: 1, width: 2, height: 2 },
					{ x: 3, y: 1, width: 1, height: 4 },
					{ x: 0, y: 3, width: 1, height: 6 },
					{ x: 1, y: 3, width: 1, height: 5 },
					{ x: 2, y: 3, width: 1, height: 2 },
					{ x: 4, y: 3, width: 1, height: 2 },
					{ x: 6, y: 4, width: 2, height: 2 },
					{ x: 8, y: 4, width: 2, height: 1 },
					{ x: 10, y: 4, width: 1, height: 7 },
					{ x: 2, y: 5, width: 2, height: 1 },
					{ x: 4, y: 5, width: 2, height: 1 },
					{ x: 8, y: 5, width: 2, height: 1 },
					{ x: 2, y: 6, width: 8, height: 2 },
					{ x: 1, y: 8, width: 4, height: 3 },
					{ x: 5, y: 8, width: 2, height: 3 },
					{ x: 7, y: 8, width: 3, height: 3 },
					{ x: 0, y: 9, width: 1, height: 2 },
				]),
			])
		);
	});

	it('http://www.geocities.jp/tsukulunker/old/puz/puz.html の 2012/01/25 作成の問題を解けること。', () => {
		assert.deepEqual(
			new Set(Solver.solve({
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
					{ x: 0, y: 0, width: 4, height: 1 },
					{ x: 4, y: 0, width: 2, height: 2 },
					{ x: 6, y: 0, width: 1, height: 5 },
					{ x: 7, y: 0, width: 3, height: 2 },
					{ x: 0, y: 1, width: 1, height: 3 },
					{ x: 1, y: 1, width: 3, height: 2 },
					{ x: 4, y: 2, width: 2, height: 1 },
					{ x: 7, y: 2, width: 1, height: 3 },
					{ x: 8, y: 2, width: 1, height: 4 },
					{ x: 9, y: 2, width: 1, height: 5 },
					{ x: 1, y: 3, width: 5, height: 1 },
					{ x: 0, y: 4, width: 2, height: 2 },
					{ x: 2, y: 4, width: 1, height: 2 },
					{ x: 3, y: 4, width: 1, height: 5 },
					{ x: 4, y: 4, width: 2, height: 1 },
					{ x: 4, y: 5, width: 4, height: 1 },
					{ x: 0, y: 6, width: 3, height: 4 },
					{ x: 4, y: 6, width: 5, height: 1 },
					{ x: 4, y: 7, width: 1, height: 2 },
					{ x: 5, y: 7, width: 3, height: 2 },
					{ x: 8, y: 7, width: 2, height: 3 },
					{ x: 3, y: 9, width: 5, height: 1 },
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
