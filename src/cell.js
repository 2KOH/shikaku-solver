module.exports = class {
	constructor({ number = null, decided = false } = {}) {
		this._number = number;
		this._decided = !!decided;
	}

	get number() {
		// 数字を返す。
		// 数字マスでない場合は不定。
		return this._number;
	}

	set number(value) {
		// 数字を設定する。
		this._number = value;
	}

	get decided() {
		// 確定マスかを返す。
		return this._decided;
	}

	set decided(value) {
		// 確定マスかを設定する。
		this._decided = !!value;
	}

	isNumber() {
		// 未確定の数字マスかを返す。
		return this._number != null && !this._decided;
	}

	isVoid() {
		// 未確定の空きマスかを返す。
		return this._number == null && !this._decided;
	}
};
