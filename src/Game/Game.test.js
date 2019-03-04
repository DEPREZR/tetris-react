import React from 'react';
import { shallow } from 'enzyme';
import Game from '.';

describe('Game', () => {
  let minProps;

  beforeEach(() => {
    minProps = {
      inputsContext: { countDown: 3, countLeft: 2 }
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Game {...minProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
