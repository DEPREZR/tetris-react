import React from 'react';
import { shallow } from 'enzyme';
import InputsListener, { handleKeyPressed } from '.';

describe('TenantProvider', () => {
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
  it('should setPressed with pressed', () => {
    const params = { pressed: true, setPressed: jest.fn() };

    handleKeyPressed(params)();

    expect(params.setPressed).toHaveBeenCalledWith(params.pressed);

    params.pressed = false;

    handleKeyPressed(params)();

    expect(params.setPressed).toHaveBeenCalledWith(params.pressed);
  });
});
