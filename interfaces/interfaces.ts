interface ITweet {
  user: string;
  text: string;
  uuid: string;
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

interface IDBModel {
  user: string;
  model: string;
}

interface IMKVTweet {
  user: string;
  text: string;
  id: number;
  uuid: string;
}
