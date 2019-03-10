import { T_TETROMINO_LAYERS, NUMBER_OUTSIDE_LINES } from 'constants.js';

export const tetrominoDataFixtures = [
  {
    position: { x: 3, y: NUMBER_OUTSIDE_LINES - 2 },
    layers: T_TETROMINO_LAYERS,
    currentLayerIndex: 0
  },
  {
    position: { x: 3, y: NUMBER_OUTSIDE_LINES - 2 },
    layers: T_TETROMINO_LAYERS,
    currentLayerIndex: 1
  },
  {
    position: { x: 3, y: NUMBER_OUTSIDE_LINES - 2 },
    layers: T_TETROMINO_LAYERS,
    currentLayerIndex: 0
  }
];
