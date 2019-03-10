import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  INITIAL_T_TETROMINO,
  INITIAL_I_TETROMINO,
  INITIAL_O_TETROMINO,
  INITIAL_L_TETROMINO,
  INITIAL_J_TETROMINO,
  INITIAL_Z_TETROMINO,
  INITIAL_S_TETROMINO
} from 'constants.js';

export const TetrominosContext = React.createContext();

export const generateFullBag = () => {
  const bagToShuffle = [
    INITIAL_T_TETROMINO,
    INITIAL_I_TETROMINO,
    INITIAL_O_TETROMINO,
    INITIAL_L_TETROMINO,
    INITIAL_J_TETROMINO,
    INITIAL_Z_TETROMINO,
    INITIAL_S_TETROMINO
  ];

  return _.shuffle(bagToShuffle);
};

export const giveTetromino = ({
  nextTetrominos,
  bag,
  setBag,
  setNextTetrominos
}) => () => {
  const newNextTetrominos = [...nextTetrominos.slice(1), bag[0]];
  const newBag = bag.slice(1);
  const tetrominoToGive = nextTetrominos[0];

  setBag(newBag.length ? newBag : generateFullBag());
  setNextTetrominos(newNextTetrominos);

  return tetrominoToGive;
};

export const giveInitialParams = () => {
  const nextTetrominos = generateFullBag();
  const firstTetromino = nextTetrominos[0];
  const bag = generateFullBag();

  return {
    initialBag: bag.slice(1),
    initialNextTetrominos: [...nextTetrominos.slice(1), bag[0]],
    firstTetromino
  };
};

const TetrominosProvider = ({ children }) => {
  const {
    initialBag,
    initialNextTetrominos,
    firstTetromino
  } = giveInitialParams();
  const [bag, setBag] = useState(initialBag);
  const [nextTetrominos, setNextTetrominos] = useState(initialNextTetrominos);

  return (
    <TetrominosContext.Provider
      value={{
        nextTetrominos,
        giveTetromino: giveTetromino({
          nextTetrominos,
          bag,
          setBag,
          setNextTetrominos
        }),
        firstTetromino
      }}
    >
      {children}
    </TetrominosContext.Provider>
  );
};

TetrominosProvider.propTypes = {
  children: PropTypes.node
};

export default TetrominosProvider;
