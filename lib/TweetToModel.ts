const TweetToModel = async (query: string): Promise<IMKVTweet[]> => {
  let tweetArray = [];
  const res = await fetch(`/twitter/${query}`);
  const twts = await res.json();

  const moreTweets = twts.map((twt: any) => (
    {
      user: twt.user.name,
      text: twt.text,
      id: twt.id_str,
    }
  ));

  tweetArray = [...tweetArray, ...moreTweets];

  for (let i = 0; i < 15; i += 1) {
    const maxId = tweetArray[tweetArray.length - 1].id;

    // ignore linter because we need blocking between iterations
    /* eslint no-await-in-loop: 0 */
    const nres = await fetch(`/twitter/${query}/${maxId}`);
    const ntwts = await nres.json();

    const nmoreTweets = ntwts.map((twt: any) => (
      {
        user: twt.user.name,
        text: twt.text,
        id: twt.id_str,
      }
    ));

    tweetArray = [...tweetArray, ...nmoreTweets.slice(1)];
  }

  return tweetArray;
};

export default TweetToModel;
