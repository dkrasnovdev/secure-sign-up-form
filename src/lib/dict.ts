const getMissingLength = (length: number) => {
  const symbol = 8 - length === 1 ? "symbol" : "symbols";
  return `${8 - length} more ${symbol}`;
};

export { getMissingLength };
