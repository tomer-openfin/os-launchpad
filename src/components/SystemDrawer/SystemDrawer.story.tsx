import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import SystemDrawer from './SystemDrawer';

import { DirectionalPosition, Orientation } from '../../types/enums';
import { getLauncherOrientation, getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { getSystemIcons } from '../../utils/getSystemIcons';
import { CATEGORIES } from '../../utils/storyCategories';
import { calcSystemDrawerSize } from './utils';

const getStoryIcons = (isAdmin: boolean) =>
  getSystemIcons(isAdmin).map(icon => ({
    cta: action('Action to be dispatched:', icon.action),
    hasExtendedWindow: icon.hasExtendedWindow,
    icon: icon.icon,
    isShownByDefault: icon.isShownByDefault,
    key: icon.key,
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
    const isAdmin = boolean('isAdmin', false);
    const isExpanded = boolean('isExpanded', false);
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const extendedWindowPosition = getOppositeDirection(launcherPosition);
    const orientation = getLauncherOrientation(launcherPosition);

    const icons = getStoryIcons(isAdmin);
    const size = calcSystemDrawerSize(icons, isExpanded);

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
          height: orientation === Orientation.Horizontal ? 80 : 'auto',
          position: 'fixed',
          width: orientation === Orientation.Horizontal ? 'auto' : 80,
        }}
      >
        <SystemDrawer
          extendedWindowPosition={extendedWindowPosition}
          icons={icons}
          isExpanded={isExpanded}
          onClickToggle={onClickToggle}
          orientation={orientation}
          size={size}
        />
      </div>
    );
  });
