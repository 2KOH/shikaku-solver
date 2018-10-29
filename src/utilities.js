const State = require('./state.js');

const getNotVoids = (cells, index, a, b) => {
	// 指定したセル番号から順に右のセルを見ていき、最も左とその次にある void でないセル二つが、指定したセルから何番目かを返す。
	// ただし、二つ目が a 以降である場合は、最も左のもの一つだけ返す。
	// また、一つ目が b 以降である場合は、空の配列を返す。
	const result = [];
	for (
		let i = 0;
		result.length < 2 && !(b != null && i >= b) && !(a != null && result.length >= 1 && i >= a);
		i++
	) {
		if (cells[index + i].isVoid()) {
			continue;
		}
		result.push(i);
	}
	return result;
}

const tryState = function*(state) {
	// 左上のマスに四角形を配置した state を繰り返す。

	const base = state.getFirstUndecidedCell();
	const { width, cells } = state;
	const x = base % width;
	const y = ~~(base / width);
	let firstNotVoidPosition = null;
	let firstNotVoidNumber = null;
	let secondNotVoidPosition = null;

	for (let i = 0; !cells[base + i * width].decided; i++) {
		const h = i + 1;
		const base2 = base + i * width;

		// firstNotVoidPosition 等の変数を更新。
		const notVoids = getNotVoids(cells, base2, firstNotVoidPosition, secondNotVoidPosition);
		switch (notVoids.length) {
			case 0: {
				break;
			}
			case 1: {
				if (firstNotVoidPosition <= notVoids[0]) {
					secondNotVoidPosition = notVoids[0];
					break;
				}
				secondNotVoidPosition = firstNotVoidPosition;
				firstNotVoidPosition = notVoids[0];
				firstNotVoidNumber =
					cells[base2 + firstNotVoidPosition].decided ?
					null :
					cells[base2 + firstNotVoidPosition].number;
				break;
			}
			default: {
				firstNotVoidPosition = notVoids[0];
				firstNotVoidNumber =
					cells[base2 + firstNotVoidPosition].decided ?
					null :
					cells[base2 + firstNotVoidPosition].number;
				secondNotVoidPosition = notVoids[1];
			}
		}

		if (firstNotVoidNumber == null) {	// 最も左が壁。
			continue;
		}
		if (firstNotVoidPosition === secondNotVoidPosition) {	// 最も左とその次が同じ列。
			continue;
		}
		if (firstNotVoidNumber % h !== 0) {	// 最も左の数字が h で割り切れない。
			continue;
		}
		const w = firstNotVoidNumber / (i + 1);
		if (firstNotVoidPosition + 1 <= w && w < secondNotVoidPosition + 1) {	// 幅が最も左の数字の列からその次の列までの間。
			yield new State(state).addSquare({ x, y, width: w, height: h });
		}
	}
};

const isFinished = (state) => {
	return state.undecidedCells.size === 0;
};

const search = function*(inputState) {
	const stack = [inputState];
	while (stack.length) {
		const state = stack.pop();
		if (isFinished(state)) {
			yield state;
			continue;
		}
		stack.push(...tryState(state));
	}
};

module.exports = { getNotVoids, tryState, isFinished, search };
