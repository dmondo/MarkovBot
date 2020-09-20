import buildModel from '../dist/lib/markovModel';
import generateChain from '../dist/lib/generateChain';

describe('Markov model', () => {
  it('building a model creates a dictionary whose keys are n-grams', () => {
    const fakeTweets = [
      {
        user: 'a',
        text: 'one two three four',
        id: 1,
        uuid: '1',
      },
      {
        user: 'a',
        text: 'two three four two three four two three four two three four',
        id: 1,
        uuid: '1',
      },
      {
        user: 'a',
        text: 'four five six four five six four five six four five six',
        id: 1,
        uuid: '1',
      },
    ];
    const model = buildModel(fakeTweets, 3);
    expect(model['one two three'][0]).toEqual('four');
  });
});
