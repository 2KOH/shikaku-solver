module.exports = class {
	constructor({
		cells = [],
		areas = [],
		candidateAreas = [],
	} = {}) {
		this._cells = new Map([...cells].map(([k, v]) => [k, new Set(v)]));
		this._areas = new Set(areas);
		this._candidateAreas = new Map([...candidateAreas].map(([k, v]) => [k, new Set(v)]));
	}

	get cells() {
		// 未確定のセル一覧で、セルをキー、そのセルを含む候補領域一覧を表すセットを値としたマップ。
		return this._cells;
	}

	get areas() {
		// 確定済みの領域一覧を表すセット。
		return this._areas;
	}

	get candidateAreas() {
		// 候補領域一覧で、領域をキー、その領域に含まれるセル一覧を表すセットを値としたマップ。
		return this._candidateAreas;
	}

	addCell(cell) {
		// 未確定のセルを追加する。
		// 引数の正当性チェックは行わない。
		this.cells.set(cell, new Set);
		return this;
	}

	addCandidateArea(area, cells) {
		// 候補領域を追加する。
		// 引数の正当性チェックは行わない。
		// （area がすでに this.candidateAreas に含まれているとか、cells に this.cells に含まれていないものがあるとか）
		this.candidateAreas.set(area, new Set(cells));
		for (const cell of cells) {
			this.cells.get(cell).add(area);
		}
		return this;
	}

	decideArea(area) {
		// 領域を確定する。
		const cells = new Set(this.candidateAreas.get(area));
		for (const cell of cells) {
			for (const a of this.cells.get(cell)) {
				for (const c of this.candidateAreas.get(a)) {
					this.cells.get(c).delete(a);
				}
				this.candidateAreas.delete(a);
			}
			this.cells.delete(cell);
		}
		this.candidateAreas.delete(area);
		this.areas.add(area);
		return this;
	}
};
