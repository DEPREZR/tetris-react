import React, { useState } from 'react';
import Hotkeys from 'react-hot-keys';
import PropTypes from 'prop-types';

export const InputsContext = React.createContext();

export const handleKeyPressed = ({ count, setCount }) => () =>
  setCount(count + 1);

const InputsListener = ({ children }) => {
  const [countDown, setCountDown] = useState(0);
  const [countUp, setCountUp] = useState(0);
  const [countRight, setCountRight] = useState(0);
  const [countLeft, setCountLeft] = useState(0);

  return (
    <React.Fragment>
      <Hotkeys
        keyName="down"
        onKeyDown={handleKeyPressed({
          count: countDown,
          setCount: setCountDown
        })}
      />
      <Hotkeys
        keyName="up"
        onKeyDown={handleKeyPressed({ count: countUp, setCount: setCountUp })}
      />
      <Hotkeys
        keyName="right"
        onKeyDown={handleKeyPressed({
          count: countRight,
          setCount: setCountRight
        })}
      />
      <Hotkeys
        keyName="left"
        onKeyDown={handleKeyPressed({
          count: countLeft,
          setCount: setCountLeft
        })}
      />
      <InputsContext.Provider
        value={{ countDown, countUp, countRight, countLeft }}
      >
        {children}
      </InputsContext.Provider>
    </React.Fragment>
  );
};

InputsListener.propTypes = {
  children: PropTypes.node
};

export default InputsListener;
