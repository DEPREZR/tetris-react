import React, { useContext, useRef, useEffect } from 'react';
import { InputsContext } from 'InputsListener';
import PropTypes from 'prop-types';
import { drawGameBoard } from 'canvasHelpers/canvasHelpers';
import { gameBoardDataFixtures } from 'Fixtures/gameBoardData';

const Game = ({ inputsContext = useContext(InputsContext) }) => {
  const { pressedDown, pressedLeft } = inputsContext;
  const refCanvasTetris = useRef(null);
  const intervalId = useRef(undefined);

  useEffect(() => {
    const ctx = refCanvasTetris.current.getContext('2d');

    drawGameBoard({ ctx, gameBoardData: gameBoardDataFixtures[0] });
  }, [refCanvasTetris]);

  useEffect(() => {
    if (pressedLeft) {
      console.log('Left pressed');
      intervalId.current = setInterval(() => {
        console.log('Left pressed');
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }
  }, [pressedLeft]);

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
