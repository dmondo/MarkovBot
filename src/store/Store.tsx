import React from 'react';

interface ITweet {
  user: string;
  text: string;
}

interface IModel {
  [key: string]: string;
}

interface IState {
  user: string;
  tweets: ITweet[];
  model: IModel;
  ready: boolean;
  history: ITweet[];
}

interface IAction {
  type: string;
  payload: any;
}

const initialState: IState = {
  user: '',
  tweets: [],
  model: {},
  ready: false,
  history: [],
};

export const Store = React.createContext<IState | any>(initialState);

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
    default:
      return state;
  }
};

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { children } = props;
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
