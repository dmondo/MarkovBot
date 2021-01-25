const fetchChains = async (tweets: string[]): Promise<Response> => {
  // TODO: should this route through router file? like the twitter stuff.
  const url = `${process.env.API_URL}/chains`;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({
    text: tweets,
    order: 3,
    length: 25,
    num_chains: 10,
  });
  const options = { method, headers, body };

  return fetch(url, options);
};

export default fetchChains;
