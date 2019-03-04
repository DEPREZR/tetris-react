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
  it('should setCount with count+1', () => {
    const params = { count: 3, setCount: jest.fn() };

    handleKeyPressed(params)();

    expect(params.setCount).toHaveBeenCalledWith(params.count + 1);
  });
});
