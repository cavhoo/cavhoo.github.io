export const step = (value: number, step: number) => {
  return value > step ? 1 : 0;
};

export const isBetween = (value: number, lower: number, upper: number, inclusive = false): boolean => {
  if (inclusive) {
    return value >= lower && value <= upper;
  }
  return value > lower && value < upper;
};
