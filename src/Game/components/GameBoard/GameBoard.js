import React, { useRef, useContext, useEffect } from 'react';
import { GameContext } from 'Game';
import {
  drawGameBoard,
  drawGameBoardBackground
} from 'canvasHelpers/canvasHelpers';

const GameBoard = () => {
  const { gameBoardData, tetrominoData } = useContext(GameContext);
  const refCanvasGameBoard = useRef(null);
  const refCanvasGameBoardBackground = useRef(null);

  useEffect(() => {
    const ctx = refCanvasGameBoardBackground.current.getContext('2d');

    drawGameBoardBackground({ ctx });
  }, [refCanvasGameBoardBackground]);

  useEffect(() => {
    const ctx = refCanvasGameBoard.current.getContext('2d');

    drawGameBoard({ ctx, gameBoardData, tetrominoData });
  }, [refCanvasGameBoard, gameBoardData, tetrominoData]);

  return (
    <div style={{ border: '2px solid black', width: '300px', height: '600px' }}>
      <canvas
        style={{ position: 'absolute', zIndex: '1' }}
        width={300}
        height={600}
        ref={refCanvasGameBoardBackground}
      />
      <canvas
        style={{ position: 'absolute', zIndex: '2' }}
        width={300}
        height={600}
        ref={refCanvasGameBoard}
      />
    </div>
  );
};

export default GameBoard;
