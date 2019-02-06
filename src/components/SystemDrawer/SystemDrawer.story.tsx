import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import SystemDrawer from './SystemDrawer';

import { DirectionalPosition, LauncherSize, Orientation } from '../../types/enums';
import { getLauncherOrientation, getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { getSystemIcons } from '../../utils/getSystemIcons';
import { LauncherSizeConfig, launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { CATEGORIES } from '../../utils/storyCategories';

interface IsShownByDefault {
  isShownByDefault: boolean;
}

// TODO - once redux is fully hooked up in storybook, remove in favor of selector
const calcSystemDrawerSize = (systemIcons: IsShownByDefault[], isExpanded: boolean, config: LauncherSizeConfig) => {
  const toggleSize = isExpanded ? config.systemDrawerToggleClose : config.systemDrawerToggleOpen;

  const wrapperSize = toggleSize + config.systemDrawerPaddingStart + config.systemDrawerPaddingEnd;
  const iconsSize = isExpanded
    ? systemIcons.length * (config.systemIcon + config.systemIconGutter)
    : systemIcons.filter(icon => icon.isShownByDefault).length * config.systemIcon;

  return wrapperSize + iconsSize;
};

const getStoryIcons = (isAdmin: boolean) =>
  getSystemIcons(isAdmin).map(icon => ({
    cta: action('Action to be dispatched:', icon.action),
    hasExtendedWindow: icon.hasExtendedWindow,
    icon: icon.icon,
    isShownByDefault: icon.isShownByDefault,
    title: icon.title,
  }));

const onClickToggle = action('onClickToggle');

interface PositionStyle {
  top?: string | number;
  left?: string | number;
  bottom?: string | number;
  right?: string | number;
}

storiesOf(`${CATEGORIES.COMPONENTS}SystemDrawer`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    const launcherSizeConfig = launcherSizeConfigs[launcherSize];
    const isAdmin = boolean('isAdmin', false);
    const isExpanded = boolean('isExpanded', false);
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const extendedWindowPosition = getOppositeDirection(launcherPosition);
    const orientation = getLauncherOrientation(launcherPosition);

    const icons = getStoryIcons(isAdmin);
    const size = calcSystemDrawerSize(icons, isExpanded, launcherSizeConfig);

    const positionStyle: PositionStyle = {};
    positionStyle[launcherPosition] = 0;
    if (orientation === Orientation.Horizontal) {
      positionStyle.right = 0;
    } else {
      positionStyle.bottom = 0;
    }

    return (
      <div
        style={{
          ...positionStyle,
          height: orientation === Orientation.Horizontal ? launcherSizeConfig.launcher : 'auto',
          position: 'fixed',
          width: orientation === Orientation.Horizontal ? 'auto' : launcherSizeConfig.launcher,
        }}
      >
        <SystemDrawer
          extendedWindowPosition={extendedWindowPosition}
          icons={icons}
          isExpanded={isExpanded}
          launcherSizeConfig={launcherSizeConfig}
          onClickToggle={onClickToggle}
          orientation={orientation}
          size={size}
        />
      </div>
    );
  });
