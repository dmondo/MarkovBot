import { Dispatch } from 'react';

export interface IState {
  user: string;
  tweets: ITweet[];
  model: IModel;
  ready: boolean;
  history: ITweet[];
  loading: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}
