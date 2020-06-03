const generateChain = (model: any, chainLength: number): string => {
  let chain = '';
  const lng = Object.keys(model).length;
  let next = Object.keys(model)[Math.floor(Math.random() * lng)];
  chain += next;
  for (let i = 0; i < chainLength; i += 1) {
    if (!(next in model)) { break; }
    const following = model[next][Math.floor(Math.random() * model[next].length)];
    chain = `${chain} ${following}`;
    const wdCount = chain.split(' ').length;
    next = `${chain.split(' ').slice(wdCount - chainLength + 1, wdCount).join(' ')} ${following}`;
  }
  return chain;
};

export default generateChain;
