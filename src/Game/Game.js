import React, { useContext, useRef, useEffect, useState } from 'react';
import { InputsContext } from 'InputsListener';
import PropTypes from 'prop-types';
import { drawGameBoard } from 'canvasHelpers/canvasHelpers';
import { gameBoardDataFixtures } from 'Fixtures/gameBoardData';
import { tetrominoDataFixtures } from 'Fixtures/tetrominoData';
import {
  INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED,
  INTERVAL_AUTO_DOWN
} from 'constants.js';
import {
  downTetromino,
  leftTetromino,
  rightTetromino,
  rotateLeftTetromino,
  rotateRightTetromino
} from 'businessHelpers/businessHelpers';
import { useInterval } from 'hooks/hooks';

const callbackDown = ({ tetrominoData, setTetrominoData, gameBoardData }) => {
  const downedTetromino = downTetromino({ gameBoardData, tetrominoData });

  downedTetromino && setTetrominoData(downedTetromino);
};

const callbackRight = ({ tetrominoData, setTetrominoData, gameBoardData }) => {
  const rightedTetromino = rightTetromino({ gameBoardData, tetrominoData });

  rightedTetromino && setTetrominoData(rightedTetromino);
};

const callbackLeft = ({ tetrominoData, setTetrominoData, gameBoardData }) => {
  const leftedTetromino = leftTetromino({ gameBoardData, tetrominoData });

  leftedTetromino && setTetrominoData(leftedTetromino);
};

const callbackRR = ({ tetrominoData, setTetrominoData, gameBoardData }) => {
  const RRTetromino = rotateRightTetromino({
    gameBoardData,
    tetrominoData
  });

  RRTetromino && setTetrominoData(RRTetromino);
};

const callbackRL = ({ tetrominoData, setTetrominoData, gameBoardData }) => {
  const RLTetromino = rotateLeftTetromino({ gameBoardData, tetrominoData });

  RLTetromino && setTetrominoData(RLTetromino);
};

const Game = ({ inputsContext = useContext(InputsContext) }) => {
  const {
    pressedDown,
    pressedLeft,
    pressedRight,
    pressedRR,
    pressedRL
  } = inputsContext;
  const [gameBoardData, setGameBoardData] = useState(gameBoardDataFixtures[0]);
  const [tetrominoData, setTetrominoData] = useState(tetrominoDataFixtures[1]);
  const refCanvasTetris = useRef(null);

  useEffect(() => {
    const ctx = refCanvasTetris.current.getContext('2d');

    drawGameBoard({ ctx, gameBoardData, tetrominoData });
  }, [refCanvasTetris, gameBoardData, tetrominoData]);

  useEffect(() => {
    if (pressedDown) {
      callbackDown({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    }
  }, [pressedDown]);

  useInterval(
    () => {
      callbackDown({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    },
    pressedDown ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  useInterval(
    () => {
      callbackDown({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    },
    pressedDown ? null : INTERVAL_AUTO_DOWN
  );

  useEffect(() => {
    if (pressedRight) {
      callbackRight({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    }
  }, [pressedRight]);

  useInterval(
    () => {
      callbackRight({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    },
    pressedRight ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  useEffect(() => {
    if (pressedLeft) {
      callbackLeft({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    }
  }, [pressedLeft]);

  useInterval(
    () => {
      callbackLeft({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    },
    pressedLeft ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  useEffect(() => {
    if (pressedRR) {
      callbackRR({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    }
  }, [pressedRR]);

  useEffect(() => {
    if (pressedRL) {
      callbackRL({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData
      });
    }
  }, [pressedRL]);

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
