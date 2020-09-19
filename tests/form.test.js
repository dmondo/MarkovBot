import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Form from '../dist/src/components/Form';
import { StoreProvider } from '../dist/src/store/Store';

configure({ adapter: new Adapter() });

describe('form component', () => {
  it('should render with an h1 tag and an input form', () => {
    const wrapper = mount(
      <StoreProvider>
        <Form />
      </StoreProvider>,
    );
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
    wrapper.unmount();
  });
});
