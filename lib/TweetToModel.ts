const TweetToModel = async (query: string): Promise<string[]> => {
  let currentPage = 0;
  const response = fetch(`/twitter/${query}`);
  let responses = [response];

  // check: what happens to pagination if we go past max number of tweets for account...
  // is array empty (good) or do we get same batch of tweets (bad)
  for (let i = 0; i < 15; i += 1) {
    currentPage += 200;
    const nextResponse = fetch(`/twitter/${query}/${currentPage}`);
    responses = [...responses, nextResponse];
  }

  const responseData = await Promise.all(responses);
  const responseJSON = await Promise.all(responseData.map((resData) => (
    resData.json()
  )));

  const tweetObjects = [];
  responseJSON.forEach((resJSON) => {
    resJSON.forEach((tweetObject: any) => {
      tweetObjects.push(tweetObject);
    });
  });

  const tweets = tweetObjects.map((tweet: any) => (
    tweet.text
  ));
  return tweets;
};

export default TweetToModel;
