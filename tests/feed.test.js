import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Feed from '../dist/src/components/Feed';
import { StoreProvider } from '../dist/src/store/Store';

configure({ adapter: new Adapter() });

describe('feed component', () => {
  it('should render a section element', () => {
    const wrapper = mount(
      <StoreProvider>
        <Feed />
      </StoreProvider>,
    );
    expect(wrapper.find('section')).toHaveLength(1);
    wrapper.unmount();
  });
});
