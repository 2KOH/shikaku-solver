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
		this.numbers.push({ x, y, number });
	}

	getState() {
		const state = new State;
		for (let i = 0; i < this.rows * this.columns; i++) {
			state.addCell(i);
		}

		const cells = [...(new Array(this.rows))].map(() => new Array(this.columns).fill(false));
		this.numbers.forEach(({ x, y }) => {
			cells[y][x] = true;
		});

		this.numbers.forEach(({ x, y, number }) => {
			const upperLimit = (() => {
				for (let j = y - 1;; j--) {
					if (j < 0 || cells[j][x]) return j + 1;
				}
			})();
			const lowerLimit = (() => {
				for (let j = y + 1;; j++) {
					if (j >= this.rows || cells[j][x]) return j - 1;
				}
			})();
			const leftLimits = [];
			const rightLimits = [];
			for (let j = upperLimit; j <= lowerLimit; j++) {
				for (let i = x - 1;; i--) {
					if (i < 0 || cells[j][i]) {
						leftLimits[j] = i + 1;
						break;
					}
				}
				for (let i = x + 1;; i++) {
					if (i >= this.columns || cells[j][i]) {
						rightLimits[j] = i - 1;
						break;
					}
				}
			}

			for (let height = 1; height <= lowerLimit - upperLimit + 1; height++) {
				if (number % height !== 0) continue;
				const width = number / height;
				for (
					let y0 = Math.max(upperLimit, y - height + 1);
					y0 <= Math.min(y, lowerLimit - height + 1);
					y0++
				) {
					const leftLimit = Math.max(...leftLimits.slice(y0, y0 + height));
					const rightLimit = Math.min(...rightLimits.slice(y0, y0 + height));
					for (
						let x0 = Math.max(leftLimit, x - width + 1);
						x0 <= Math.min(x, rightLimit - width + 1);
						x0++
					) {
						state.addCandidateArea(
							{ x: x0, y: y0, width, height },
							[...(new Array(width * height))].map((_, i) => (x0 + (i % width)) + (y0 + ~~(i / width)) * this.columns)
						);
					}
				}
			}
		});

		return state;
	}
};
