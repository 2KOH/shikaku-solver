const State = require('./state.js');

module.exports = class {
	constructor({ rows, columns, numbers = [] } = {}) {
		this._rows = rows;
		this._columns = columns;
		this._numbers = numbers.map(({ x, y, number }) => ({ x, y, number }));
	}

	get rows() {
		return this._rows;
	}

	get columns() {
		return this._columns;
	}

	get numbers() {
		return this._numbers;
	}

	addNumber({ x, y, number }) {
		this._numbers.push({ x, y, number });
	}

	getState() {
		const width = this.columns + 1;
		const cells = [];
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.columns; x++) {
				cells.push({});
			}
			cells.push({ decided: true });
		}
		for (let x = 0; x < this.columns; x++) {
			cells.push({ decided: true });
		}
		this.numbers.forEach(({ x, y, number }) => {
			cells[x + y * width].number = number;
		});
		return new State({ width, cells });
	}

	setState(state) {}
};
