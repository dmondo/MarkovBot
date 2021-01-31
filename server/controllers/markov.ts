import { Request, Response } from 'express';
import fetch from 'node-fetch';

const getMarkovChains = async (req: Request, res: Response): Promise<void> => {
  const {
    tweets,
    order,
    length,
    numChains,
  } = req.body;

  const url = `${process.env.API_URL}/chains`;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({
    text: tweets,
    order,
    length,
    num_chains: numChains,
  });
  const options = { method, headers, body };

  const response = await fetch(url, options);
  const chains = await response.json();

  res.json(chains);
};

export default getMarkovChains;
