import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Loader from './Loader';
import { StoreProvider } from '../../store/Store';

configure({ adapter: new Adapter() });

describe('loader component', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <StoreProvider>
        <Loader />
      </StoreProvider>,
    );
    wrapper.unmount();
  });
});
