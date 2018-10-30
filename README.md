# shikaku-solver

## 概要
[四角に切れ](https://www.nikoli.co.jp/ja/puzzles/shikaku/)の解を探索する JavaScript のプログラムです。ES2015 以降の文法を使っているので、古いブラウザでは動作しません。

## 使い方

### Node.js
```
const Solver = require('shikaku-solver');

console.log([...Solver.solve({
	rows: 2,
	columns: 3,
	numbers: [
		{ x: 0, y: 0, number: 2 },
		{ x: 2, y: 1, number: 4 },
	]
})]);
```

### ブラウザ
```
// shikaku-solver.js を読み込んでおく。

console.log([...ShikakuSolver.solve({
	rows: 2,
	columns: 3,
	numbers: [
		{ x: 0, y: 0, number: 2 },
		{ x: 2, y: 1, number: 4 },
	]
})]);
```

## デモ
https://2koh.github.io/shikaku-solver/

## アルゴリズムのメモ
いわゆる手筋は未実装（ただし、詳しくは後述するが、初級手筋実装と同等の状態である）。

探索順は、深さ優先探索。
盤面に四角形を当てはめていき、全マス埋まったら完成、という方法。

予め各数字を満たすすべての四角形を計算しておき、四角形を当てはめる順番を、そのマスを含む四角形候補の少ないマスから行うことにより高速化を図っている。
そのため、手筋は未実装ではあるが、実質「あるマスを含む四角形が一通りしかない場合はその四角形に確定する」という手筋を実装している場合と同等となっている。

## その他のメモ
たぶん、board.js の getState 関数をいじるだけで、ウォールロジックソルバーになると思う。

## ライセンス
MIT
