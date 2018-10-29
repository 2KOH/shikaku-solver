(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ShikakuSolver = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const State = require('./state.js');

module.exports = class {
  constructor({
    rows,
    columns,
    numbers = []
  } = {}) {
    this._rows = rows;
    this._columns = columns;
    this._numbers = numbers.map(({
      x,
      y,
      number
    }) => ({
      x,
      y,
      number
    }));
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

  addNumber({
    x,
    y,
    number
  }) {
    this._numbers.push({
      x,
      y,
      number
    });
  }

  getState() {
    const width = this.columns + 1;
    const cells = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        cells.push({});
      }

      cells.push({
        decided: true
      });
    }

    for (let x = 0; x < this.columns; x++) {
      cells.push({
        decided: true
      });
    }

    this.numbers.forEach(({
      x,
      y,
      number
    }) => {
      cells[x + y * width].number = number;
    });
    return new State({
      width,
      cells
    });
  }

  setState(state) {}

};

},{"./state.js":5}],2:[function(require,module,exports){
module.exports = class {
  constructor({
    number = null,
    decided = false
  } = {}) {
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

},{}],3:[function(require,module,exports){
const Board = require('./board.js');

const {
  search
} = require('./utilities.js');

module.exports = class {
  static *solve({
    rows,
    columns,
    numbers
  }) {
    const state = new Board({
      rows,
      columns,
      numbers
    }).getState();

    for (const {
      squares
    } of search(state)) {
      yield squares;
    }
  }

  static get VERSION() {
    return '0.0.1';
  }

};

},{"./board.js":1,"./utilities.js":6}],4:[function(require,module,exports){
module.exports = class {
  constructor({
    x,
    y,
    width,
    height
  } = {}) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

};

},{}],5:[function(require,module,exports){
const Square = require('./square.js');

const Cell = require('./cell.js');

module.exports = class {
  constructor({
    width,
    squares = [],
    cells,
    undecidedCells = null
  } = {}) {
    this._width = width;
    this._squares = squares.map(square => new Square(square));
    this._cells = cells.map(cell => new Cell(cell));

    if (undecidedCells) {
      this._undecidedCells = new Set(undecidedCells);
    } else {
      this._undecidedCells = new Set();

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

  addSquare({
    x,
    y,
    width,
    height
  }) {
    this.squares.push(new Square({
      x,
      y,
      width,
      height
    }));
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

},{"./cell.js":2,"./square.js":4}],6:[function(require,module,exports){
const State = require('./state.js');

const getNotVoids = (cells, index, a, b) => {
  // 指定したセル番号から順に右のセルを見ていき、最も左とその次にある void でないセル二つが、指定したセルから何番目かを返す。
  // ただし、二つ目が a 以降である場合は、最も左のもの一つだけ返す。
  // また、一つ目が b 以降である場合は、空の配列を返す。
  const result = [];

  for (let i = 0; result.length < 2 && !(b != null && i >= b) && !(a != null && result.length >= 1 && i >= a); i++) {
    if (cells[index + i].isVoid()) {
      continue;
    }

    result.push(i);
  }

  return result;
};

const tryState = function* (state) {
  // 左上のマスに四角形を配置した state を繰り返す。
  const base = state.getFirstUndecidedCell();
  const {
    width,
    cells
  } = state;
  const x = base % width;
  const y = ~~(base / width);
  let firstNotVoidPosition = null;
  let firstNotVoidNumber = null;
  let secondNotVoidPosition = null;

  for (let i = 0; !cells[base + i * width].decided; i++) {
    const h = i + 1;
    const base2 = base + i * width; // firstNotVoidPosition 等の変数を更新。

    const notVoids = getNotVoids(cells, base2, firstNotVoidPosition, secondNotVoidPosition);

    switch (notVoids.length) {
      case 0:
        {
          break;
        }

      case 1:
        {
          if (firstNotVoidPosition <= notVoids[0]) {
            secondNotVoidPosition = notVoids[0];
            break;
          }

          secondNotVoidPosition = firstNotVoidPosition;
          firstNotVoidPosition = notVoids[0];
          firstNotVoidNumber = cells[base2 + firstNotVoidPosition].decided ? null : cells[base2 + firstNotVoidPosition].number;
          break;
        }

      default:
        {
          firstNotVoidPosition = notVoids[0];
          firstNotVoidNumber = cells[base2 + firstNotVoidPosition].decided ? null : cells[base2 + firstNotVoidPosition].number;
          secondNotVoidPosition = notVoids[1];
        }
    }

    if (firstNotVoidNumber == null) {
      // 最も左が壁。
      continue;
    }

    if (firstNotVoidPosition === secondNotVoidPosition) {
      // 最も左とその次が同じ列。
      continue;
    }

    if (firstNotVoidNumber % h !== 0) {
      // 最も左の数字が h で割り切れない。
      continue;
    }

    const w = firstNotVoidNumber / (i + 1);

    if (firstNotVoidPosition + 1 <= w && w < secondNotVoidPosition + 1) {
      // 幅が最も左の数字の列からその次の列までの間。
      yield new State(state).addSquare({
        x,
        y,
        width: w,
        height: h
      });
    }
  }
};

const isFinished = state => {
  return state.undecidedCells.size === 0;
};

const search = function* (inputState) {
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

module.exports = {
  getNotVoids,
  tryState,
  isFinished,
  search
};

},{"./state.js":5}]},{},[3])(3)
});
