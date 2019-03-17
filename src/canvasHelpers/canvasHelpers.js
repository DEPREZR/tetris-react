import { findLayer } from 'businessHelpers/businessHelpers';
import { NUMBER_OUTSIDE_LINES } from 'constants.js';

export const drawSquare = ({ ctx, x, y, color, sideSquare }) => {
  const linearGradientBeginning = 0;
  const linearGradientEnding = 1;
  const squareBorder = 5;
  const squareThickness = 1.2;

  const squareLineargradient = ctx.createLinearGradient(
    x + sideSquare / 2,
    y - sideSquare / 2,
    x + sideSquare / 2,
    y + sideSquare
  );

  squareLineargradient.addColorStop(linearGradientBeginning, 'white');
  squareLineargradient.addColorStop(linearGradientEnding, color);

  ctx.fillStyle = squareLineargradient;
  ctx.fillRect(x, y, sideSquare, sideSquare);

  ctx.lineWidth = squareThickness;
  ctx.strokeRect(x, y, sideSquare, sideSquare);
  ctx.strokeRect(
    x + squareBorder,
    y + squareBorder,
    sideSquare - squareBorder * 2,
    sideSquare - squareBorder * 2
  );
};

export const drawAllSquares = ({ ctx, gameBoardData, sideSquare }) =>
  gameBoardData.forEach(gameBoardDataCell => {
    const y = gameBoardDataCell.y - NUMBER_OUTSIDE_LINES;

    if (y >= 0)
      drawSquare({
        ctx,
        x: gameBoardDataCell.x * sideSquare,
        y: y * sideSquare,
        color: gameBoardDataCell.color,
        sideSquare
      });
  });

export const drawColumns = ({ ctx, sideSquare, nbColumns }) => {
  const initY = 0;

  for (var i = 1; i < nbColumns; i++) {
    ctx.beginPath();
    ctx.moveTo(sideSquare * i, initY);
    ctx.lineTo(sideSquare * i, ctx.canvas.height);
    ctx.stroke();
  }
};

export const drawLines = ({ ctx, sideSquare, nbLines }) => {
  const initX = 0;

  for (var i = 1; i < nbLines; i++) {
    ctx.beginPath();
    ctx.moveTo(initX, sideSquare * i);
    ctx.lineTo(ctx.canvas.width, sideSquare * i);
    ctx.stroke();
  }
};

export const drawGameBoardBackground = ({ ctx }) => {
  const nbLines = 20;
  const nbColumns = 10;
  const sideSquare = ctx.canvas.height / nbLines;

  drawLines({ ctx, sideSquare, nbLines });
  drawColumns({ ctx, sideSquare, nbColumns });
};

export const drawGameBoard = ({ ctx, gameBoardData }) => {
  const nbLines = 20;
  const sideSquare = ctx.canvas.height / nbLines;

  ctx.clearRect(0, 0, 300, 600);

  drawAllSquares({ ctx, gameBoardData, sideSquare });
};

export const drawTetromino = ({ ctx, tetrominoData }) => {
  const nbLines = 20;
  const sideSquare = ctx.canvas.height / nbLines;
  const tetrominoLayer = findLayer(tetrominoData);
  const { x: initialX, y: initialY } = tetrominoData.position;

  ctx.clearRect(0, 0, 300, 600);

  tetrominoLayer.forEach(tetrominoDataCell => {
    const y = tetrominoDataCell.y + initialY - NUMBER_OUTSIDE_LINES;

    if (y >= 0)
      drawSquare({
        ctx,
        x: (tetrominoDataCell.x + initialX) * sideSquare,
        y: y * sideSquare,
        color: tetrominoDataCell.color,
        sideSquare
      });
  });
};

export const drawNextTetrominos = ({ nextTetrominos, ctx }) => {
  const sideSquare = 16;

  ctx.clearRect(0, 0, 100, 600);

  nextTetrominos.forEach((nextTetromino, index) => {
    drawTetrominoInNextTetromino({
      tetrominoData: nextTetromino,
      ctx,
      index,
      sideSquare
    });
  });
};

export const drawTetrominoInNextTetromino = ({
  tetrominoData,
  ctx,
  index,
  sideSquare
}) => {
  const border = sideSquare;

  tetrominoData.layers[0].layer.forEach(tetrominoDataCell => {
    drawSquare({
      ctx,
      x: tetrominoDataCell.x * sideSquare + border,
      y: (tetrominoDataCell.y + index * 5) * sideSquare + border,
      color: tetrominoDataCell.color,
      sideSquare
    });
  });
};
