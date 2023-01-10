const handleFetchError = (response: Response) => {
  if (!response.ok)
    throw Error(`Error (status ${response.status}) fetching ${response.url}`);
};

const valoperToPrefix = (valoper: string): string | null => {
  const prefixIndex = valoper.indexOf("valoper");
  if (prefixIndex === -1) return null;
  return valoper.slice(0, prefixIndex);
};

const randomChoice = <T>(choices: T[]): T =>
  choices[Math.floor(Math.random() * choices.length)];

export { randomChoice, handleFetchError, valoperToPrefix };
