import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {
  shallow,
  configure,
} from 'enzyme';
import App from './App';
import Form from './Form/Form';
import Feed from './Feed/Feed';
import History from './History/History';

configure({ adapter: new Adapter() });

describe('app component', () => {
  it('should render with Form, Feed, and History children', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(Feed)).toHaveLength(1);
    expect(wrapper.find(History)).toHaveLength(1);
  });
});
