import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import SystemDrawer from './SystemDrawer';

import { DirectionalPosition, LauncherSize, Orientation } from '../../types/enums';
import { getLauncherOrientation, getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { getSystemIcons } from '../../utils/getSystemIcons';
import { LauncherSizeConfig, launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { CATEGORIES } from '../../utils/storyCategories';

// TODO - once redux is fully hooked up in storybook, remove in favor of selector
const calcSystemDrawerSize = (systemIcons, config: LauncherSizeConfig) => {
  const wrapperSize = config.systemDrawerPaddingStart + config.systemDrawerPaddingEnd;
  const iconsSize = systemIcons.length * (config.systemIcon + config.systemIconGutter);

  return wrapperSize + iconsSize;
};

const getStoryIcons = () =>
  getSystemIcons().map(icon => ({
    color: icon.color,
    cta: action('Action to be dispatched:', icon.action),
    hasExtendedWindow: icon.hasExtendedWindow,
    hoverColor: icon.hoverColor,
    icon: icon.icon,
    isBackground: icon.isBackground,
    title: icon.title,
  }));

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
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const extendedWindowPosition = getOppositeDirection(launcherPosition);
    const orientation = getLauncherOrientation(launcherPosition);

    const icons = getStoryIcons();
    const size = calcSystemDrawerSize(icons, launcherSizeConfig);

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
          launcherSizeConfig={launcherSizeConfig}
          orientation={orientation}
          size={size}
        />
      </div>
    );
  });
