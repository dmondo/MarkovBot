interface ITweet {
  user: string;
  text: string;
  id: number;
}

const buildModel = (tweets: ITweet[], n: number): object => {
  const model = {};
  console.log('markov tweets', tweets);
  tweets.forEach((tweet) => {
    const txt = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    const words = txt.split(' ');
    words.forEach((word, i) => {
      if (i === words.length - n) {
        return;
      }

      const nGram = words.slice(i, i + n).join(' ');

      if (!(nGram in model)) {
        model[nGram] = [];
      }
      model[nGram].push(words[i + n]);
    });
  });

  return model;
};

export default buildModel;
