const getMissingLengthString = (length: number) => {
  const missingLength = 8 - length;
  const character = missingLength === 1 ? 'character' : 'characters';
  return `${missingLength} more ${character}`;
};

export { getMissingLengthString };
