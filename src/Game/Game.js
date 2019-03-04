import React, { useContext } from 'react';
import { InputsContext } from '../InputsListener';
import PropTypes from 'prop-types';

const Game = ({ inputsContext = useContext(InputsContext) }) => {
  const { countDown, countLeft } = inputsContext;

  return (
    <React.Fragment>
      <p>{`You pressed down arrow ${countDown} times`}</p>
      <p>{`You pressed left arrow ${countLeft} times`}</p>
    </React.Fragment>
  );
};

Game.propTypes = {
  inputsContext: PropTypes.object
};

export default Game;
