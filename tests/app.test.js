import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {
  shallow,
  configure,
} from 'enzyme';
import App from '../dist/src/components/App';
import Form from '../dist/src/components/Form';
import Feed from '../dist/src/components/Feed';
import History from '../dist/src/components/History';

configure({ adapter: new Adapter() });

describe('app component', () => {
  it('should render with Form, Feed, and History children', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(Feed)).toHaveLength(1);
    expect(wrapper.find(History)).toHaveLength(1);
  });
});
