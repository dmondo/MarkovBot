const generateChain = (model: any, chainLength: number, n: number): string => {
  let chain = '';
  const lng = Object.keys(model).length;
  let next = 'null';
  while (next[0] !== next[0].toUpperCase()) {
    next = Object.keys(model)[Math.floor(Math.random() * lng)];
  }

  chain += next;
  for (let i = 0; i < chainLength; i += 1) {
    if (!(next in model)) {
      break;
    }
    const following = model[next][Math.floor(Math.random() * model[next].length)];
    chain = `${chain} ${following}`;
    const wdCount = chain.split(' ').length;
    next = `${chain.split(' ').slice(wdCount - n, wdCount).join(' ')}`;
  }
  return chain;
};

export default generateChain;
