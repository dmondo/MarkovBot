const fetchChains = async (tweets: string[]): Promise<any> => {
  const url = '/chains';
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({
    tweets,
    order: 3,
    length: 25,
    numChains: 10,
  });
  const options = { method, headers, body };

  const response = await fetch(url, options);
  const chains = await response.json();
  return chains;
};

export default fetchChains;
