import React, { useContext, useEffect, useState, useRef } from 'react';
import { InputsContext } from 'InputsListener';
import { TetrominosContext } from 'TetrominosProvider';
import PropTypes from 'prop-types';
import GameBoard from './components/GameBoard';
import {
  INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED,
  INTERVALS_AUTO_DOWN,
  LOCK_DOWN_TIME
} from 'constants.js';
import {
  downTetromino,
  leftTetromino,
  rightTetromino,
  rotateLeftTetromino,
  rotateRightTetromino,
  popNewTetromino,
  removeFullLines,
  tetrominoDataCollideGameBoardData
} from 'businessHelpers/businessHelpers';
import { useInterval } from 'hooks/hooks';

export const GameContext = React.createContext();

const callbackDown = ({
  giveTetromino,
  removedLines,
  setRemovedLines,
  setLevel,
  setTetrisData,
  lockDown
}) => {
  setTetrisData(({ gameBoardData, tetrominoData }) => {
    const downedTetromino = downTetromino({ gameBoardData, tetrominoData });

    if (downedTetromino)
      return { gameBoardData, tetrominoData: downedTetromino };
    else {
      if (!lockDown.current) {
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

        if (
          tetrominoDataCollideGameBoardData({
            gameBoardData: gameBoardDataCleaned,
            tetrominoData: newTetrominoData
          })
        ) {
          setLevel(0);
          setRemovedLines(0);

          return {
            gameBoardData: [],
            tetrominoData: newTetrominoData
          };
        }

        return {
          gameBoardData: gameBoardDataCleaned,
          tetrominoData: newTetrominoData
        };
      } else return { gameBoardData, tetrominoData };
    }
  });
};

const callbackRight = ({ setTetrisData, lockDown }) => {
  setTetrisData(({ tetrominoData, gameBoardData }) => {
    const rightedTetromino = rightTetromino({ gameBoardData, tetrominoData });

    if (rightedTetromino) {
      lockDown.current = lockDown.current ? lockDown.current + 1 : 1;
    }

    return rightedTetromino
      ? { tetrominoData: rightedTetromino, gameBoardData }
      : { tetrominoData, gameBoardData };
  });
};

const callbackLeft = ({ setTetrisData, lockDown }) => {
  setTetrisData(({ tetrominoData, gameBoardData }) => {
    const leftedTetromino = leftTetromino({ gameBoardData, tetrominoData });

    if (leftedTetromino) {
      lockDown.current = lockDown.current ? lockDown.current + 1 : 1;
    }

    return leftedTetromino
      ? { tetrominoData: leftedTetromino, gameBoardData }
      : { tetrominoData, gameBoardData };
  });
};

const callbackRR = ({ setTetrisData, lockDown }) => {
  setTetrisData(({ gameBoardData, tetrominoData }) => {
    const RRTetromino = rotateRightTetromino({
      gameBoardData,
      tetrominoData
    });

    if (RRTetromino) {
      lockDown.current = lockDown.current ? lockDown.current + 1 : 1;
    }

    return RRTetromino
      ? { gameBoardData, tetrominoData: RRTetromino }
      : { gameBoardData, tetrominoData };
  });
};

const callbackRL = ({ setTetrisData, lockDown }) => {
  setTetrisData(({ gameBoardData, tetrominoData }) => {
    const RLTetromino = rotateLeftTetromino({
      gameBoardData,
      tetrominoData
    });

    if (RLTetromino) {
      lockDown.current = lockDown.current ? lockDown.current + 1 : 1;
    }

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
  const lockDown = useRef(false);
  const idInterval = useRef(null);

  useEffect(() => {
    if (lockDown.current) {
      clearInterval(idInterval.current);
      idInterval.current = setTimeout(() => {
        lockDown.current = false;
      }, LOCK_DOWN_TIME);
    }
  }, [lockDown.current]);

  useInterval(
    () => {
      callbackDown({
        setTetrisData,
        giveTetromino,
        removedLines,
        setRemovedLines,
        setLevel,
        lockDown
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
        setLevel,
        lockDown
      });
    }
  }, [pressedDown]);

  useEffect(() => {
    if (pressedRight) {
      callbackRight({
        setTetrisData,
        lockDown
      });
    }
  }, [pressedRight]);

  useInterval(
    () => {
      callbackRight({
        setTetrisData,
        lockDown
      });
    },
    pressedRight ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  useEffect(() => {
    if (pressedLeft) {
      callbackLeft({
        setTetrisData,
        lockDown
      });
    }
  }, [pressedLeft]);

  useInterval(
    () => {
      callbackLeft({
        setTetrisData,
        lockDown
      });
    },
    pressedLeft ? INTERVAL_BETWEEN_CALLBACKS_TOUCHED_PRESSED : null
  );

  useEffect(() => {
    if (pressedRR) {
      callbackRR({
        setTetrisData,
        lockDown
      });
    }
  }, [pressedRR]);

  useEffect(() => {
    if (pressedRL) {
      callbackRL({
        setTetrisData,
        lockDown
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
