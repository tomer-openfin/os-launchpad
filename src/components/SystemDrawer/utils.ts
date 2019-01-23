import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

export const calcSystemDrawerToggleSize = (isExpanded: boolean, config: LauncherSizeConfig) =>
  isExpanded ? config.systemDrawerToggleClose : config.systemDrawerToggleOpen;

interface IsShownByDefault {
  isShownByDefault: boolean;
}

export const calcSystemDrawerSize = (systemIcons: IsShownByDefault[], isExpanded: boolean, config: LauncherSizeConfig) => {
  const toggleSize = calcSystemDrawerToggleSize(isExpanded, config);

  const wrapperSize = toggleSize + config.systemDrawerPaddingStart + config.systemDrawerPaddingEnd;
  const iconsSize = isExpanded
    ? systemIcons.length * (config.systemIcon + config.systemIconGutter)
    : systemIcons.filter(icon => icon.isShownByDefault).length * config.systemIcon;

  return wrapperSize + iconsSize;
};
