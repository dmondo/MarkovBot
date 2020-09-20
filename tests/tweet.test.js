import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Tweet from '../dist/src/components/Tweet';
import { StoreProvider } from '../dist/src/store/Store';

configure({ adapter: new Adapter() });

describe('tweet component', () => {
  it('should render', () => {
    const fakeTweet = { user: 'a', text: 'b', uuid: '1' };
    const fakeStatus = 'like';
    const wrapper = mount(
      <StoreProvider>
        <Tweet twt={fakeTweet} status={fakeStatus} />
      </StoreProvider>,
    );
    wrapper.unmount();
  });
});
