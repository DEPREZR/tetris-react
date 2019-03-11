import React, { useContext, useEffect, useState } from 'react';
import { InputsContext } from 'InputsListener';
import { TetrominosContext } from 'TetrominosProvider';
import PropTypes from 'prop-types';
import GameBoard from './components/GameBoard';
import {
  INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED,
  INTERVALS_AUTO_DOWN
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
  giveTetromino,
  removedLines,
  setRemovedLines,
  setLevel,
  setTetrisData
}) => {
  setTetrisData(({ gameBoardData, tetrominoData }) => {
    const downedTetromino = downTetromino({ gameBoardData, tetrominoData });

    if (downedTetromino)
      return { gameBoardData, tetrominoData: downedTetromino };
    else {
      const [newTetrominoData, newGameBoardData] = popNewTetromino({
        tetrominoData,
        gameBoardData,
        giveTetromino
      });

      const gameBoardDataCleaned = removeFullLines({
        gameBoardData: newGameBoardData,
        removedLines,
        setRemovedLines,
        setLevel
      });

      return {
        gameBoardData: gameBoardDataCleaned,
        tetrominoData: newTetrominoData
      };
    }
  });
};

const callbackRight = ({ setTetrisData }) => {
  setTetrisData(({ tetrominoData, gameBoardData }) => {
    const rightedTetromino = rightTetromino({ gameBoardData, tetrominoData });

    return rightedTetromino
      ? { tetrominoData: rightedTetromino, gameBoardData }
      : { tetrominoData, gameBoardData };
  });
};

const callbackLeft = ({ setTetrisData }) => {
  setTetrisData(({ tetrominoData, gameBoardData }) => {
    const leftedTetromino = leftTetromino({ gameBoardData, tetrominoData });

    return leftedTetromino
      ? { tetrominoData: leftedTetromino, gameBoardData }
      : { tetrominoData, gameBoardData };
  });
};

const callbackRR = ({ setTetrisData }) => {
  setTetrisData(({ gameBoardData, tetrominoData }) => {
    const RRTetromino = rotateRightTetromino({
      gameBoardData,
      tetrominoData
    });

    return RRTetromino
      ? { gameBoardData, tetrominoData: RRTetromino }
      : { gameBoardData, tetrominoData };
  });
};

const callbackRL = ({ setTetrisData }) => {
  setTetrisData(({ gameBoardData, tetrominoData }) => {
    const RLTetromino = rotateLeftTetromino({
      gameBoardData,
      tetrominoData
    });

    return RLTetromino
      ? { gameBoardData, tetrominoData: RLTetromino }
      : { gameBoardData, tetrominoData };
  });
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

  const [tetrisData, setTetrisData] = useState({
    gameBoardData: [],
    tetrominoData: firstTetromino
  });
  const [removedLines, setRemovedLines] = useState(0);
  const [level, setLevel] = useState(0);

  useInterval(
    () => {
      callbackDown({
        setTetrisData,
        giveTetromino,
        removedLines,
        setRemovedLines,
        setLevel
      });
    },
    pressedDown
      ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED
      : INTERVALS_AUTO_DOWN[level]
  );

  useEffect(() => {
    if (pressedDown) {
      callbackDown({
        setTetrisData,
        giveTetromino,
        removedLines,
        setRemovedLines,
        setLevel
      });
    }
  }, [pressedDown]);

  useEffect(() => {
    if (pressedRight) {
      callbackRight({
        setTetrisData
      });
    }
  }, [pressedRight]);

  useInterval(
    () => {
      callbackRight({
        setTetrisData
      });
    },
    pressedRight ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  useEffect(() => {
    if (pressedLeft) {
      callbackLeft({
        setTetrisData
      });
    }
  }, [pressedLeft]);

  useInterval(
    () => {
      callbackLeft({
        setTetrisData
      });
    },
    pressedLeft ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  useEffect(() => {
    if (pressedRR) {
      callbackRR({
        setTetrisData
      });
    }
  }, [pressedRR]);

  useEffect(() => {
    if (pressedRL) {
      callbackRL({
        setTetrisData
      });
    }
  }, [pressedRL]);

  return (
    <GameContext.Provider
      value={{
        gameBoardData: tetrisData.gameBoardData,
        tetrominoData: tetrisData.tetrominoData,
        removedLines,
        level
      }}
    >
      <GameBoard />
    </GameContext.Provider>
  );
};

Game.propTypes = {
  inputsContext: PropTypes.object,
  tetrominosContext: PropTypes.object
};

export default Game;
