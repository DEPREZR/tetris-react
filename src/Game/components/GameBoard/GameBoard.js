import React, { useRef, useContext, useEffect } from 'react';
import { GameContext } from 'Game';
import { TetrominosContext } from 'TetrominosProvider';
import {
  drawGameBoard,
  drawTetromino,
  drawGameBoardBackground,
  drawNextTetrominos
} from 'canvasHelpers/canvasHelpers';
import { Row, Col } from 'reactstrap';

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
    <div className="ml-2">
      <p>{`lines removed: ${removedLines}`}</p>
      <p>{`level: ${level + 1}`}</p>
      <Row>
        <Col xs="3">
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
        </Col>
        <Col xs="9" style={{ marginLeft: '-40px' }}>
          <div
            style={{
              border: '2px solid black',
              width: '100px',
              height: '600px'
            }}
          >
            <canvas
              style={{ position: 'absolute', zIndex: '1' }}
              width={100}
              height={600}
              ref={refCanvasNextTetrominos}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GameBoard;
