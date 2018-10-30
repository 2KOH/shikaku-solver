const Board = require('./board.js');
const { search } = require('./utilities.js');

module.exports = class {
	static *solve({ rows, columns, numbers }) {
		const state = new Board({ rows, columns, numbers }).getState();
		for (const { areas } of search(state)) {
			yield areas;
		}
	}

	static get VERSION() {
		return '0.0.1';
	}
};
