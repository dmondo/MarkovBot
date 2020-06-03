interface ITweet {
  user: string;
  text: string;
  id: number;
}

const buildModel = (tweets: ITweet[], n: number): object => {
  const model = {};

  tweets.forEach((tweet) => {
    const words = tweet.text.split(' ');
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
