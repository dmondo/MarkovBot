import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import History from '../dist/src/components/History';
import { StoreProvider } from '../dist/src/store/Store';

configure({ adapter: new Adapter() });

describe('history component', () => {
  it('should render with h1 and section elements', () => {
    const wrapper = mount(
      <StoreProvider>
        <History />
      </StoreProvider>,
    );
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('section')).toHaveLength(1);
    wrapper.unmount();
  });

  it('should call useEffect to grab history', () => {
    const mockUseEffect = () => {
      React.useEffect.mockImplementationOnce((f) => f());
    };

    const useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();

    const wrapper = mount(
      <StoreProvider>
        <History />
      </StoreProvider>,
    );

    expect(useEffect).toHaveBeenCalled();
    wrapper.unmount();
  });
});
