const buildModel = (tweets: IMKVTweet[], n: number): IModel => {
  const model = {};
  tweets.forEach((tweet) => {
    let txt = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    txt = txt.split('…').join('');
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
