import React, { useContext, useRef, useEffect } from 'react';
import { InputsContext } from 'InputsListener';
import PropTypes from 'prop-types';
import { drawGameBoard } from 'businessHelpers/businessHelpers';
import { gameBoardDataFixtures } from 'Fixtures/gameBoardData';

const Game = ({ inputsContext = useContext(InputsContext) }) => {
  const { countDown, countLeft } = inputsContext;
  const refCanvasTetris = useRef(null);

  useEffect(() => {
    const ctx = refCanvasTetris.current.getContext('2d');

    drawGameBoard({ ctx, gameBoardData: gameBoardDataFixtures[0] });
  }, [refCanvasTetris]);

  return (
    <React.Fragment>
      <p>{`You pressed down arrow ${countDown} times`}</p>
      <p>{`You pressed left arrow ${countLeft} times`}</p>
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
