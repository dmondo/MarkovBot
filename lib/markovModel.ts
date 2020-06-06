const buildModel = (tweets: IMKVTweet[], n: number): IModel => {
  const model = {};
  tweets.forEach((tweet) => {
    let txt = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    txt = txt.replace('undefined', '').replace('null', '').replace('  ', '');
    let words: string[];

    if (txt.includes('…') || txt.includes('...')) {
      txt = txt.split('…').join('');
      words = txt.split(' ').slice(0, txt.split(' ').length - 1);
    } else {
      txt = txt.split('…').join('');
      words = txt.split(' ');
    }
    words.forEach((word: string, i: number) => {
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
