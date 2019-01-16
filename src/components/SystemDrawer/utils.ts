const ICON_SIZE = 42;
const ICON_MARGIN = 5;
export const START_PADDING = 11;
export const END_PADDING = 5;

export const calcSystemDrawerToggleSize = (isExpanded: boolean) => (isExpanded ? 25 : 20);

interface IsShownByDefault {
  isShownByDefault: boolean;
}

export const calcSystemDrawerSize = (systemIcons: IsShownByDefault[], isExpanded: boolean) => {
  const toggleSize = calcSystemDrawerToggleSize(isExpanded);

  const wrapperSize = toggleSize + START_PADDING + END_PADDING;
  const iconsSize = isExpanded ? systemIcons.length * (ICON_SIZE + ICON_MARGIN) : systemIcons.filter(icon => icon.isShownByDefault).length * ICON_SIZE;

  return wrapperSize + iconsSize;
};
