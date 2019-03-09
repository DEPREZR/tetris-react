import React, { useRef, useContext, useEffect } from 'react';
import { GameContext } from 'Game';
import {
  drawGameBoard,
  drawTetromino,
  drawGameBoardBackground
} from 'canvasHelpers/canvasHelpers';

const GameBoard = () => {
  const { gameBoardData, tetrominoData } = useContext(GameContext);
  const refCanvasGameBoard = useRef(null);
  const refCanvasGameBoardBackground = useRef(null);
  const refCanvasTetromino = useRef(null);

  useEffect(() => {
    const ctx = refCanvasGameBoardBackground.current.getContext('2d');

    drawGameBoardBackground({ ctx });
  }, []);

  useEffect(() => {
    const ctx = refCanvasGameBoard.current.getContext('2d');

    drawGameBoard({ ctx, gameBoardData });
  }, [gameBoardData]);

  useEffect(() => {
    const ctx = refCanvasTetromino.current.getContext('2d');

    drawTetromino({ ctx, tetrominoData });
  }, [tetrominoData]);

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
      <canvas
        style={{ position: 'absolute', zIndex: '3' }}
        width={300}
        height={600}
        ref={refCanvasTetromino}
      />
    </div>
  );
};

export default GameBoard;
