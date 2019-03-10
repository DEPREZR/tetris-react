import React, { useContext, useEffect, useState } from 'react';
import { InputsContext } from 'InputsListener';
import { TetrominosContext } from 'TetrominosProvider';
import PropTypes from 'prop-types';
import GameBoard from './components/GameBoard';
import {
  INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED,
  INTERVAL_AUTO_DOWN
} from 'constants.js';
import {
  downTetromino,
  leftTetromino,
  rightTetromino,
  rotateLeftTetromino,
  rotateRightTetromino,
  popNewTetromino,
  removeFullLines
} from 'businessHelpers/businessHelpers';
import { useInterval } from 'hooks/hooks';

export const GameContext = React.createContext();

const callbackDown = ({
  tetrominoData,
  setTetrominoData,
  gameBoardData,
  setGameBoardData,
  giveTetromino
}) => {
  const downedTetromino = downTetromino({ gameBoardData, tetrominoData });

  if (downedTetromino) setTetrominoData(downedTetromino);
  else {
    const [newTetrominoData, newGameBoardData] = popNewTetromino({
      tetrominoData,
      gameBoardData,
      giveTetromino
    });

    const gameBoardDataCleaned = removeFullLines({
      gameBoardData: newGameBoardData
    });

    setGameBoardData(gameBoardDataCleaned);
    setTetrominoData(newTetrominoData);
  }
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

const Game = ({
  inputsContext = useContext(InputsContext),
  tetrominosContext = useContext(TetrominosContext)
}) => {
  const {
    pressedDown,
    pressedLeft,
    pressedRight,
    pressedRR,
    pressedRL
  } = inputsContext;
  const { giveTetromino, firstTetromino } = tetrominosContext;

  const [gameBoardData, setGameBoardData] = useState([]);
  const [tetrominoData, setTetrominoData] = useState(firstTetromino);

  useInterval(
    () => {
      callbackDown({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData,
        giveTetromino
      });
    },
    pressedDown
      ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED
      : INTERVAL_AUTO_DOWN
  );

  useEffect(() => {
    if (pressedDown) {
      callbackDown({
        tetrominoData,
        setTetrominoData,
        gameBoardData,
        setGameBoardData,
        giveTetromino
      });
    }
  }, [pressedDown]);

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
    <GameContext.Provider value={{ gameBoardData, tetrominoData }}>
      <GameBoard />
    </GameContext.Provider>
  );
};

Game.propTypes = {
  inputsContext: PropTypes.object,
  tetrominosContext: PropTypes.object
};

export default Game;
