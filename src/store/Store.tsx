import React, { createContext, useReducer } from 'react';
import { IState, IAction, IContext } from './store.interfaces';

const initialState: IState = {
  user: '',
  tweets: [],
  model: {},
  ready: false,
  history: [],
  loading: false,
};

const initialDispatch = () => {};

export const Store = createContext<IContext>({ state: initialState, dispatch: initialDispatch });

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'USER':
      return { ...state, user: action.payload };
    case 'TWEETS':
      return { ...state, tweets: action.payload };
    case 'MODEL':
      return { ...state, model: action.payload };
    case 'READY':
      return { ...state, ready: action.payload };
    case 'HISTORY':
      return { ...state, history: action.payload };
    case 'LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
