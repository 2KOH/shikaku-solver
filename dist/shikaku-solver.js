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
    this.numbers.push({
      x,
      y,
      number
    });
  }

  getState() {
    const state = new State();

    for (let i = 0; i < this.rows * this.columns; i++) {
      state.addCell(i);
    }

    const cells = [...new Array(this.rows)].map(() => new Array(this.columns).fill(false));
    this.numbers.forEach(({
      x,
      y
    }) => {
      cells[y][x] = true;
    });
    this.numbers.forEach(({
      x,
      y,
      number
    }) => {
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

        for (let y0 = Math.max(upperLimit, y - height + 1); y0 <= Math.min(y, lowerLimit - height + 1); y0++) {
          const leftLimit = Math.max(...leftLimits.slice(y0, y0 + height));
          const rightLimit = Math.min(...rightLimits.slice(y0, y0 + height));

          for (let x0 = Math.max(leftLimit, x - width + 1); x0 <= Math.min(x, rightLimit - width + 1); x0++) {
            state.addCandidateArea({
              x: x0,
              y: y0,
              width,
              height
            }, [...new Array(width * height)].map((_, i) => x0 + i % width + (y0 + ~~(i / width)) * this.columns));
          }
        }
      }
    });
    return state;
  }

};

},{"./state.js":3}],2:[function(require,module,exports){
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
      areas
    } of search(state)) {
      yield areas;
    }
  }

  static get VERSION() {
    return '0.0.2';
  }

};

},{"./board.js":1,"./utilities.js":4}],3:[function(require,module,exports){
module.exports = class {
  constructor({
    cells = [],
    areas = [],
    candidateAreas = []
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
    this.cells.set(cell, new Set());
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

},{}],4:[function(require,module,exports){
const State = require('./state.js');

const tryState = function* (state) {
  // 仮定した state を繰り返す。
  const min = [...state.cells].map( // 最も候補領域の少ないセルを取得する。
  ([k, v]) => [k, v.size]).reduce((a, b) => a[1] <= b[1] ? a : b)[0];

  for (const area of state.cells.get(min)) {
    yield new State(state).decideArea(area);
  }
};

const isFinished = state => {
  return state.cells.size === 0;
};

const isFailed = state => {
  return state.failed;
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
  tryState,
  isFinished,
  search
};

},{"./state.js":3}]},{},[2])(2)
});
