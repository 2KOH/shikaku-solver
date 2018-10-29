const Square = require('./square.js');
const Cell = require('./cell.js');

module.exports = class {
	constructor({ width, squares = [], cells, undecidedCells = null } = {}) {
		this._width = width;
		this._squares = squares.map((square) => new Square(square));
		this._cells = cells.map((cell) => new Cell(cell));
		if (undecidedCells) {
			this._undecidedCells = new Set(undecidedCells);
		} else {
			this._undecidedCells = new Set;
			this._cells.forEach((cell, i) => {
				if (!cell.decided) {
					this._undecidedCells.add(i);
				}
			});
		}
	}

	get width() {
		return this._width;
	}

	get squares() {
		return this._squares;
	}

	get cells() {
		return this._cells;
	}

	get undecidedCells() {
		// 未確定のセル番号一覧。
		return this._undecidedCells;
	}

	addSquare({ x, y, width, height }) {
		this.squares.push(new Square({ x, y, width, height }));
		const base = this.getFirstUndecidedCell();
		for (let j = 0; j < height; j++) {
			const base2 = base + j * this.width;
			for (let i = 0; i < width; i++) {
				const index = base2 + i;
				this.cells[index].decided = true;
				this.undecidedCells.delete(index);
			}
		}
		return this;
	}

	getFirstUndecidedCell() {
		// 最も左上にある未確定のセル番号を返す。
		return this.undecidedCells.values().next().value;
	}
};
