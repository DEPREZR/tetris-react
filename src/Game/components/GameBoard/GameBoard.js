import React, { useRef, useContext, useEffect } from 'react';
import { GameContext } from 'Game';
import { drawGameBoard } from 'canvasHelpers/canvasHelpers';

const GameBoard = () => {
  const { gameBoardData, tetrominoData } = useContext(GameContext);
  const refCanvasTetris = useRef(null);

  useEffect(() => {
    const ctx = refCanvasTetris.current.getContext('2d');

    drawGameBoard({ ctx, gameBoardData, tetrominoData });
  }, [refCanvasTetris, gameBoardData, tetrominoData]);

  return (
    <canvas
      ref={refCanvasTetris}
      width={300}
      height={600}
      style={{ border: '2px solid black' }}
    />
  );
};

export default GameBoard;
