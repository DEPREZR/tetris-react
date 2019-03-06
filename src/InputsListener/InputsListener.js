import React, { useState } from 'react';
import Hotkeys from 'react-hot-keys';
import PropTypes from 'prop-types';

export const InputsContext = React.createContext();

export const handleKeyPressed = ({ pressed, setPressed }) => () =>
  setPressed(pressed);

const InputsListener = ({ children }) => {
  const [pressedDown, setPressedDown] = useState(false);
  const [pressedUp, setPressedUp] = useState(false);
  const [pressedRight, setPressedRight] = useState(false);
  const [pressedLeft, setPressedLeft] = useState(false);

  return (
    <React.Fragment>
      <Hotkeys
        keyName="down"
        onKeyDown={handleKeyPressed({
          pressed: true,
          setPressed: setPressedDown
        })}
        onKeyUp={handleKeyPressed({
          pressed: false,
          setPressed: setPressedDown
        })}
      />
      <Hotkeys
        keyName="up"
        onKeyDown={handleKeyPressed({
          pressed: true,
          setPressed: setPressedUp
        })}
        onKeyUp={handleKeyPressed({
          pressed: false,
          setPressed: setPressedUp
        })}
      />
      <Hotkeys
        keyName="right"
        onKeyDown={handleKeyPressed({
          pressed: true,
          setPressed: setPressedRight
        })}
        onKeyUp={handleKeyPressed({
          pressed: false,
          setPressed: setPressedRight
        })}
      />
      <Hotkeys
        keyName="left"
        onKeyDown={handleKeyPressed({
          pressed: true,
          setPressed: setPressedLeft
        })}
        onKeyUp={handleKeyPressed({
          pressed: false,
          setPressed: setPressedLeft
        })}
      />
      <InputsContext.Provider
        value={{ pressedDown, pressedUp, pressedRight, pressedLeft }}
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
