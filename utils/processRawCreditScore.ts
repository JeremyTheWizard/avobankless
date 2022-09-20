export const processCreditScore = (score: number): number => {
  return Math.floor((score * 100) / 850);
};
