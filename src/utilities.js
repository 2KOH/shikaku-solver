const State = require('./state.js');

const tryState = function*(state) {
	// 仮定した state を繰り返す。

	const min = [...state.cells].map(	// 最も候補領域の少ないセルを取得する。
		([k, v]) => [k, v.size]
	).reduce(
		(a, b) => (a[1] <= b[1] ? a : b)
	)[0];
	for (const area of state.cells.get(min)) {
		yield new State(state).decideArea(area);
	}
};

const isFinished = (state) => {
	return state.cells.size === 0;
};

const isFailed = (state) => {
	return state.failed;
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

module.exports = { tryState, isFinished, search };
