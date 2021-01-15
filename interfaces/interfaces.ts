interface ITweet {
  user: string;
  text: string;
  uuid: string;
}

interface IModel {
  [key: string]: string;
}

interface IMKVTweet {
  user: string;
  text: string;
  id: number;
  uuid: string;
}
