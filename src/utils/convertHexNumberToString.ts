export const convertHexNumberToString = (hex: number): string => {
  let hexString = hex.toString(16);
  const missingDigits = 6 - hexString.length;

  for (let i = 0; i < missingDigits; i += 1) {
    hexString = `0${hexString}`;
  }

  return `#${hexString}`;
};
