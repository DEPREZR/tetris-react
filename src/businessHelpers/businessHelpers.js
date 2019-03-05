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
  gameBoardData
    .slice(2)
    .forEach((gameBoardDataLine, indexGameBoardDataLine) => {
      gameBoardDataLine.forEach((gameBoardDataCell, indexGameBoardDataCell) => {
        gameBoardDataCell &&
          drawSquare({
            ctx,
            x: indexGameBoardDataCell * sideSquare,
            y: indexGameBoardDataLine * sideSquare,
            color: gameBoardDataCell.color,
            sideSquare
          });
      });
    });

export const drawColumns = ({ ctx, sideSquare, nbColumns }) => {
  const initY = 0;

  for (var i = 0; i < nbColumns; i++) {
    ctx.beginPath();
    ctx.moveTo(sideSquare * i, initY);
    ctx.lineTo(sideSquare * i, ctx.canvas.height);
    ctx.stroke();
  }
};

export const drawLines = ({ ctx, sideSquare, nbLines }) => {
  const initX = 0;

  for (var i = 0; i < nbLines; i++) {
    ctx.beginPath();
    ctx.moveTo(initX, sideSquare * i);
    ctx.lineTo(ctx.canvas.width, sideSquare * i);
    ctx.stroke();
  }
};

export const drawGameBoard = ({ ctx, gameBoardData }) => {
  const nbLines = 20;
  const nbColumns = 10;
  const sideSquare = ctx.canvas.height / nbLines;

  drawLines({ ctx, sideSquare, nbLines });
  drawColumns({ ctx, sideSquare, nbColumns });
  drawAllSquares({ ctx, gameBoardData, sideSquare });
};
