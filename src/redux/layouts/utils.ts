export const calcDesiredLayoutsWindowHeight = (length: number) => {
  const BOTTOM_PADDING = 13;
  const BOTTOM_PADDING_SHOW_MORE = 36;
  const LINE_HEIGHT = 22;
  const MINIMUM_HEIGHT_ZERO = 213;
  const MAXIMUM_ALLOWED_HEIGHT = 280;
  const TOTAL_HEIGHT_TO_LIST_START = 112;

  if (length === 0) return MINIMUM_HEIGHT_ZERO;

  if (length > 6) {
    const sum = TOTAL_HEIGHT_TO_LIST_START + length * LINE_HEIGHT + BOTTOM_PADDING_SHOW_MORE;
    return Math.min(sum, MAXIMUM_ALLOWED_HEIGHT);
  }

  return TOTAL_HEIGHT_TO_LIST_START + length * LINE_HEIGHT + BOTTOM_PADDING;
};
