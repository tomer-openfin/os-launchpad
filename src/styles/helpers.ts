// tslint:disable
import Color from './color';

interface RGB {
  r: number;
  g: number;
  b: number;
}

export const hexToRgbHelper = (hex: string): RGB => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!result) {
    console.warn(`hex: ${hex} conversion to rgba failed.`);
    return {
      r: 0,
      g: 0,
      b: 0,
    };
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

export const hexToRgba = (hexColor: Color, a: number = 1) => {
  const { r, g, b } = hexToRgbHelper(hexColor);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const getCssValueFromNumberOrString = (value: number | string) => (typeof value === 'string' ? value : `${value}px`);
