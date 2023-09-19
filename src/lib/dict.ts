const getRequiredLength = (length: number) => {
  const symbol = length === 1 ? "symbol" : "symbols";
  return `${8 - length} more ${symbol}`;
};

export { getRequiredLength };
