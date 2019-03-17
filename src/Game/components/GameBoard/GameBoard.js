import React, { useRef, useContext, useEffect } from 'react';
import { GameContext } from 'Game';
import { TetrominosContext } from 'TetrominosProvider';
import {
  drawGameBoard,
  drawTetromino,
  drawGameBoardBackground,
  drawNextTetrominos
} from 'canvasHelpers/canvasHelpers';

const GameBoard = () => {
  const { gameBoardData, tetrominoData, removedLines, level } = useContext(
    GameContext
  );
  const { nextTetrominos } = useContext(TetrominosContext);
  const refCanvasGameBoard = useRef(null);
  const refCanvasGameBoardBackground = useRef(null);
  const refCanvasTetromino = useRef(null);
  const refCanvasNextTetrominos = useRef(null);

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

  useEffect(() => {
    const ctx = refCanvasNextTetrominos.current.getContext('2d');

    drawNextTetrominos({ ctx, nextTetrominos });
  }, [nextTetrominos]);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <div>
          <p>{`lines removed: ${removedLines}`}</p>
          <p>{`level: ${level + 1}`}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-row">
        <div
          style={{
            border: '2px solid black',
            width: '300px',
            height: '600px'
          }}
        >
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

        <div
          style={{
            border: '2px solid black',
            width: '100px',
            height: '600px'
          }}
          className="ml-4"
        >
          <canvas
            style={{ position: 'absolute', zIndex: '1' }}
            width={100}
            height={600}
            ref={refCanvasNextTetrominos}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GameBoard;
