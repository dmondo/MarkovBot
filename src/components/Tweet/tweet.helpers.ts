const postTweetToHistory = async (tweet: ITweet): Promise<void> => {
  const url = '/history';
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(tweet);
  const options = { method, headers, body };
  await fetch(url, options);
};

const deleteTweetFromHistory = async (uuid: string): Promise<void> => {
  const url = `/history/${uuid}`;
  const method = 'DELETE';
  const options = { method };
  await fetch(url, options);
};

export {
  postTweetToHistory,
  deleteTweetFromHistory,
};
