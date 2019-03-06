import React from 'react';
import { shallow } from 'enzyme';
import InputsListener, { handleKeyPressed } from '.';

describe('InputsListener', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <InputsListener>
        <div>test</div>
      </InputsListener>
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe('handleKeyPressed', () => {
  it('should setPressed with pressed and call e.preventDefault()', () => {
    const params = { pressed: true, setPressed: jest.fn() };
    const e = { preventDefault: jest.fn() };

    handleKeyPressed(params)(null, e);

    expect(params.setPressed).toHaveBeenCalledWith(params.pressed);
    expect(e.preventDefault).toHaveBeenCalledWith();

    params.pressed = false;
    e.preventDefault.mockClear();
    params.setPressed.mockClear();

    handleKeyPressed(params)(null, e);

    expect(params.setPressed).toHaveBeenCalledWith(params.pressed);
    expect(e.preventDefault).toHaveBeenCalledWith();
  });
});
