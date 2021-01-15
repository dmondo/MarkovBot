const getParsedHistory = async (): Promise<ITweet[]> => {
  const dbdata = await fetch('/history');
  const mongooseHistory = await dbdata.json();

  const parsedHistory = mongooseHistory.map((hist) => (
    {
      user: hist.user,
      text: hist.text,
      uuid: hist.uuid,
    }
  ));

  return parsedHistory;
};

export default getParsedHistory;
