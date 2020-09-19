import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Loader from '../dist/src/components/Loader';
import { StoreProvider } from '../dist/src/store/Store';

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
