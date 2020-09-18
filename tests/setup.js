import React from 'react';
import sinon from 'sinon';
import {
  mount,
  render,
  shallow,
  configure,
} from 'enzyme';

global.React = React;
global.sinon = sinon;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.configure = configure;
