import React, { useContext, useRef, useEffect, useState } from 'react';
import { InputsContext } from 'InputsListener';
import PropTypes from 'prop-types';
import { drawGameBoard } from 'canvasHelpers/canvasHelpers';
import { gameBoardDataFixtures } from 'Fixtures/gameBoardData';
import { tetrominoDataFixtures } from 'Fixtures/tetrominoData';
import { INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED } from 'constants.js';
import { downTetromino } from 'businessHelpers/businessHelpers';
import { useInterval } from 'hooks/hooks';

const callbackDownInputPressed = ({
  tetrominoData,
  setTetrominoData,
  gameBoardData
}) => {
  const downedTetromino = downTetromino({ gameBoardData, tetrominoData });

  downedTetromino && setTetrominoData(downedTetromino);
};

const Game = ({ inputsContext = useContext(InputsContext) }) => {
  const { pressedDown, pressedLeft } = inputsContext;
  const [gameBoardData, setGameBoardData] = useState(gameBoardDataFixtures[0]);
  const [tetrominoData, setTetrominoData] = useState(tetrominoDataFixtures[0]);
  const refCanvasTetris = useRef(null);

  useEffect(() => {
    const ctx = refCanvasTetris.current.getContext('2d');

    drawGameBoard({ ctx, gameBoardData, tetrominoData });
  }, [refCanvasTetris, gameBoardData, tetrominoData]);

  useEffect(() => {
    if (pressedDown) {
      callbackDownInputPressed({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    }
  }, [pressedDown]);

  useInterval(
    () => {
      callbackDownInputPressed({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    },
    pressedDown ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  return (
    <React.Fragment>
      <p>{`You are ${pressedDown ? '' : 'not'} pressing down arrow`}</p>
      <p>{`You are ${pressedLeft ? '' : 'not'} pressing left arrow`}</p>
      <canvas
        ref={refCanvasTetris}
        width={300}
        height={600}
        style={{ border: '2px solid black' }}
      />
    </React.Fragment>
  );
};

Game.propTypes = {
  inputsContext: PropTypes.object
};

export default Game;
