export const INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED = 100;
export const LOCK_DOWN_TIME = 500;
export const INTERVALS_AUTO_DOWN = [
  1000,
  793,
  618,
  473,
  355,
  262,
  190,
  135,
  94,
  64,
  43,
  28,
  18,
  11,
  7
];
export const NUMBER_OUTSIDE_LINES = 20;
export const T_TETROMINO_LAYERS = [
  {
    layer: [
      { color: 'purple', x: 1, y: 0 },
      { color: 'purple', x: 0, y: 1 },
      { color: 'purple', x: 1, y: 1 },
      { color: 'purple', x: 2, y: 1 }
    ],
    rightShifts: [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: -1, y: 2 }],
    leftShifts: [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 1, y: 2 }]
  },
  {
    layer: [
      { color: 'purple', x: 1, y: 0 },
      { color: 'purple', x: 1, y: 1 },
      { color: 'purple', x: 2, y: 1 },
      { color: 'purple', x: 1, y: 2 }
    ],
    rightShifts: [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: -2 },
      { x: 1, y: -2 }
    ],
    leftShifts: [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: -2 },
      { x: 1, y: -1 }
    ]
  },
  {
    layer: [
      { color: 'purple', x: 0, y: 1 },
      { color: 'purple', x: 1, y: 1 },
      { color: 'purple', x: 2, y: 1 },
      { color: 'purple', x: 1, y: 2 }
    ],
    rightShifts: [{ x: 1, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    leftShifts: [{ x: -1, y: 0 }, { x: 0, y: 2 }, { x: -1, y: 2 }]
  },
  {
    layer: [
      { color: 'purple', x: 1, y: 0 },
      { color: 'purple', x: 0, y: 1 },
      { color: 'purple', x: 1, y: 1 },
      { color: 'purple', x: 1, y: 2 }
    ],
    rightShifts: [
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -2 },
      { x: -1, y: -2 }
    ],
    leftShifts: [
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -2 },
      { x: -1, y: -2 }
    ]
  }
];
export const INITIAL_T_TETROMINO = {
  position: { x: 3, y: -2 + NUMBER_OUTSIDE_LINES },
  layers: T_TETROMINO_LAYERS,
  currentLayerIndex: 0
};
export const I_TETROMINO_LAYERS = [
  {
    layer: [
      { color: 'cyan', x: 0, y: 1 },
      { color: 'cyan', x: 1, y: 1 },
      { color: 'cyan', x: 2, y: 1 },
      { color: 'cyan', x: 3, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'cyan', x: 2, y: 0 },
      { color: 'cyan', x: 2, y: 1 },
      { color: 'cyan', x: 2, y: 2 },
      { color: 'cyan', x: 2, y: 3 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'cyan', x: 0, y: 2 },
      { color: 'cyan', x: 1, y: 2 },
      { color: 'cyan', x: 2, y: 2 },
      { color: 'cyan', x: 3, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'cyan', x: 1, y: 0 },
      { color: 'cyan', x: 1, y: 1 },
      { color: 'cyan', x: 1, y: 2 },
      { color: 'cyan', x: 1, y: 3 }
    ],
    rightShifts: [],
    leftShifts: []
  }
];
export const INITIAL_I_TETROMINO = {
  position: { x: 3, y: -2 + NUMBER_OUTSIDE_LINES },
  layers: I_TETROMINO_LAYERS,
  currentLayerIndex: 0
};
export const O_TETROMINO_LAYERS = [
  {
    layer: [
      { color: 'yellow', x: 1, y: 0 },
      { color: 'yellow', x: 2, y: 0 },
      { color: 'yellow', x: 1, y: 1 },
      { color: 'yellow', x: 2, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'yellow', x: 1, y: 0 },
      { color: 'yellow', x: 2, y: 0 },
      { color: 'yellow', x: 1, y: 1 },
      { color: 'yellow', x: 2, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'yellow', x: 1, y: 0 },
      { color: 'yellow', x: 2, y: 0 },
      { color: 'yellow', x: 1, y: 1 },
      { color: 'yellow', x: 2, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'yellow', x: 1, y: 0 },
      { color: 'yellow', x: 2, y: 0 },
      { color: 'yellow', x: 1, y: 1 },
      { color: 'yellow', x: 2, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  }
];
export const INITIAL_O_TETROMINO = {
  position: { x: 3, y: -2 + NUMBER_OUTSIDE_LINES },
  layers: O_TETROMINO_LAYERS,
  currentLayerIndex: 0
};
export const L_TETROMINO_LAYERS = [
  {
    layer: [
      { color: 'orange', x: 2, y: 0 },
      { color: 'orange', x: 0, y: 1 },
      { color: 'orange', x: 1, y: 1 },
      { color: 'orange', x: 2, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'orange', x: 1, y: 0 },
      { color: 'orange', x: 1, y: 1 },
      { color: 'orange', x: 1, y: 2 },
      { color: 'orange', x: 2, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'orange', x: 0, y: 1 },
      { color: 'orange', x: 1, y: 1 },
      { color: 'orange', x: 2, y: 1 },
      { color: 'orange', x: 0, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'orange', x: 0, y: 0 },
      { color: 'orange', x: 1, y: 0 },
      { color: 'orange', x: 1, y: 1 },
      { color: 'orange', x: 1, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  }
];
export const INITIAL_L_TETROMINO = {
  position: { x: 3, y: -2 + NUMBER_OUTSIDE_LINES },
  layers: L_TETROMINO_LAYERS,
  currentLayerIndex: 0
};
export const J_TETROMINO_LAYERS = [
  {
    layer: [
      { color: 'darkblue', x: 0, y: 0 },
      { color: 'darkblue', x: 0, y: 1 },
      { color: 'darkblue', x: 1, y: 1 },
      { color: 'darkblue', x: 2, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'darkblue', x: 1, y: 0 },
      { color: 'darkblue', x: 2, y: 0 },
      { color: 'darkblue', x: 1, y: 1 },
      { color: 'darkblue', x: 1, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'darkblue', x: 0, y: 1 },
      { color: 'darkblue', x: 1, y: 1 },
      { color: 'darkblue', x: 2, y: 1 },
      { color: 'darkblue', x: 2, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'darkblue', x: 1, y: 0 },
      { color: 'darkblue', x: 1, y: 1 },
      { color: 'darkblue', x: 0, y: 2 },
      { color: 'darkblue', x: 1, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  }
];
export const INITIAL_J_TETROMINO = {
  position: { x: 3, y: -2 + NUMBER_OUTSIDE_LINES },
  layers: J_TETROMINO_LAYERS,
  currentLayerIndex: 0
};
export const Z_TETROMINO_LAYERS = [
  {
    layer: [
      { color: 'red', x: 0, y: 0 },
      { color: 'red', x: 1, y: 0 },
      { color: 'red', x: 1, y: 1 },
      { color: 'red', x: 2, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'red', x: 2, y: 0 },
      { color: 'red', x: 1, y: 1 },
      { color: 'red', x: 2, y: 1 },
      { color: 'red', x: 1, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'red', x: 0, y: 1 },
      { color: 'red', x: 1, y: 1 },
      { color: 'red', x: 1, y: 2 },
      { color: 'red', x: 2, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'red', x: 1, y: 0 },
      { color: 'red', x: 0, y: 1 },
      { color: 'red', x: 1, y: 1 },
      { color: 'red', x: 0, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  }
];
export const INITIAL_Z_TETROMINO = {
  position: { x: 3, y: -2 + NUMBER_OUTSIDE_LINES },
  layers: Z_TETROMINO_LAYERS,
  currentLayerIndex: 0
};
export const S_TETROMINO_LAYERS = [
  {
    layer: [
      { color: 'lime', x: 1, y: 0 },
      { color: 'lime', x: 2, y: 0 },
      { color: 'lime', x: 0, y: 1 },
      { color: 'lime', x: 1, y: 1 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'lime', x: 1, y: 0 },
      { color: 'lime', x: 1, y: 1 },
      { color: 'lime', x: 2, y: 1 },
      { color: 'lime', x: 2, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'lime', x: 1, y: 1 },
      { color: 'lime', x: 2, y: 1 },
      { color: 'lime', x: 0, y: 2 },
      { color: 'lime', x: 1, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  },
  {
    layer: [
      { color: 'lime', x: 0, y: 0 },
      { color: 'lime', x: 0, y: 1 },
      { color: 'lime', x: 1, y: 1 },
      { color: 'lime', x: 1, y: 2 }
    ],
    rightShifts: [],
    leftShifts: []
  }
];
export const INITIAL_S_TETROMINO = {
  position: { x: 3, y: -2 + NUMBER_OUTSIDE_LINES },
  layers: S_TETROMINO_LAYERS,
  currentLayerIndex: 0
};
