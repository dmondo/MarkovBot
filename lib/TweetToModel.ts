const TweetToModel = async (query: string): Promise<string[]> => {
  let allTweets = [];
  let currentPage = 0;

  for (let i = 0; i < 15; i += 1) {
    const response = currentPage ? await fetch(`/twitter/${query}/${currentPage}`) : await fetch(`/twitter/${query}`);
    const tweetObjects = await response.json();

    const tweets = tweetObjects.map((tweet: any) => (
      tweet.text
    ));
    allTweets = [...allTweets, ...tweets];

    const [lastTweet] = tweetObjects.slice(-1);
    currentPage = lastTweet.id;
  }

  return allTweets;
};

export default TweetToModel;
